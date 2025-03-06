# Dile Components V2

This is the "dile-components" catalog repository, a library of Custom Elements based on Web Components and Lit.

Find the full documentation and details of the 'dile-components' catalog at [dile-components.com](https://dile-components.com/)

> If you are looking for the previous version of this component catalog, you can find it in this repository: <https://github.com/Polydile/Components-legacy>

## Packages in This Repository

- `@dile/ui`: Components for creating common User Interfaces, such as buttons, dialogs, custom form elements, etc.
- `@dile/utils`: Components that provide useful functionalities for web development.
- `@dile/icons`: Templates for implementing SVG icons within your components.
- `@dile/editor`: A Markdown WYSIWYG (What You See Is What You Get) editor for the web.
- `@dile/crud`: Customizable generic CRUD components.

To utilize this component library, follow these steps.

## Installation

First install the repository where the desired component is located. For instance, to use the UI custom elements, install `@dile/ui`:

```bash
npm install @dile/ui
```

## Component usage

To utilize a component from this library, you must import the element you need. For example, to use the toast feedback element, use the following import:

```javascript
import '@dile/ui/components/toast/toast.js';
```

After importing, you can use the component in your application like so:

```html
<dile-toast></dile-toast>
```

## Complete docs

You will find a complete list of the custom elements, along with their properties, methods, events, and examples on the [dile-components website](https://dile-components.com/):

<https://dile-components.com>

## Contribute

If you like to contribute publishing a component to this library, you will find a complete [guide to understand the components organization](https://dile-components.com/contribute/).
