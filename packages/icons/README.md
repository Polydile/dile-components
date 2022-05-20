# @dile/icons

This package contains some useful icons.

```
import { infoIcon } from '@dile/icons';
```

Yo may use this icon in a Lit template:

```
render() {
  return html`
    // Your component template
    ${ infoIcon }
  `;
}
```

To create the icon styles easily you may use the CSS declaration provided in this package.

```
import { iconCss } from '@dile/icons';
```

You may use the style declaration in Lit:

```
static get styles() {
  return [iconCss, css`
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