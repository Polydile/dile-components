---
title: Icon Switch Group
tags: icons
---

# dile-icon-switch-group

Web Component to create a group of switchs based on dile-icon-switch.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/icon-switch/icon-switch-group.js';
```

```html
<dile-icon-switch-group>
  <dile-icon-switch .icon=${appsIcon} name="apps"></dile-icon-switch>
  <dile-icon-switch .icon=${favoriteIcon} name="fav" active></dile-icon-switch>
  <dile-icon-switch .icon=${doubleArrowRightIcon} name="arrow"></dile-icon-switch>
</dile-icon-switch-group>
```

## Custom CSS properties

Each icon in the switch group adopts the custom styles via CSS custom properties defined in the [dile-icon-switch](/components/dile-icon-switch/) component.


## Custom events

This component does not emit specific custom events itself, but you can listen to the custom events dispatched by the [dile-icon-switch](/components/dile-icon-switch/) components implemented in the group — in particular, the `dile-icon-switch-changed` event, which is triggered whenever an icon is selected.

## dile-icon-switch-group demos


```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/icon-switch/icon-switch-group.js';
import '@dile/ui/components/icon-switch/icon-switch.js';
import { appsIcon, descriptionIcon, starIcon } from "@dile/icons/index.js";

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
      }
    `
  }

  render() {
    return html`
      <dile-icon-switch-group>
        <dile-icon-switch .icon=${appsIcon} name="apps"></dile-icon-switch>
        <dile-icon-switch .icon=${descriptionIcon} name="desc" active></dile-icon-switch>
        <dile-icon-switch .icon=${starIcon} name="star"></dile-icon-switch>
      </dile-icon-switch-group>
    `
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```


