// Theme
const html = document.documentElement;

function readStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The page still works if storage is unavailable.
  }
}

const saved = readStoredTheme() || 'dark';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  storeTheme(next);
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const isDark = html.getAttribute('data-theme') === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  btn.innerHTML = isDark
    ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light`
    : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark`;
}

function isTypingTarget(target) {
  return target?.matches?.('input, textarea, select, [contenteditable="true"]');
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    textarea.remove();
  }

  if (!copied) {
    throw new Error('Copy failed');
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the legacy path.
    }
  }

  fallbackCopyText(text);
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();

  const themeBtn = document.getElementById('theme-toggle');
  themeBtn?.addEventListener('click', toggleTheme);

  // Mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuBtn = document.getElementById('menu-toggle');

  const setSidebarOpen = (isOpen) => {
    if (!sidebar) return;

    sidebar.classList.toggle('open', isOpen);
    overlay?.classList.toggle('open', isOpen);
    menuBtn?.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('sidebar-open', isOpen);
  };

  menuBtn?.addEventListener('click', () => {
    setSidebarOpen(!sidebar?.classList.contains('open'));
  });

  overlay?.addEventListener('click', () => setSidebarOpen(false));

  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    link.addEventListener('click', () => setSidebarOpen(false));
  });

  // Sidebar search filter
  const searchInput = document.getElementById('sidebar-search');
  const emptyMessage = document.getElementById('sidebar-empty');
  const sidebarItems = Array.from(document.querySelectorAll('.sidebar-nav li'));

  const filterSidebar = () => {
    if (!searchInput) return;

    const q = searchInput.value.toLowerCase().trim();
    let visible = 0;

    sidebarItems.forEach((li) => {
      const link = li.querySelector('a');
      const text = (link?.dataset.searchText || li.textContent || '').toLowerCase();
      const isMatch = q === '' || text.includes(q);
      li.hidden = !isMatch;
      if (isMatch) visible += 1;
    });

    if (emptyMessage) {
      emptyMessage.hidden = visible > 0;
    }
  };

  searchInput?.addEventListener('input', filterSidebar);

  // "/" focuses the element search unless the user is already typing.
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && searchInput && !isTypingTarget(e.target)) {
      e.preventDefault();
      setSidebarOpen(true);
      searchInput.focus();
    }

    if (e.key === 'Escape') {
      if (document.activeElement === searchInput && searchInput.value) {
        searchInput.value = '';
        filterSidebar();
        return;
      }

      setSidebarOpen(false);
    }
  });

  // Expandable property rows
  const closeExpandedRows = () => {
    document.querySelectorAll('.prop-expand-row.visible').forEach((r) => {
      r.classList.remove('visible');
    });

    document.querySelectorAll('.prop-row.expanded').forEach((r) => {
      r.classList.remove('expanded');
      r.setAttribute('aria-expanded', 'false');
    });
  };

  const openExpandableRow = (row) => {
    const id = row.dataset.expand;
    if (!id) return;

    const expandRow = document.getElementById(id);
    if (!expandRow) return;

    const isOpen = expandRow.classList.contains('visible');
    closeExpandedRows();

    if (!isOpen) {
      expandRow.classList.add('visible');
      row.classList.add('expanded');
      row.setAttribute('aria-expanded', 'true');
    }
  };

  document.querySelectorAll('.prop-row').forEach((row) => {
    const id = row.dataset.expand;
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');

    if (id) {
      row.setAttribute('aria-controls', id);
    }

    row.addEventListener('click', () => openExpandableRow(row));
    row.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      openExpandableRow(row);
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();

      const target = btn.dataset.target;
      const code = document.getElementById(target)?.textContent || '';
      const originalText = btn.textContent;

      try {
        await copyText(code);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
      } catch {
        btn.textContent = 'Copy failed';
        btn.classList.add('copy-error');
      }

      setTimeout(() => {
        btn.textContent = originalText || 'Copy';
        btn.classList.remove('copied', 'copy-error');
      }, 1500);
    });
  });

  // Active nav link
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const current = pathParts[pathParts.length - 1] || 'index.html';

  document.querySelectorAll('.sidebar-nav a').forEach((a) => {
    const isActive = a.dataset.file === current;
    a.classList.toggle('active', isActive);

    if (isActive) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
});
