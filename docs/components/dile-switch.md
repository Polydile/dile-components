---
title: Switch
tags: forms
---

# dile-switch

Web Component to create a customizable switch input interface.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/switch/switch.js';
```

Use the component.

```html
<dile-switch>Optional label</dile-switch>
```

### Properties

- **checked**: Boolean, defines the switch state (cheked / unchecked).
- **disabled**: Boolean, defines the switch as disabled.
- **name**: The name of the switch, only for identification purposes
- **useReactiveLabels**: Boolean, this property indicates that the component have to use the switch reactive labels (`checkedLabel` and `uncheckedLabels`).
- **checkedLabel**: The label to the checked state (when `useReactiveLabels` is set to `true`)
- **uncheckedLabel**: The label to the unchecked state (when `useReactiveLabels` is set to `true`)

There is a special ```value``` property. This is not a actual component property but it mirrors the ```checked``` property, because sometimes forms colud use this property instead of checked to query or change it's state.

### Custom events

- **dile-switch-changed**: Every time the switch changes emits a ```dile-switch-changed``` event. When fired, the custom event sends a detail object, containing two properties: ```checked``` and ```name```.

- **element-changed**: this event is dispatched when the checked property changes. This event sends a detail object containing this properties: ```name```, ```checked``` and ```value```.

> You may note these are similar events (dile-switch-changed and element-changed). The reason is because dile-switch extends [DileEmmitChangeMixin](/mixins/dile-emmit-change-mixin) to be compatible with [DileFormMixin](/mixins/dile-form-mixin).

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-switch-bar-color | Central bar color | #ccc
--dile-switch-off-state-color | Off state bullet color | #d52121
--dile-switch-on-state-color | On state bullet color | #2566e8
--dile-switch-flex-direction | Flex direction between switch and label  | row
--dile-switch-gap | Gap between switch and label | 0.5rem
--dile-switch-align-items | Flex align items between switch and label  | center
--dile-switch-justify-content | Flex justify content between switch and label | flex-start
--dile-switch-on-focus-color | Focus border color on cheked state | #6fc
--dile-switch-off-focus-color | Focus border color on uncheked state | #fdb423

## dile-switch demos

## Regular switch

```html:preview
<script type="module">
  import '@dile/ui/components/switch/switch.js';
</script>
<dile-switch name="1stcheck" id="check1" >Status</dile-switch>
```

## Without label

```html:preview
<dile-switch name="name"></dile-switch>
```

## Disabled switch

```html:preview
<dile-switch name="name" disabled>Disabled!</dile-switch>
```

## Styled switch
```html:preview
<style>
.styled {
  --dile-switch-bar-color: #601a5f; 
  --dile-switch-off-state-color: #f7f4f4;
  --dile-switch-on-state-color: rgb(255, 221, 68); 
}
</style>
<dile-switch class="styled" checked>Styled!</dile-switch>
```

