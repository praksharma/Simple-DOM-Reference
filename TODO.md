Disclaimer:
IMPORTANT

Before writing any code:

1. Read TODO.md completely.
2. Assume completed items are already implemented.
3. Do NOT rewrite existing functionality.
4. Do NOT redesign the project.
5. Only implement tasks that are still incomplete.
6. Reuse the current design system, CSS, and JavaScript architecture.
7. If a requested feature already exists, skip it.
8. Make the smallest possible changes to achieve the goal.
9. Preserve backward compatibility with existing pages.
10. At the end, list:
   - What you implemented
   - What you skipped because it already existed
   - Any TODOs that remain

IMPORTANT

Do not convert this project into React, Vue, Astro, Next.js, VitePress, Docusaurus, or any other framework.

This project must remain a lightweight static HTML/CSS/JavaScript website.

Do not introduce build tools or package managers unless explicitly asked.

TASK:

I am building a static website called "Simple DOM Reference".

This project is NOT trying to replace MDN.

The goal is completely different:

It should answer one question:

"I have this JavaScript DOM object. What can I actually do with it?"

The target audience is beginners and people coming from C++, Python, MATLAB, NumPy, PyTorch, etc., who expect something similar to cppreference.com.

The philosophy is:

- No inheritance knowledge required.
- No web standards jargon.
- No unnecessary APIs.
- Show the 15-30 properties and methods that 95% of developers actually use.
- Advanced APIs can be collapsed.
- Every page should be understandable within 2 minutes.

The current project already has:

- Sidebar
- Dark/light theme
- Expandable property rows
- Copy buttons
- Individual element pages

I want you to improve the project without changing this philosophy.

Add the following features.

──────────────────────────────────────

1. COMMON ELEMENT PAGE

Create a new page called

Element

This should contain the common APIs shared by almost every HTML element.

Examples:

Content
--------
textContent
innerHTML
innerText

CSS
----
style
classList

Tree
----
children
parentElement
append()
prepend()
remove()

Attributes
----------
id
getAttribute()
setAttribute()
removeAttribute()

Events
------
addEventListener()
removeEventListener()

Geometry
---------
clientWidth
clientHeight
getBoundingClientRect()

This page should become the "learn once" page.

──────────────────────────────────────

2. PROPERTY BADGES

Instead of calling properties "Unique",

categorize them.

Examples:

[Inherited]
[Input only]
[Media]
[Canvas]
[Table]

Do NOT expose inheritance trees.

These are simply visual badges.

──────────────────────────────────────

3. PROPERTY PAGES

Every important property should have its own page.

Examples

textContent

innerHTML

classList

style

value

checked

src

currentTime

play()

focus()

Each page should answer

What is it?

Which elements support it?

Example

Common mistakes

Related APIs

──────────────────────────────────────

4. SUPPORTED ELEMENTS TABLE

Each property page should contain something like

Supported on

✓ div

✓ p

✓ h1

✓ img

✓ button

✓ canvas

etc.

If the property behaves differently,

say so.

Example

innerHTML

✓ img

Returns ""

because img is a void element.

──────────────────────────────────────

5. GLOBAL SEARCH

Search should search BOTH

Elements

Properties

Methods

Typing

innerHTML

should find

Property

not only elements.

Typing

value

should find HTMLInputElement immediately.

──────────────────────────────────────

6. RELATED LINKS

Each page should end with

Related Elements

Related Properties

Related Methods

This encourages exploration.

──────────────────────────────────────

7. COMMON MISTAKES

Every property should have

Common mistakes

Example

innerHTML

Don't use it when inserting user data.

Use textContent instead.

Example

value

Works on input

Does not work on div.

──────────────────────────────────────

8. LEARN FIRST

Highlight the most important APIs.

Example

⭐⭐⭐ Learn first

textContent

classList

style

addEventListener()

append()

remove()

The goal is helping beginners know what to learn first.

──────────────────────────────────────

9. BETTER SIDEBAR

Split the sidebar into

Elements

Properties

Methods

Eventually it should look like

Elements
--------
div
img
input
canvas
video
audio

Properties
----------
textContent
innerHTML
classList
style
value
checked

Methods
-------
append
remove
focus
play
pause

──────────────────────────────────────

10. NO BLOAT

The biggest rule:

Never try to become MDN.

Only document APIs that a beginner or intermediate JavaScript developer is likely to use.

Do not include obscure browser APIs unless they are commonly encountered.

Every page should fit comfortably on one screen before scrolling whenever possible.

──────────────────────────────────────

11. MAINTAINABILITY

Refactor the project so new pages are easy to add.

Avoid duplicated HTML.

Extract reusable components where appropriate.

Keep the project completely static.

No backend.

No frameworks.

Vanilla HTML, CSS and JavaScript only.

──────────────────────────────────────

12. DESIGN

Keep the existing clean documentation style.

Prioritize readability.

Think of cppreference.com but modern.

Think of simplicity before completeness.

Do not redesign everything.

Improve what already exists.