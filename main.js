// ── Theme ──
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = html.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark
    ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light`
    : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();

  // ── Mobile sidebar ──
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuBtn = document.getElementById('menu-toggle');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // ── Sidebar search filter ──
  const searchInput = document.getElementById('sidebar-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.sidebar-nav li').forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = q === '' || text.includes(q) ? '' : 'none';
      });
    });
  }

  // ── Expandable property rows ──
  document.querySelectorAll('.prop-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.expand;
      if (!id) return;
      const expandRow = document.getElementById(id);
      if (!expandRow) return;
      const isOpen = expandRow.classList.contains('visible');
      // close all
      document.querySelectorAll('.prop-expand-row.visible').forEach(r => r.classList.remove('visible'));
      document.querySelectorAll('.prop-row.expanded').forEach(r => r.classList.remove('expanded'));
      if (!isOpen) {
        expandRow.classList.add('visible');
        row.classList.add('expanded');
      }
    });
  });

  // ── Copy buttons ──
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.dataset.target;
      const code = document.getElementById(target)?.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1500);
      });
    });
  });

  // ── Active nav link ──
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href')?.endsWith(current)) {
      a.classList.add('active');
    }
  });
});