---
name: dile-docs-pages
description: Use when creating or updating a Markdown documentation page of the Dile Components Eleventy site under docs/ — especially component pages in docs/components/*.md, but also docs/crud, docs/mixins, docs/lib and docs/icons. Covers front matter, section order, properties/events/methods/slots/CSS custom properties formats and live html:preview demos.
---

# Dile Components documentation pages

The documentation site is an Eleventy project rooted at `docs/` (config in `eleventy.config.cjs`). Each section is a folder of Markdown pages whose shared data lives in a `<folder>.json` file (layout, collection tag, `hasMarkdown`, `markdownFolder`), so **pages never declare `layout`** unless the folder lacks that JSON.

Before writing, read the component source (`packages/<pkg>/components/<name>/`) and its demo (`demos/<pkg>/`) so the docs match the real API: reactive properties, dispatched events, public methods, slots and CSS custom properties. Then open 1–2 sibling pages of the same family (e.g. another input, another spinner) and mirror them.

## Where the page goes

| What | Folder | File name | Example |
|---|---|---|---|
| `@dile/ui`, `@dile/utils`, `@dile/editor` components | `docs/components/` | `dile-<name>.md` (the tag name) | `dile-qr-code.md` |
| `@dile/crud` components and guides | `docs/crud/` | `<name>.md` (no `dile-` prefix) | `crud-list.md`, `ajax.md` |
| Mixins | `docs/mixins/` | `dile-<name>-mixin.md` | `dile-form-mixin.md` |
| App lib (`@dile/lib`) | `docs/lib/` | `<name>.md` | `router-mixin.md` |
| Icons | `docs/icons/` | `<family>-icon.md`, `<family>-badge.md`... | `lucide-icon.md` |

The page URL is `/<folder>/<file-name>/` (e.g. `/components/dile-button/`); use that form for internal links.

## Front matter

```yaml
---
title: QR Code
package: '@dile/utils'
element: '&lt;dile-qr-code&gt;'
status: stable
summary: Lightweight component to generate and render customizable QR codes on a canvas.
tags: utils
---
```

- `title`: human name in Title Case, without the `dile-` prefix ("Input Money", "Select Ajax Overlay"). Used as the HTML `<title>`, card title and nav label.
- `package`: quoted npm package (`'@dile/ui'`, `'@dile/utils'`, `'@dile/crud'`, `'@dile/editor'`, `'@dile/lib'`).
- `element`:
  - `docs/components/`: tag with escaped brackets, quoted: `'&lt;dile-name&gt;'` (it is printed inside HTML cards).
  - `docs/crud/`: bare tag name: `dile-crud-list`.
  - Mixins / lib: the class or mixin name: `DileForm`, `DileAppRouter`.
- `status`: `stable` (default for finished components), `experimental` (new/unsettled API) or `deprecated`. Deprecated pages are excluded from catalog and nav collections.
- `summary`: one sentence (~15–25 words) saying what it does and its key features. It is shown on the catalog card **and** in `llms.txt`, so make it self-explanatory.
- `tags`: decides the catalog group and side-nav menu. Must match the lists in `eleventy.config.cjs`:
  - components: `forms`, `feedback`, `icons`, `utils`, `menu`, `spinner`, `layout`, or `input` (input family, shown through `_includes/input-family-grid.html`). Any other tag lands in "Other components".
  - crud: `introduction`, `configuration`, `ajax`, `operations`, `main`, `'Crud extras'` (quote tags with spaces).
  - mixins: `formData`, `effects`, `scroll`.
  - lib: `'state management'`, `routing`, `'app components'`.
  - icons: `lucide`, `fontawesome`, `material`, `phosphor`, `tabler`, `remixicon`, `'universal icons'`.
- Optional: `order: <n>` (crud/lib pages sorted manually), `hideLink: true` (keep the page out of nav listings).

If you introduce a brand new tag group, it must also be added to the corresponding list in `eleventy.config.cjs` (and an icon imported in `docs/assets/js/index.js` for component tags) — prefer reusing an existing tag.

## Page structure (component pages)

Keep this order; omit sections that don't apply. Headings are in English, like all docs.

````markdown
# dile-name

One or two sentences describing the Web Component and its purpose.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/name/name.js';
```

Use the component.

```html
<dile-name attribute="value"></dile-name>
```

## Properties
## Methods
## Events
## Slots
## CSS Custom Properties
## Accessibility        (optional: keyboard support, ARIA, labels)

## dile-name demos

### Basic usage
```html:preview
...
```

### Styled
...
````

Notes:

- The H1 is the tag name (`# dile-name`), or the class name for mixins (`# DileForm`).
- The import path is the public entry point under the package: `@dile/<pkg>/components/<folder>/<file>.js`.
- Feature-specific explanations (e.g. "Adding an icon", "Form Integration", "File downloads") go as extra `##`/`###` sections after Usage/Properties and before the demos.
- Use blockquotes (`> **Note:** ...`) for caveats and recommendations.
- Link related components with absolute site paths: `[dile-iconlib](/icons/dile-iconlib/)`.

### Properties

Prefer the 4-column table for new pages. Tables whose header has 4 columns including "Property" plus Type/Default/Description get the `properties-table` class and a responsive mobile layout (`docs/_utilities/properties-table-transform.cjs`), so keep exactly these columns:

```markdown
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `String` | `""` | The text encoded in the QR code. |
| `errorCorrection` | `String` | `"M"` | Error correction level. Exposed via `error-correction`. |
```

- Use the JS property name; when the attribute differs (camelCase → kebab-case), say "Exposed via `kebab-name`" or "(attribute `kebab-name`)".
- Older pages use a bullet list (`- **disabled**: Boolean, mark button as disabled.`). Keep that format when making small edits to such pages; don't mix both formats in one page.

### Methods, Events, Slots

Bullet lists with the name in bold:

```markdown
## Methods

- **open()**: Opens the modal box.
- **close()**: Closes the modal box.

## Events

- **dile-modal-closed**: Dispatched when the modal box is closed for any reason. `detail` contains ...

## Slots

- **main slot** (unnamed slot): the card main content.
- **footer slot**: card footer.
```

Always document the event `detail` shape. A short `addEventListener` snippet in a `javascript` block is welcome for non-trivial events.

### CSS Custom Properties

Pipe table with exactly these three columns (no leading pipes, as in existing pages):

```markdown
Custom property | Description | Default
----------------|-------------|---------
--dile-name-color | Text color | #303030
--dile-name-size | Component size | 32px
```

When a value falls back to generic theme variables, write the chain in Default (`--dile-primary-color or #7BB93D`). If the component reuses another component's properties, say so and link it. If it only has plain Shadow DOM styles, a "CSS Encapsulation"/"Styling" section with the `:host` CSS block is fine.

## Live demos (`html:preview`)

Fenced blocks with the language `html:preview` are turned into a live render plus a "Show Code" toggle by `docs/_utilities/code-previews.cjs`. The code runs on the real page.

- **Import once per page.** All preview blocks share `window`, so put `<script type="module">import '@dile/ui/components/name/name.js';</script>` only in the first preview of that component. Import again only for a *different* component not yet registered (e.g. icon glyphs `@dile/iconlib/lucide-icons/rocket.js`, `@dile/ui/components/pages/pages.js`).
- Components already imported globally by `docs/assets/js/index.js` (button, input, modal, card, tabs, etc.) work without an import, but importing them in the first block is harmless and keeps the page self-contained.
- Start with the simplest example (`### Basic usage` / `### Default`), then one `###` per relevant feature or property, then a `### Styled ...` demo that sets CSS custom properties through a class:

  ```html
  <style>
    .styled {
      --dile-name-color: #36c;
    }
  </style>
  <dile-name class="styled"></dile-name>
  ```

- Demos that need events or JS logic: define a small Lit element inside the preview's module script and render it. Give it a name unique within the page (`demo-otp-completed`, `my-rating-demo`...):

  ```html
  <script type="module">
    import { LitElement, html } from 'lit';
    import '@dile/ui/components/rating/rating.js';

    class RatingDemo extends LitElement {
      static properties = { value: { type: Number } };
      render() {
        return html`
          <dile-rating @dile-rating-selected=${e => this.value = e.detail.value}></dile-rating>
          <p>The rating is ${this.value ?? 0}</p>
        `;
      }
    }
    customElements.define('rating-demo', RatingDemo);
  </script>
  <rating-demo></rating-demo>
  ```

- Classic (non-module) scripts are wrapped in an IIFE automatically, so they can't leak globals — use module scripts for imports.
- Use plain inline styles (`display: flex; gap: 1.5rem; flex-wrap: wrap;`) to lay out several variants side by side.
- Images: put files in `docs/static-images/` and reference them as `/images/<file>`.
- Every `html:preview` must be valid stand-alone HTML; don't nest Markdown inside.
- CRUD pages reuse demo components through Liquid includes from `docs/_includes/componentes-crud/` (`{% include "componentes-crud/country-form.md" %}`); create a new include there if a demo element is shared between several CRUD pages.

## Deprecated components

Keep the page (old links keep working) but reduce it to:

```markdown
---
title: Countdown Time
package: '@dile/ui'
element: '&lt;dile-countdown-time&gt;'
status: deprecated
summary: Component no longer maintained. Check previous version documentation if you need ...
---

# dile-countdown-time

The dile-countdown-time web component is no longer maintained in this version of the dile-components. ...
```

## Writing style

- English, concise and practical. Explain *why/when* to use a property, not just its type.
- Code identifiers in backticks; property names in bold in bullet lists.
- Don't invent API: everything documented must exist in the component source.
- Keep docs, demo (`demos/<pkg>/`) and implementation in sync (see `AGENTS.md` for the full new-component checklist: demo file, demo index in alphabetical order, component test).

## Checklist

1. File in the right folder with the right name.
2. Front matter complete: `title`, `package`, `element`, `status`, `summary`, `tags` (valid tag).
3. Sections in order: H1 → intro → Installation → Usage → Properties → Methods → Events → Slots → CSS Custom Properties → (Accessibility) → `## dile-name demos`.
4. Properties table with Property | Type | Default | Description; attribute names mentioned when they differ.
5. Component imported once in the first `html:preview`; every demo renders.
6. Preview the site with `npm start` (Eleventy dev server) and check the page, its catalog card (`/components/`) and the nav entry.
