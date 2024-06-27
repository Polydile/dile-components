---
layout: layout.html
---

# Contribute on dile-components

This is a monorepository managed by npm Workspaces and [Lerna](https://github.com/lerna/lerna).

## Package organization

The components catalog are divided into some packages located in the "packages" folder:

- Editor: Rich markdown Editor (WYSIWYG)
- Icons: SVG icons library
- UI: UI Custom Elements
- Utils:  Utility custom elements

## How to develop components

To develop web components in this catalog fork this repository.

Then install the dependencies runing:

```bash
npm install
```

Then follow this steps:

### 1. Create your component

Create your desired Custom Element on the apropiate package. Make a folder for the componente and follow the conventions that you can see in other custom elements.

### 2. Create a demo

The demos are allocated on the `demo` folder. 

### 3. Run vite to see the demos

After you have created the demo page, run Vite to start a developing server and see your custom element in action.

```bash
npm run dev
```

### 4. Write the docs

The component documentation is located in the `docs` folder and then `components` folder. In that folder you can find the markdown files for each component documentation.

Create a new file for your element following the conventions. 

Then run the document site documentation in your computer starting Eleventy SSG.

```bash
npm  run start
```

### 5. Create a pull Request on Github

Finally, create a pull Request on Github.