# Dile Components V2

This is the repository for **Dile Components**, a catalog of Custom Elements built with Web Components and Lit.

Find the full documentation and details of the Dile Components catalog at [dile-components.com](https://dile-components.com/)

> If you're looking for the previous version of this component catalog, you can find it in this repository: <https://github.com/Polydile/Components-legacy>

## Packages in This Repository

- `@dile/ui`: Components for building common user interfaces, such as buttons, dialogs, custom form elements, and more.
- `@dile/utils`: Utility components that provide helpful functionalities for web development.
- `@dile/icons`: Templates for integrating SVG icons into your components.
- `@dile/editor`: A Markdown WYSIWYG (What You See Is What You Get) editor for the web.
- `@dile/crud`: Customizable and generic CRUD components.
- `@dile/iconlib`: Icon libraries web components implementations.

To use components from this library, follow the steps below.

## Installation

First, install the package that contains the component you want to use. For example, to use the UI custom elements, install `@dile/ui`:

```bash
npm install @dile/ui
```

## Component Usage

To use a component from this library, import the specific element you need. For example, to use the toast feedback element:

```javascript
import '@dile/ui/components/toast/toast.js';
```

Then, you can use the component in your application like this:

```html
<dile-toast></dile-toast>
```

## Complete Documentation

You can find a complete list of custom elements—along with their properties, methods, events, and usage examples—on the [Dile Components website](https://dile-components.com):

<https://dile-components.com>

## Contributing

If you'd like to contribute by publishing a component to this library, you can find a complete [guide to understanding the component organization](https://dile-components.com/contribute/).