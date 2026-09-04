---
layout: layout.html
Title: How to use dile-components
---

# How to use dile-components

This guide will help you integrate dile-components into your projects. Since these are standard web components built with [Lit](https://lit.dev/), they work seamlessly with any JavaScript framework or vanilla JavaScript—no framework dependency required.

Each component has its own detailed documentation with specific usage instructions, properties, and examples. This section covers the general workflow: package organization, installation, and basic setup steps.

## Package organization

Dile components are managed in several component packages, grouped by utility:

- @dile/ui: User interface web components.
- @dile/editor: WYSIWYG editor to create Markdown contents.
- @dile/utils: General utility components.
- @dile/crud: Generic and customizable CRUD components.
- @dile/lib: Components and utilities for easily creating apps.
- @dile/iconlib: Popular open‑source icon catalogs provided as custom elements
- @dile/icons: A sub-set of Material Icons as Lit-html templates
- @dile/pdf-viewer: PDF viewer web component

## How to use the components catalog

### 1. Install any of the web components

You need to install the package that contains the component you need. For example if you want to use dile-input you should install @dile/ui via npm:

```bash
npm install @dile/ui
```

> Each component documentation has the specific installation instructions.


### 2. Import the component

You can do that with an ES modules import in your JavaScript code, using the npm package name. 

```javascript
import '@dile/ui/components/input/input.js';
```

To resolve imports with the npm package name in the browser, you'll need to use a module bundler like Vite, Webpack, or Rollup. 

### 3. Use the component

This is a simple example of using a web component in your HTML.

```html
<dile-input
  name="name"
  label="Name"
  value="John"
></dile-input>
```

When using the components, it is crucial to customize them to match your website's design. All components provide CSS custom properties that allow you to adjust their appearance—colors, spacing, borders, and more.

To better understand how to customize components globally and create a consistent look across your entire site, we recommend reading the dedicated [theming page](/theming/).


### 4. Read the docs

In the component documentation of each component you will find more information about component properties, CSS custom properties, API methods and custom events.

### 5. Serve Your Project

Several development servers are available. We recommend [Vite](https://vitejs.dev/) or [web-dev-server](https://modern-web.dev/docs/dev-server/overview/). 

### 6. Build Your Project

Building your project requires a bundler like Webpack, Rollup, or similar tools. [Vite](https://vite.dev/) is currently the best and easiest option.

## Creating apps

In addition to the components, we offer tools for creating complete applications. These tools are mainly located in the [@dile/lib](/lib) package.

### Create a complete application scaffolding

With the dile-components CLI, you can scaffold a complete frontend application with built-in utilities, including a responsive layout, authentication system, state management, and user feedback components.

You can find the documentation for the [dile-components CLI](https://cli.dile-components.com/).
