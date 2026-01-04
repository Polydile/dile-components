# Icon libraries as Web Components

@dile/iconlib provides Web Components wrappers for popular icon libraries like [Lucide Icons](https://lucide.dev) or [FontAwesome](https://fontawesome.com/).


This package allows you to use icons as standard HTML elements without framework dependencies or build tools.

Full documentation available at [Dile components icons](https://dile-components.com/icons/).

## Features

- Framework-agnostic: Works in any JavaScript environment.
- Tree-shakable: Import only needed icons to minimize bundle size.
- Customizable: Control size, color, and other styles via CSS custom properties.
- Shadow DOM support: Encapsulated styles prevent conflicts.

## Usage

Import and use icons directly in HTML or templates.

```html
<script type="module" src="https://unpkg.com/@dile/iconlib/lucide-icons/bird.js"></script>

<dile-lucide-icon-bird></dile-lucide-icon-bird>
```

Configure styles with CSS custom properties like `--dile-icon-size` and `--dile-icon-color`.

You can also use the icon libraries together with other frontend tools like Vite, importing the components with the package name:

```javascript
import '@dile/iconlib/lucide-icons/bird.js';
```

## Customization

Icons support attributes:

- `rounded`: adds a rounded background area around the SVG, turning the icon into a button-like appearance.

## Demo

Live examples and API details on the [documentation page](https://dile-components.com/icons/).
