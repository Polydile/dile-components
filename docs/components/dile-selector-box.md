---
title: Selector Box
tags: menu
---

# dile-selector-box

The `dile-selector-box` component is a specialized version of the `dile-selector` component, offering a different design for selection items through a box-based interface rather than a list.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/box-selector/box-selector.js';
import '@dile/ui/components/box-selector/box-selector-item.js';
```

Use the component.

```html
<dile-box-selector 
    attrForSelected="name"
    @dile-selected-changed="${this.onActionSelected}"
>
    ${this.actions.map(action => html`
        <dile-box-selector-item 
            label="${action.label}"
            name="${action.name}"
        ></dile-box-selector-item>
    `)}
</dile-box-selector>
```

## Not Documented

This component has not been fully documented yet, as it may not provide significant utility on its own. We primarily use it to present available actions for resources in a REST API within the [dile-crud-single component](/crud/crud-single/).

It only customizes the styles for selection items, based on the implementation of the [DileSelectable mixin](/mixins/dile-selectable-mixin/). This component can serve as a good example of how to use that mixin to create your own selection components.