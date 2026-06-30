// Inject sidebar + topbar into every page.

(function () {
  const items = [
    { file: 'img.html', tag: '<img>', label: 'HTMLImageElement', keywords: 'image photo picture src alt loading naturalWidth decode' },
    { file: 'input.html', tag: '<input>', label: 'HTMLInputElement', keywords: 'form field value type checked placeholder focus' },
    { file: 'canvas.html', tag: '<canvas>', label: 'HTMLCanvasElement', keywords: 'drawing getContext width height toDataURL' },
    { file: 'video.html', tag: '<video>', label: 'HTMLVideoElement', keywords: 'media play pause currentTime volume duration' },
    { file: 'audio.html', tag: '<audio>', label: 'HTMLAudioElement', keywords: 'sound media play pause volume muted' },
    { file: 'table.html', tag: '<table>', label: 'HTMLTableElement', keywords: 'rows cells insertRow deleteRow caption' },
    { file: 'form.html', tag: '<form>', label: 'HTMLFormElement', keywords: 'submit reset action method elements FormData' },
  ];

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  const currentItem = items.find((item) => item.file === currentFile);
  const isIndex = !currentItem;
  const prefix = isIndex ? 'elements/' : '';
  const homeHref = isIndex ? 'index.html' : '../index.html';

  const navItems = items.map(it => `
    <li>
      <a href="${prefix}${it.file}" data-file="${it.file}" data-search-text="${escapeHTML(`${it.tag} ${it.label} ${it.keywords}`)}">
        <span class="sidebar-tag-code">${escapeHTML(it.tag)}</span>
        <span class="tag">${it.label.replace('HTML','').replace('Element','')}</span>
      </a>
    </li>
  `).join('');

  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <a href="${homeHref}" class="sidebar-logo">DOM<span>ref</span></a>
      </div>
      <div class="sidebar-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="search" id="sidebar-search" placeholder="Filter elements..." aria-label="Filter elements" autocomplete="off">
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">Elements</div>
        <ul class="sidebar-nav">${navItems}</ul>
        <p class="sidebar-empty" id="sidebar-empty" hidden>No matching elements</p>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;

  // Insert before .layout or at start of body
  const layout = document.querySelector('.layout');
  if (layout) layout.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Topbar
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const title = window.PAGE_TITLE || '';
    topbar.innerHTML = `
      <div class="topbar-left">
        <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">☰</button>
        <a href="${homeHref}">DOMref</a>
        ${title ? `<span class="sep">›</span><span>${escapeHTML(title)}</span>` : ''}
      </div>
      <div class="topbar-right">
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle theme"></button>
      </div>
    `;
  }
})();
