---
title: Spinner Modal
tags: spinner
---

# dile-spinner-modal

This is an adaptation of the [dile-spinner](/components/dile-spinner) element using a modal box, blocking the interface of the rest of the page when the spinner is active.

## Installation

```bash
npm i @dile/ui
```

## Usage

Similar as dile-spinner implementation. 

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner-modal.js';
```

Use the component.

```html
<dile-spinner-modal active></dile-spinner-modal>
```

## Styling

You can use the same custom properties as the ```dile-spinner``` component. 

Also, ```dile-spinner-modal``` has this aditional properties:

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-modal-background-color | The modal layer background color | rgba(255, 255, 255, 0.8)
--dile-spinner-modal-box-color | Color of a small layer rounding the spinner element for higher contrast and visibility | rgba(0, 0, 0, 0.9)

## dile-spinner-modal demos

### Default spinner

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-modal.js';

class MyComponent extends LitElement {

  render() {
    return html`
        <button id="start">Start spinner (it will stop in 5seg)</button>
        <dile-spinner-modal></dile-spinner-modal>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner-modal');
    this.shadowRoot.getElementById('start').addEventListener('click', (e) => {
      spinner.active = true;
      setTimeout(() => spinner.active = false, 5000);
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Styled spinner

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class SecondComponent extends LitElement {

  render() {
    return html`
      <style>
      .blue {
        --dile-spinner-color: #36a;
        --dile-spinner-modal-background-color: rgb(0, 0, 0, 0.8);
        --dile-spinner-modal-box-color: #fff;
      }
      </style>
      <p>
        <button id="start">Start spinner (it will stop in 5seg)</button>
      </p>
      <dile-spinner-modal class="blue"></dile-spinner-modal>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner-modal');
    this.shadowRoot.getElementById('start').addEventListener('click', (e) => {
      spinner.active = true;
      setTimeout(() => spinner.active = false, 5000);
    });
  }
}
customElements.define('second-component', SecondComponent);
</script>
<second-component></second-component>
```
