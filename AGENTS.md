# Development Guidelines for Dile Components

## Repository overview

This repository is a monorepo for the Dile Components library. It contains multiple packages under the `packages/` directory, each focused on a different area of the component ecosystem.

### Packages

- `packages/ui` — UI components for graphical interfaces, published as `@dile/ui`
- `packages/utils` — utility components, published as `@dile/utils`
- `packages/crud` — CRUD-related components, published as `@dile/crud`
- `packages/editor` — rich text / editor components, published as `@dile/editor`
- `packages/icons` — icon assets and helpers, published as `@dile/icons`
- `packages/iconlib` — icon library web component implementations
- `packages/lib` — shared library helpers and app-oriented abstractions

## Documentation site

The documentation site project is located in the `docs/` directory. This is the source for the Eleventy-based documentation website.

Component doc pages (`docs/components/*.md`) contain `html:preview` code blocks that render live demos. These blocks share the same page/global scope (`window`), so a component's `<script type="module">import '@dile/ui/components/<name>/<name>.js';</script>` only needs to appear once per page — `customElements.define` registers the element on `window` and every later `html:preview` block on that page can use the tag without importing it again. Only import again if a later block introduces a *different* component not yet registered.

## Demos

Interactive demos are stored in the `demos/` directory.

- UI component demos go in `demos/ui/`
- Utils component demos go in `demos/utils/`
- CRUD component demos go in `demos/crud/`

## When creating a new component

When implementing a new component, follow these conventions:

1. Create the component in the appropriate package folder under `packages/`.
2. Create a demo file in the matching demos folder:
   - UI components: `demos/ui/`
   - Utils components: `demos/utils/`
   - CRUD components: `demos/crud/`
3. Create documentation for the component:
   - UI components: `docs/components/`
   - CRUD components: `docs/crud/`
4. Add the demo to the corresponding demo index file:
   - CRUD components: `demos/crud/index.html`
   - Other components: `demos/index.html`
   - Keep the demo list in alphabetical order.
5. Use the existing component documentation files as a base for style and structure.
6. Follow the naming and file organization patterns already used by existing components in the repository.
7. Keep the documentation concise, practical, and aligned with the existing docs format.

## Development workflow

- Use the existing component folders and files as reference points before creating new ones.
- Prefer small, focused components that follow the conventions already used in this repository.
- Keep demos and documentation in sync with the implementation.
- When adding a new component, make sure it is easy to discover through its demo and its documentation page.

## Component tests (Vitest + Playwright)

There is no requirement to have tests for every component in the catalog. Instead, tests are added incrementally: whenever you create or update a UI/utils/crud component, add or update its component test as part of that change.

- Tests run in a real Chromium browser via Vitest's browser mode (`@vitest/browser-playwright`), configured in `vitest.config.js` at the repo root. This is needed because these are Lit web components that rely on shadow DOM, slots, and custom element registration, which jsdom cannot fully emulate.
- Co-locate the test file next to the component's public entry point, using the `.spec.js` suffix, e.g. `packages/ui/components/button/button.spec.js` tests `packages/ui/components/button/button.js`.
- Import the component's registration file (e.g. `./button.js`), append markup to `document.body`, await `el.updateComplete`, then assert against `el.shadowRoot` and dispatched events. Clean up `document.body` in `afterEach`.
- Focus tests on the component's public contract: rendered output, reactive properties/attributes, dispatched custom events, and slotted content — not implementation details.
- Plain unit tests for framework-agnostic helper functions (e.g. `packages/crud/lib/image/*.test.js`, `packages/ui/lib/otp/*.test.js`) continue to use Node's built-in `node:test` runner and are unaffected by this setup.
- Run component tests with `npm run test:components` (or `npm run test:components:watch` while iterating). See `packages/ui/components/button/button.spec.js` for a reference example.
