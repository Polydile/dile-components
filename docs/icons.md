---
layout: layout.html
---

# icons

This package contains some useful icons and a style declaration to customize the size and the icon color.

## Installation 

```bash
npm install @dile/icons 
```

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

### Manage icon styles

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

### Using icons with dile-icon component

This icons library works well with the [dile-icon](/components/dile-icon) component. 


When you use ```<dile-icon>``` you will have configured the icon custom properties and styles to the icon box, in order to fit your icons in a better way.

```javascript
import { calendarIcon } from '@dile/icons';
import '@dile/dile-icon/dile-icon.js';

html`<dile-icon icon=${calendarIcon}</dile-icon>`;
```

See [dile-icon docs](/components/dile-icon) for more information.

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888

## Icons included

<script type="module">
import { LitElement, html, css } from 'lit';
import * as availableIcons from "@dile/icons";

class IconsDemo extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-icon-color: rgb(41, 164, 119);
      }
      #icons {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1rem;
      }
      @media(min-width: 370px) {
        #icons {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media(min-width: 550px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
      @media(min-width: 710px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }
      @media(min-width: 900px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
      }
      #icons article {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #icons article span {
        margin-top: 0.3rem;
        font-size: 0.9rem;
      }
      .dile-icon path, .dile-icon polygon {
        fill: var(--dile-icon-color, #888);
      }
      .dile-icon path[fill="none"] {
        fill: transparent;
      }
      .dile-icon {
        width: var(--dile-icon-size, 24px);
        height: var(--dile-icon-size, 24px);
      }
    `
  }

  render() {
    const iconNames = [];
    for (const iconName in availableIcons) {
      if(iconName != 'iconStyles') {
        iconNames.push(iconName);
      }
    }

    return html`
      <div id="icons">
        ${iconNames.map(iconName => html`
          <article>
            <dile-icon .icon="${availableIcons[iconName]}"></dile-icon>
            <span>${iconName}</span>
          </article>
        `)}
      </div>
    `;
  }
}
customElements.define('icons-demo', IconsDemo);
</script>
<icons-demo></icons-demo>
```