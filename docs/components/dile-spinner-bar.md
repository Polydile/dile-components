---
title: Spinner Bar
tags: spinner
---

# dile-spinner-bar

This component implements a loading animation as a full-width horizontal bar with a moving gradient.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner-bar.js';
```

Use the component.

```html
<dile-spinner-bar active></dile-spinner-bar>
```

## Styling

It is possible to customize the component with this custom CSS properties:

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-bar-height | Height of the bar | 4px
--dile-spinner-bar-color-1 | Start and end color of the gradient | #1e3c72
--dile-spinner-bar-color-2 | Center color of the gradient (the moving highlight) | #00d4ff
--dile-spinner-bar-animation-time | Duration of one animation cycle | 1.8s
--dile-spinner-bar-border-radius | Border radius of the bar | 0

## dile-spinner-bar demos

### Default spinner

```html:preview
<dile-spinner-bar active></dile-spinner-bar>
```

### Styled spinner

```html:preview
<style>
  .styled {
    --dile-spinner-bar-height: 10px;
    --dile-spinner-bar-color-1: #11998e;
    --dile-spinner-bar-color-2: #d4ffeb;
    --dile-spinner-bar-border-radius: 5px;
    --dile-spinner-bar-animation-time: 1.2s;
  }
</style>
<dile-spinner-bar class="styled" active></dile-spinner-bar>
```

### Interactive demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-bar.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <style>
      .styled {
        --dile-spinner-bar-height: 6px;
        --dile-spinner-bar-color-1: #f7971e;
        --dile-spinner-bar-color-2: #ffd200;
        --dile-spinner-bar-border-radius: 3px;
      }
      </style>
      <p>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
      </p>
      <dile-spinner-bar class="styled"></dile-spinner-bar>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner-bar');
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
