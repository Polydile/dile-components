---
layout: layout.html
Title: How to use dile-components
---

# How to use dile-components

Here you can find some information about using this component catalog on your own site. Since this catalog is developed as standard web components, you can use it in any JavaScript project, whether you're using Vanilla JS or any framework.

On every single component documentation, you will find specific instructions on how to use it. The above steps will provide you with general information related to our packages' organization and usage.

## Package organization

Dile components are managed in several component packages, grouped by utility:

- @dile/ui: User interface web components.
- @dile/editor: WYSIWYG editor to create Markdown contents.
- @dile/icons: Popular open‑source icon catalogs provided as custom elements.
- @dile/utils: General utility components.
- @dile/crud: Generic and customizable CRUD components.
- @dile/lib: Components and utilities for easily creating apps.

## 1. Install any of the web components

You need to install the package that contains the component you need. For example if you want to use dile-input you should install @dile/ui via npm:

```bash
npm install @dile/ui
```

> Each component documentation has the specific installation instructions.


## 2. Import the component

You can do that with an ESModules import in your Javascript code, usually using the npm package name. 

```javascript
import '@dile/ui/components/input/input.js';
```

In order to process imports with the package name in the browser you will need to use a frontend tool like Vite, Webpack or Rollup. 

## 3. Use the component

This is a simple example of using a web component in your HTML.

```html
<dile-input
  name="name"
  label="Name"
  value="John"
></dile-input>
```

When using the components, it’s also very important to customize them so they match the look and feel of your website. All components include CSS custom properties that let you adjust their appearance, changing things like color, spacing, borders, etc.

To better understand how to customize components globally and create a consistent look across your entire site, we recommend reading the dedicated [theming page](/theming/).


## 4. Read the docs

In the component documentation of each component you will find more information about component properties, CSS custom properties, API methods and custom events.

## 5. Serve Your Project

There are many development servers to help you in this point. Our recommendation is to use [ViteJS](https://vitejs.dev/) or [web-dev-server](https://modern-web.dev/docs/dev-server/overview/). 

## 6. Build Your Project

To build your project is necessary to use Webpack, Rollup or similar. Right now, the best and easiest option is to use [Vite](https://vite.dev/).
