// Inject sidebar + topbar into every page.

(function () {
  const sections = [
    {
      label: 'Elements',
      items: [
        { path: 'elements/element.html', code: 'Element', label: 'Common', keywords: 'common inherited shared textContent innerHTML classList style append remove events geometry' },
        { path: 'elements/img.html', code: '<img>', label: 'Image', keywords: 'HTMLImageElement image photo picture src alt loading naturalWidth decode' },
        { path: 'elements/input.html', code: '<input>', label: 'Input', keywords: 'HTMLInputElement form field value type checked placeholder focus' },
        { path: 'elements/canvas.html', code: '<canvas>', label: 'Canvas', keywords: 'HTMLCanvasElement drawing getContext width height toDataURL' },
        { path: 'elements/video.html', code: '<video>', label: 'Video', keywords: 'HTMLVideoElement media play pause currentTime volume duration' },
        { path: 'elements/audio.html', code: '<audio>', label: 'Audio', keywords: 'HTMLAudioElement sound media play pause volume muted' },
        { path: 'elements/table.html', code: '<table>', label: 'Table', keywords: 'HTMLTableElement rows cells insertRow deleteRow caption' },
        { path: 'elements/form.html', code: '<form>', label: 'Form', keywords: 'HTMLFormElement submit reset action method elements FormData' },
      ],
    },
    {
      label: 'Properties',
      items: [
        { path: 'properties/textContent.html', code: 'textContent', label: 'Property', keywords: 'plain text content common inherited' },
        { path: 'properties/innerHTML.html', code: 'innerHTML', label: 'Property', keywords: 'html markup content common inherited' },
        { path: 'properties/classList.html', code: 'classList', label: 'Property', keywords: 'css classes add remove toggle contains' },
        { path: 'properties/style.html', code: 'style', label: 'Property', keywords: 'css inline styles backgroundColor display' },
        { path: 'properties/value.html', code: 'value', label: 'Property', keywords: 'input textarea select form field typed' },
        { path: 'properties/checked.html', code: 'checked', label: 'Property', keywords: 'checkbox radio selected boolean input' },
        { path: 'properties/src.html', code: 'src', label: 'Property', keywords: 'image video audio media url source' },
        { path: 'properties/currentTime.html', code: 'currentTime', label: 'Property', keywords: 'video audio media playback seek seconds' },
      ],
    },
    {
      label: 'Methods',
      items: [
        { path: 'methods/addEventListener.html', code: 'addEventListener()', label: 'Method', keywords: 'events click input submit listener' },
        { path: 'methods/removeEventListener.html', code: 'removeEventListener()', label: 'Method', keywords: 'events cleanup listener remove' },
        { path: 'methods/append.html', code: 'append()', label: 'Method', keywords: 'tree children add node text end' },
        { path: 'methods/prepend.html', code: 'prepend()', label: 'Method', keywords: 'tree children add node text beginning' },
        { path: 'methods/remove.html', code: 'remove()', label: 'Method', keywords: 'tree delete element detach' },
        { path: 'methods/focus.html', code: 'focus()', label: 'Method', keywords: 'input keyboard cursor form focus' },
        { path: 'methods/play.html', code: 'play()', label: 'Method', keywords: 'video audio media start playback promise' },
        { path: 'methods/pause.html', code: 'pause()', label: 'Method', keywords: 'video audio media stop pause playback' },
      ],
    },
  ];

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

  const allItems = sections.flatMap((section) => section.items);
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  const currentTail = pathParts.slice(-2).join('/');
  const currentItem = allItems.find((item) => item.path === currentTail || item.path === currentFile);
  const isSubPage = Boolean(currentItem?.path.includes('/'));
  const baseHref = isSubPage ? '../' : '';
  const homeHref = `${baseHref}index.html`;

  function navItemHTML(item) {
    const searchText = `${item.code} ${item.label} ${item.keywords}`;

    return `
      <li>
        <a href="${baseHref}${item.path}" data-path="${escapeHTML(item.path)}" data-search-text="${escapeHTML(searchText)}">
          <span class="sidebar-tag-code">${escapeHTML(item.code)}</span>
          <span class="tag">${escapeHTML(item.label)}</span>
        </a>
      </li>
    `;
  }

  function sectionHTML(section) {
    return `
      <div class="sidebar-section" data-sidebar-section>
        <div class="sidebar-section-label">${escapeHTML(section.label)}</div>
        <ul class="sidebar-nav">${section.items.map(navItemHTML).join('')}</ul>
      </div>
    `;
  }

  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <a href="${homeHref}" class="sidebar-logo">DOM<span>ref</span></a>
      </div>
      <div class="sidebar-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="search" id="sidebar-search" placeholder="Search APIs..." aria-label="Search APIs" autocomplete="off">
      </div>
      ${sections.map(sectionHTML).join('')}
      <p class="sidebar-empty" id="sidebar-empty" hidden>No matching pages</p>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;

  const layout = document.querySelector('.layout');
  if (layout) layout.insertAdjacentHTML('afterbegin', sidebarHTML);

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
