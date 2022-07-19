# @dile/icons

This package contains some useful icons and a style declaration to customize the size and the icon color.

## Usage

Import the icon you need:

```javascript
import { infoIcon } from '@dile/icons';
```

Use the icon in a Lit template:

```javascript
render() {
  return html`
    // Your component template
    ${ infoIcon }
  `;
}
```

To create the icon styles easily you may use the CSS declaration provided in this package.

```javascript
import { iconStyles } from '@dile/icons';
```

Then, you can use the style declaration in your Lit component:

```javascript
static get styles() {
  return [iconStyles, css`
    :host {
        --dile-icon-color: #fce;
      }
  `];
}
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888