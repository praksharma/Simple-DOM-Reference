// Inject sidebar + topbar into every page
// Each page sets window.PAGE_TITLE and window.PAGE_FILE before including this

(function () {
  const items = [
    { file: 'img.html',    tag: '<img>',    label: 'HTMLImageElement' },
    { file: 'input.html',  tag: '<input>',  label: 'HTMLInputElement' },
    { file: 'canvas.html', tag: '<canvas>', label: 'HTMLCanvasElement' },
    { file: 'video.html',  tag: '<video>',  label: 'HTMLVideoElement' },
    { file: 'audio.html',  tag: '<audio>',  label: 'HTMLAudioElement' },
    { file: 'table.html',  tag: '<table>',  label: 'HTMLTableElement' },
    { file: 'form.html',   tag: '<form>',   label: 'HTMLFormElement' },
  ];

  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  const prefix = isIndex ? 'elements/' : '';
  const backHref = isIndex ? '#' : '../index.html';

  const navItems = items.map(it => `
    <li>
      <a href="${prefix}${it.file}">
        <span style="font-family:var(--font-mono);font-size:12px">${it.tag}</span>
        <span class="tag">${it.label.replace('HTML','').replace('Element','')}</span>
      </a>
    </li>
  `).join('');

  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <a href="${backHref}" class="sidebar-logo">DOM<span>ref</span></a>
      </div>
      <div class="sidebar-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="sidebar-search" placeholder="Filter elements…">
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">Elements</div>
        <ul class="sidebar-nav">${navItems}</ul>
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
        <button class="menu-toggle" id="menu-toggle">☰</button>
        <a href="${backHref}">DOMref</a>
        ${title ? `<span class="sep">›</span><span>${title}</span>` : ''}
      </div>
      <div class="topbar-right">
        <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()"></button>
      </div>
    `;
  }
})();