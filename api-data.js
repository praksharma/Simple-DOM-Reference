(function () {
  const apiPages = {
    textContent: {
      name: 'textContent',
      kind: 'property',
      badge: 'Inherited',
      summary: 'Gets or sets the plain text inside an element.',
      what: 'Use textContent when you want text, not HTML. It reads all text inside the element and replaces the element contents when you assign to it.',
      support: [
        ['div, p, h1, button', 'Yes', 'Most common use: read or replace visible text.'],
        ['input, textarea', 'Different', 'Use value for what the user typed.'],
        ['img, video, audio', 'Mostly empty', 'Void/media elements usually do not have useful text content.'],
        ['canvas', 'Yes', 'Reads fallback text between the canvas tags.'],
      ],
      example: "const title = document.querySelector('h1');\n\ntitle.textContent = 'Simple DOM Reference';\nconsole.log(title.textContent);",
      mistakes: [
        'Do not use innerHTML when inserting user text.',
        'textContent does not parse tags; "<strong>Hi</strong>" appears as text.',
        'Use value for form fields such as input and textarea.',
      ],
      related: {
        Properties: ['innerHTML', 'value'],
        Methods: ['append'],
        Elements: [['Common Element', 'elements/element.html'], ['Input', 'elements/input.html']],
      },
    },
    innerHTML: {
      name: 'innerHTML',
      kind: 'property',
      badge: 'Inherited',
      summary: 'Gets or sets the HTML markup inside an element.',
      what: 'Use innerHTML only when you intentionally want the browser to parse a trusted HTML string.',
      support: [
        ['div, p, section, button', 'Yes', 'Reads or replaces child markup.'],
        ['img, input', 'Different', 'Void elements have no child HTML, so reading usually returns an empty string.'],
        ['table', 'Yes', 'Works, but table-specific methods are often clearer.'],
        ['canvas', 'Different', 'Represents fallback HTML, not the drawing surface.'],
      ],
      example: "const card = document.querySelector('.card');\ncard.innerHTML = '<strong>Saved</strong>';",
      mistakes: [
        'Never put untrusted user input into innerHTML.',
        'Replacing innerHTML destroys existing child elements and their event listeners.',
        'Use textContent for plain text.',
      ],
      related: {
        Properties: ['textContent'],
        Methods: ['append'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    classList: {
      name: 'classList',
      kind: 'property',
      badge: 'Inherited',
      summary: 'A small helper object for adding, removing, and toggling CSS classes.',
      what: 'classList is the beginner-friendly way to change classes without editing the whole class attribute string.',
      support: [
        ['div, p, h1, button', 'Yes', 'Works on normal HTML elements.'],
        ['input, img, canvas', 'Yes', 'Useful for validation, loading states, and display states.'],
        ['svg elements', 'Usually', 'Modern browsers support it, but this reference focuses on HTML.'],
      ],
      example: "const panel = document.querySelector('.panel');\n\npanel.classList.add('open');\npanel.classList.toggle('is-active');\nconsole.log(panel.classList.contains('open'));",
      mistakes: [
        'Do not include the dot: use "open", not ".open".',
        'Use classList for state changes; use CSS files for the actual styling.',
      ],
      related: {
        Properties: ['style'],
        Methods: ['addEventListener'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    style: {
      name: 'style',
      kind: 'property',
      badge: 'Inherited',
      summary: 'Reads and writes inline CSS styles on one element.',
      what: 'Use style for small dynamic changes. For repeated states, toggling a class is usually cleaner.',
      support: [
        ['All HTML elements', 'Yes', 'Sets inline CSS on that element.'],
        ['input, img, canvas, video', 'Yes', 'Common for display, size, and state changes.'],
      ],
      example: "const box = document.querySelector('.box');\n\nbox.style.backgroundColor = 'gold';\nbox.style.display = 'none';",
      mistakes: [
        'CSS names become camelCase: background-color becomes backgroundColor.',
        'style only shows inline styles, not every rule from your stylesheet.',
        'Prefer classList when changing several styles together.',
      ],
      related: {
        Properties: ['classList'],
        Methods: ['addEventListener'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    value: {
      name: 'value',
      kind: 'property',
      badge: 'Input only',
      summary: 'Gets or sets the current value of a form control.',
      what: 'Use value to read what a user typed, selected, or entered in an input-like element.',
      support: [
        ['input', 'Yes', 'Most common use. The value is usually a string.'],
        ['textarea, select', 'Yes', 'Also uses value.'],
        ['div, p, h1', 'No', 'Use textContent instead.'],
        ['checkbox, radio', 'Different', 'value is the submitted value; use checked for selected state.'],
      ],
      example: "const input = document.querySelector('input');\n\nconsole.log(input.value);\ninput.value = 'Ada';",
      mistakes: [
        'value does not work on div; use textContent for normal elements.',
        'Number inputs still return strings. Convert with Number(input.value).',
        'Checkbox state is checked, not value.',
      ],
      related: {
        Properties: ['checked', 'textContent'],
        Methods: ['focus'],
        Elements: [['Input', 'elements/input.html'], ['Form', 'elements/form.html']],
      },
    },
    checked: {
      name: 'checked',
      kind: 'property',
      badge: 'Input only',
      summary: 'Tells you whether a checkbox or radio input is selected.',
      what: 'Use checked for true/false selection state on checkbox and radio inputs.',
      support: [
        ['input type="checkbox"', 'Yes', 'true when ticked.'],
        ['input type="radio"', 'Yes', 'true when that option is selected.'],
        ['text, email, number inputs', 'No', 'Use value instead.'],
        ['button, div, p', 'No', 'No checked state.'],
      ],
      example: "const checkbox = document.querySelector('input[type=\"checkbox\"]');\n\nif (checkbox.checked) {\n  console.log('Enabled');\n}",
      mistakes: [
        'Do not compare checkbox.value to "true".',
        'For radio groups, check the selected radio in the group.',
      ],
      related: {
        Properties: ['value'],
        Methods: ['addEventListener'],
        Elements: [['Input', 'elements/input.html'], ['Form', 'elements/form.html']],
      },
    },
    src: {
      name: 'src',
      kind: 'property',
      badge: 'Media',
      summary: 'Gets or sets the URL for image and media content.',
      what: 'Use src to point an image, audio, or video element at the file it should load.',
      support: [
        ['img', 'Yes', 'Starts loading the image when changed.'],
        ['video, audio', 'Yes', 'Call load() after changing source if needed.'],
        ['canvas', 'No', 'Draw images onto canvas with drawImage().'],
        ['input, form, table', 'No', 'These elements do not use src for content.'],
      ],
      example: "const img = document.querySelector('img');\nimg.src = 'avatar.png';",
      mistakes: [
        'Changing media src may require calling load() before play().',
        'Always provide useful alt text for images.',
        'Use currentSrc when you need the actual selected source from srcset/source.',
      ],
      related: {
        Properties: ['currentTime'],
        Methods: ['play', 'pause'],
        Elements: [['Image', 'elements/img.html'], ['Video', 'elements/video.html'], ['Audio', 'elements/audio.html']],
      },
    },
    currentTime: {
      name: 'currentTime',
      kind: 'property',
      badge: 'Media',
      summary: 'Gets or sets the playback position, in seconds.',
      what: 'Use currentTime to read progress or seek through audio/video.',
      support: [
        ['video', 'Yes', 'Read progress or seek to a time.'],
        ['audio', 'Yes', 'Same behavior without visual output.'],
        ['img, canvas, input', 'No', 'No media timeline.'],
      ],
      example: "const video = document.querySelector('video');\n\nvideo.currentTime = 30;\nconsole.log(video.currentTime);",
      mistakes: [
        'The value is seconds, not milliseconds.',
        'Seeking may fail before enough media metadata has loaded.',
        'Guard against duration being NaN before calculating percentages.',
      ],
      related: {
        Properties: ['src'],
        Methods: ['play', 'pause'],
        Elements: [['Video', 'elements/video.html'], ['Audio', 'elements/audio.html']],
      },
    },
    addEventListener: {
      name: 'addEventListener()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Runs your function when something happens.',
      what: 'Use addEventListener for clicks, typing, form submit, media updates, and most user interaction.',
      support: [
        ['All common elements', 'Yes', 'click, input, change, submit, keydown, and more.'],
        ['window, document', 'Yes', 'Also support events, though they are not elements.'],
      ],
      example: "const button = document.querySelector('button');\n\nbutton.addEventListener('click', () => {\n  console.log('Clicked');\n});",
      mistakes: [
        'Pass a function; do not call it immediately.',
        'Use preventDefault() for forms when you do not want navigation.',
        'Keep a reference to the function if you plan to remove it later.',
      ],
      related: {
        Methods: ['removeEventListener'],
        Properties: ['value', 'checked', 'classList'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    removeEventListener: {
      name: 'removeEventListener()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Stops a previously added event listener from running.',
      what: 'Use removeEventListener when a listener should only live for part of the page lifetime.',
      support: [
        ['All common elements', 'Yes', 'Works with the same event name and same function reference.'],
        ['window, document', 'Yes', 'Useful for temporary global listeners.'],
      ],
      example: "function handleClick() {\n  console.log('Clicked once');\n  button.removeEventListener('click', handleClick);\n}\n\nbutton.addEventListener('click', handleClick);",
      mistakes: [
        'Anonymous functions cannot be removed later because you do not have the same function reference.',
        'The event name must match exactly.',
      ],
      related: {
        Methods: ['addEventListener'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    append: {
      name: 'append()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Adds text or nodes to the end of an element.',
      what: 'Use append() to add new content after the existing children.',
      support: [
        ['div, p, section, button', 'Yes', 'Adds new child content.'],
        ['ul, ol, table cells', 'Yes', 'Useful for building lists and rows.'],
        ['img, input', 'Not useful', 'Void elements cannot show child content.'],
      ],
      example: "const list = document.querySelector('ul');\nconst item = document.createElement('li');\nitem.textContent = 'New item';\n\nlist.append(item);",
      mistakes: [
        'Passing a string creates text, not HTML.',
        'Use innerHTML only when you intentionally want to parse trusted markup.',
      ],
      related: {
        Methods: ['prepend', 'remove'],
        Properties: ['textContent', 'innerHTML'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    prepend: {
      name: 'prepend()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Adds text or nodes to the beginning of an element.',
      what: 'Use prepend() when new content should appear before existing children.',
      support: [
        ['div, section, ul, ol', 'Yes', 'Adds content as the first child.'],
        ['img, input', 'Not useful', 'Void elements cannot show child content.'],
      ],
      example: "const list = document.querySelector('ul');\nconst item = document.createElement('li');\nitem.textContent = 'First item';\n\nlist.prepend(item);",
      mistakes: [
        'prepend() moves an existing node if it is already in the DOM.',
        'Use append() when the item should go at the end.',
      ],
      related: {
        Methods: ['append', 'remove'],
        Properties: ['textContent'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    remove: {
      name: 'remove()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Removes an element from the DOM.',
      what: 'Use remove() to delete an element from the page without needing its parent.',
      support: [
        ['All common elements', 'Yes', 'The element disappears from the document.'],
        ['Detached elements', 'Yes', 'Calling remove() is safe even if already detached.'],
      ],
      example: "const toast = document.querySelector('.toast');\ntoast.remove();",
      mistakes: [
        'remove() does not delete your JavaScript variable.',
        'You can reinsert the same element later with append().',
      ],
      related: {
        Methods: ['append', 'prepend'],
        Elements: [['Common Element', 'elements/element.html']],
      },
    },
    focus: {
      name: 'focus()',
      kind: 'method',
      badge: 'Inherited',
      summary: 'Moves keyboard focus to an element.',
      what: 'Use focus() to put the cursor in a field or move keyboard focus after an action.',
      support: [
        ['input, textarea, select', 'Yes', 'Most common use.'],
        ['button, links', 'Yes', 'Can receive keyboard focus.'],
        ['div, p', 'Different', 'Needs tabindex to be focusable.'],
        ['disabled controls', 'No', 'Disabled fields cannot be focused.'],
      ],
      example: "const input = document.querySelector('input');\ninput.focus();",
      mistakes: [
        'Calling focus() before the element exists does nothing.',
        'Hidden or disabled elements cannot receive focus.',
        'Avoid moving focus unexpectedly while a user is typing.',
      ],
      related: {
        Properties: ['value'],
        Methods: ['addEventListener'],
        Elements: [['Input', 'elements/input.html']],
      },
    },
    play: {
      name: 'play()',
      kind: 'method',
      badge: 'Media',
      summary: 'Starts audio or video playback.',
      what: 'Use play() on media elements. It returns a Promise because browsers may block playback.',
      support: [
        ['video', 'Yes', 'Starts video playback.'],
        ['audio', 'Yes', 'Starts audio playback.'],
        ['img, canvas, input', 'No', 'No media playback.'],
      ],
      example: "const video = document.querySelector('video');\n\nvideo.play().catch(() => {\n  console.log('Playback was blocked');\n});",
      mistakes: [
        'Autoplay with sound is often blocked until the user interacts.',
        'Handle the returned Promise instead of assuming playback starts.',
      ],
      related: {
        Methods: ['pause'],
        Properties: ['currentTime', 'src'],
        Elements: [['Video', 'elements/video.html'], ['Audio', 'elements/audio.html']],
      },
    },
    pause: {
      name: 'pause()',
      kind: 'method',
      badge: 'Media',
      summary: 'Pauses audio or video playback.',
      what: 'Use pause() to stop playback at the current time without resetting it.',
      support: [
        ['video', 'Yes', 'Pauses video playback.'],
        ['audio', 'Yes', 'Pauses audio playback.'],
        ['img, canvas, input', 'No', 'No media playback.'],
      ],
      example: "const audio = document.querySelector('audio');\naudio.pause();",
      mistakes: [
        'pause() does not reset currentTime.',
        'Use currentTime = 0 if you want to restart next time.',
      ],
      related: {
        Methods: ['play'],
        Properties: ['currentTime', 'src'],
        Elements: [['Video', 'elements/video.html'], ['Audio', 'elements/audio.html']],
      },
    },
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]));
  }

  function apiHref(key) {
    const api = apiPages[key];
    if (!api) return '#';
    const folder = api.kind === 'method' ? 'methods' : 'properties';
    return `../${folder}/${key}.html`;
  }

  function renderSupportRows(rows) {
    return rows.map(([name, status, note]) => {
      const statusLower = status.toLowerCase();
      const statusClass = statusLower.includes('no')
        ? 'support-no'
        : statusLower.includes('different') || statusLower.includes('mostly') || statusLower.includes('not useful')
          ? 'support-mixed'
          : 'support-yes';

      return `
      <tr>
        <td><span class="prop-name">${escapeHTML(name)}</span></td>
        <td><span class="support-status ${statusClass}">${escapeHTML(status)}</span></td>
        <td>${escapeHTML(note)}</td>
      </tr>
    `;
    }).join('');
  }

  function renderMistakes(items) {
    return items.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
  }

  function renderApiLinks(title, items) {
    if (!items || items.length === 0) return '';

    const links = items.map((item) => {
      if (Array.isArray(item)) {
        return `<a href="../${item[1]}" class="related-card">${escapeHTML(item[0])}</a>`;
      }

      const api = apiPages[item];
      if (!api) return '';
      return `<a href="${apiHref(item)}" class="related-card">${escapeHTML(api.name)}</a>`;
    }).join('');

    return `
      <div class="related-group">
        <div class="related-label">${escapeHTML(title)}</div>
        <div class="related-grid">${links}</div>
      </div>
    `;
  }

  function renderRelated(related) {
    return ['Elements', 'Properties', 'Methods']
      .map((title) => renderApiLinks(title, related?.[title]))
      .join('');
  }

  function renderApiPage() {
    const container = document.querySelector('[data-api-page]');
    if (!container) return;

    const key = window.API_PAGE || container.dataset.apiPage;
    const api = apiPages[key];
    if (!api) return;

    document.title = `${api.name} - DOMref`;

    container.innerHTML = `
      <div class="page-header">
        <div class="badge-row">
          <div class="element-badge">${escapeHTML(api.kind === 'method' ? 'Method' : 'Property')}</div>
          <span class="api-badge">${escapeHTML(api.badge)}</span>
        </div>
        <h1 class="page-title">${escapeHTML(api.name)}</h1>
        <p class="page-subtitle">${escapeHTML(api.summary)}</p>
      </div>

      <div class="section">
        <div class="section-title">What is it?</div>
        <p class="api-copy">${escapeHTML(api.what)}</p>
      </div>

      <div class="section">
        <div class="section-title">Supported on</div>
        <table class="prop-table support-table">
          <thead><tr><th>Element</th><th>Support</th><th>Notes</th></tr></thead>
          <tbody>${renderSupportRows(api.support)}</tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Example</div>
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-lang">JS</span>
            <button class="copy-btn" data-target="api-example-${escapeHTML(key)}">Copy</button>
          </div>
          <pre><code id="api-example-${escapeHTML(key)}">${escapeHTML(api.example)}</code></pre>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Common mistakes</div>
        <ul class="mistake-list">${renderMistakes(api.mistakes)}</ul>
      </div>

      <div class="section">
        <div class="section-title">Related APIs</div>
        ${renderRelated(api.related)}
      </div>
    `;
  }

  window.DOMREF_API_PAGES = apiPages;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApiPage);
  } else {
    renderApiPage();
  }
})();
