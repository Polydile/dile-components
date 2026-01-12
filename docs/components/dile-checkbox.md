---
title: Checkbox
tags: forms
---

# dile-checkbox

Web Component to create a customizable checkbox input form element.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/checkbox/checkbox.js';
```

Use the component:

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
--dile-checkbox-unchecked-color | Unchecked color for check control | #303030
--dile-checkbox-label-color | label regular color | --dile-on-background-color or #303030
--dile-checkbox-label-disabled-color | Label color for disabled status | #888
--dile-checkbox-label-margin-left | Label margin to the input element | 0.25rem
--dile-checkbox-font-weight | Font weight for te label | normal
--dile-checkbox-size | Checkbox size | 20px

## dile-checkbox demos

### Regular checkbox

```html:preview
<dile-checkbox name="1stcheck" id="check1" >I agree the <a href="#">terms of use</a></dile-checkbox>
```

### Without label

```html:preview
<dile-checkbox name="name"></dile-checkbox>
```

### Disabled checkbox

```html:preview
<dile-checkbox name="name" disabled>Disabled!</dile-checkbox>
```

### Styled checkbox

```html:preview
<style>
.styled {
  --dile-checkbox-checked-color: #006;
  --dile-checkbox-unchecked-color: #f66;
  --dile-checkbox-label-color: #c57;
  --dile-checkbox-font-weight: bold;
  --dile-checkbox-label-disabled-color: #ddd;
  --dile-checkbox-size: 32px;
}
</style>
<dile-checkbox class="styled" checked>Styled!</dile-checkbox>
```

