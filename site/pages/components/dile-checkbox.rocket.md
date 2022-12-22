```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-checkbox.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = "dile-checkbox";

```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-checkbox/dile-checkbox.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-checkbox

Web Component to create a customized checkbox input interface, based on Lit.

## Installation

```bash
npm i @dile/dile-checkbox
```

## Usage

Import the component.

```javascript
import '@dile/dile-checkbox/dile-checkbox.js';
```

Use the component.

```html
<dile-checkbox>Label for the checkbox element</dile-checkbox>
```

### Properties

- **checked**: Boolean, defines the checkbox state (cheked / unchecked).
- **disabled**: Boolean, defines the checkbox as disabled.
- **name**: The name of the checkbox, only for identification purposes

There is a special ```value``` property. This is not a actual component property but it mirrors the ```checked``` property, because sometimes forms colud use this property instead of checked to query or change it's state.

### Custom events

- **dile-checkbox-changed**: Every time the checkbox changes emits a ```dile-checkbox-changed``` event. When fired, the custom event sends a detail object, containing two properties: ```checked``` and ```name```.

- **element-changed**: this event is dispatched when the cheked property changes. This event sends a detail object containing this properties: ```name```, ```checked``` and ```value```.

> You may note these are similar events (dile-checkbox-changed and element-changed). The reason is because dile-checkbox extends [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin) to be compatible with [DileFormMixin](/mixins/dile-form-mixin).

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-checkbox-checked-color | Checked color for check control | #30a030
--dile-checkbox-unchecked-color | Unchecked color for check control | #ccc
--dile-checkbox-fill-color | Fill color for the check control | #fff
--dile-checkbox-unchecked-fill-color | Checked color for check control when is in unchecked status| #fff
--dile-checkbox-label-color | label regular color | #303030
--dile-checkbox-label-disabled-color | Label color for disabled status | #303030
--dile-checkbox-font-weight | Font weight for te label | normal
--dile-checkbox-size | Checkbox size | 20px

#### Customization example

## Regular checkbox

```html preview-story
<dile-checkbox name="1stcheck" id="check1" >I agree the <a href="#">terms of use</a></dile-checkbox>
```

## Without label

```html preview-story
<dile-checkbox name="name"></dile-checkbox>
```

## Disabled checkbox

```html preview-story
<dile-checkbox name="name" disabled>Disabled!</dile-checkbox>
```

## Styled checkbox
```html preview-story
<style>
.styled {
  --dile-checkbox-checked-color: #006;
  --dile-checkbox-unchecked-color: #f66;
  --dile-checkbox-fill-color: #fcc;
  --dile-checkbox-unchecked-fill-color: #666;
  --dile-checkbox-label-color: #c57;
  --dile-checkbox-font-weight: bold;
  --dile-checkbox-label-disabled-color: #ddd;
  --dile-checkbox-size: 28px;
}
</style>
<dile-checkbox class="styled" checked>Styled!</dile-checkbox>
```

