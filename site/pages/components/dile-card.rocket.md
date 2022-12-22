```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-card.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "dile-card";

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-card/dile-card.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-card

Web Component to create a customized Card.

## Installation

```bash
npm i @dile/dile-card
```

## Usage

Import the component

```javascript
import '@dile/dile-card/dile-card.js';
```

Use the component

```html
<dile-card shadow-md title="Welcome to this card">
  <div>
    This card has title and main body
  </div>
  <div slot="footer">
    <a href="#">Action 1</a>
  </div>
</dile-card>
```

## Slots

This component has two slots.

- **main slot** (unnamed slot): for the card main content.
- **footer slot**: card footer.

## Properties

- **title**: Card title, string (optional).

## Shadow attributes

By default the card has a light shadow (between `sm` and `md`). but you can set the shadow using some attributes.

- **shadow-sm**: Small shadow.
- **shadow-md**: Medium shadow.
- **shadow-lg**: Large shadow.
- **shadow-xl**: Extra large shadow.
- **shadow-2xl**: Extra Extra large shadow.
- **shadow-none**: Without shadow.

If a responsive shadow needed, you can use the ```--dile-card-box-shadow``` CSS Custom property.

```css
dile-card {
  --dile-card-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
@media(min-width: 500px) {
  dile-card {
    --dile-card-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  } 
}
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-card-padding-y | Vertical padding | 0.5rem
--dile-card-padding-x | Horizontal padding | 0.8rem
--dile-card-border | Card border | 1px solid #ccc
--dile-card-border-radius | Card border radius | 0.5rem
--dile-card-background-color | Background color | #fff
--dile-card-text-color | Text color | #303030
--dile-card-text-align | Text align | left
--dile-card-font-weight | Font weight | normal
--dile-card-title-font-size | Title font size | 1.5rem
--dile-card-title-font-weight | Title font weight | 300
--dile-card-title-margin-bottom | Aditional margin-bottom for the title | 0
--dile-card-footer-border-separator | Footer border separator | 1px solid #ccc
--dile-card-footer-background-color | Footer background color | transparent
--dile-card-footer-padding-top | Footer padding top | 0.75rem
--dile-card-box-shadow | Box shadow | Defined by the shadow attributes

## dile-card demos

### Regular card

```html preview-story
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-sm>This card has only main body</dile-card>
```

### Card with title

```html preview-story
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-xl title="Welcome to this card">This card has title and main body</dile-card>
```

### Card with title, footer and main content

```html preview-story
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-md title="Welcome to this card">
  <div>
    This card has title and main body
  </div>
  <div slot="footer">
    <a href="#">Action test</a>
  </div>
</dile-card>
```

### Styled card

```html preview-story
<style>
  .styled {
    --dile-card-border: 2px solid #add;
    --dile-card-border-radius: 20px;
    --dile-card-background-color: #f4f4f4;
    --dile-card-text-color: #36f;
    --dile-card-title-font-weight: 700;
    --dile-card-footer-border-separator: 2px solid #add;
    --dile-card-footer-background-color: #eff;
    --dile-card-footer-padding-top: 12px;
  }
  .footer-styled {
    color: #666;
  }
</style>
<dile-card shadow-none title="I am a styled card" class="styled">
  Styled card main content
  <span slot="footer" class="footer-styled">
    Footer content
  </span>
</dile-card>
```

### Responsive card

```html preview-story
<style>
  .responsive-card {
    --dile-card-box-shadow: 0 0 #0000;
    --dile-card-border-radius: 1px;
  }
  @media (min-width: 400px) {
    .responsive-card {
      --dile-card-border-radius: 5px;
      --dile-card-box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }
  @media (min-width: 600px) {
    .responsive-card {
      --dile-card-border-radius: 10px;
      --dile-card-box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }
  @media (min-width: 800px) {
    .responsive-card {
      --dile-card-border-radius: 15px;
      --dile-card-box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }
  }
</style>
<dile-card class="responsive-card" title="Shadow responsive">
  The shadow of this card has a responsive change.
</dile-card>
```
