---
name: dile-components
description: Use when building or modifying UI with the Dile Components library (@dile/ui, @dile/crud, @dile/editor, @dile/utils, @dile/lib, @dile/iconlib, @dile/icons) — a framework-agnostic, Lit-based web component catalog. Trigger when installing/importing dile-* custom elements, using tags like <dile-input>, <dile-modal>, <dile-table>, building CRUD screens, adding a WYSIWYG/Markdown editor, using icon components, or theming with Dile's CSS custom properties.
---

# Dile Components

Dile Components (`@dile/*`) is a catalog of framework-agnostic web components built with [Lit](https://lit.dev). They work as plain custom elements in any project — vanilla JS, React, Vue, Angular, etc. — as long as the build tool resolves npm bare imports (Vite, Webpack, Rollup, web-dev-server...).

## Package map

Pick only the package(s) that contain what you need — don't install all of them.

| Package | Use for |
|---|---|
| `@dile/ui` | General UI components: inputs, modals, tables, buttons, etc. |
| `@dile/crud` | Generic, configurable CRUD screens/components |
| `@dile/editor` | WYSIWYG / Markdown rich text editor (ProseMirror-based) |
| `@dile/utils` | General-purpose utility components |
| `@dile/lib` | Mixins/helpers for building apps (state, routing, feedback) |
| `@dile/iconlib` | Icon catalogs (Lucide, Font Awesome, Material...) as custom elements |
| `@dile/icons` | Subset of Material Icons as Lit templates |

## Quick start

1. Install only the package(s) you need:
   ```bash
   npm install @dile/ui
   ```
2. Import the specific component file (ESM, bare specifier):
   ```javascript
   import '@dile/ui/components/input/input.js';
   ```
3. Use it as an HTML tag:
   ```html
   <dile-input name="name" label="Name" value="John"></dile-input>
   ```
4. Customize appearance through the component's CSS custom properties (see theming reference below) instead of reaching into its shadow DOM.

## Always check the real API before using a component

Component names, props, events, and import paths differ per component and change between versions — don't guess them from memory. Look them up first:

- **Index of all docs (llms.txt)**: https://dile-components.com/llms.txt — a machine-readable index linking to every component/mixin/CRUD/lib/icon doc page as plain markdown.
- **Fetch a specific doc page directly** once you know its section, e.g.:
  - `https://dile-components.com/md/components/<component>.md`
  - `https://dile-components.com/md/crud/<page>.md`
  - `https://dile-components.com/md/lib/<page>.md`
  - `https://dile-components.com/md/icons/<page>.md`
- **Human docs site**: https://dile-components.com/
- **Theming / CSS custom properties**: https://dile-components.com/theming/
- **Live demo sources**: https://github.com/Polydile/dile-components/tree/master/demos

Workflow: fetch `llms.txt` first to find the right doc link for the component/feature you need, then fetch that specific `.md` page for exact props, events, slots, and usage examples.

## Notes

- All packages are MIT-licensed and published under the `@dile` npm scope.
- Packages are versioned independently — check each package's `package.json` for the current version.
- Repository: https://github.com/Polydile/dile-components
