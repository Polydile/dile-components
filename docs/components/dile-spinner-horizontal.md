---
title: Spinner Horizontal
tags: spinner
---

# dile-spinner-horizontal

This component implements a loading animation on a horizontal layout.

## Installation

```bash
npm i @dile/ui
```

## Usage

Similar as dile-spinner implementation. 

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner-horizontal.js';
```

Use the component.

```html
<dile-spinner-horizontal active></dile-spinner-horizontal>
```

## Styling

It is possible to customize the component with this custom CSS properties:

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-horizontal-height | Height of the interface | 1rem
--dile-spinner-horizontal-line-size | Height of the animated line | 2px
--dile-spinner-horizontal-color | Color of the lines | #888
--dile-spinner-animation-time | Animation time | 2.2s
--dile-spinner-horizontal-width | Width lines | 70px

## dile-spinner-horizontal demos

### Default spinner

```html:preview
<dile-spinner-horizontal active></dile-spinner-horizontal>
```

### Styled spinner

```html:preview
<style>
  .styled {
    --dile-spinner-horizontal-height: 2rem;
    --dile-spinner-horizontal-line-size: 6px;
    --dile-spinner-horizontal-color: orange;
    --dile-spinner-animation-time: 4s;
    --dile-spinner-horizontal-width: 200px;
  }
</style>
<dile-spinner-horizontal class="styled" active></dile-spinner-horizontal>
```

### Iteractive demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-horizontal.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <style>
      .styled {
        --dile-spinner-horizontal-color: #3c9;
        --dile-spinner-horizontal-width: 120px;
        --dile-spinner-horizontal-line-size: 4px;

      }
      </style>
      <p>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
      </p>
      <dile-spinner-horizontal class="styled"></dile-spinner-horizontal>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner-horizontal');
    this.shadowRoot.getElementById('start').addEventListener('click', (e) => {
      spinner.active = true;
    });
    this.shadowRoot.getElementById('stop').addEventListener('click', (e) => {
      spinner.active = false;
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```
