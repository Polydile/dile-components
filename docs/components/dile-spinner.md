---
title: Spinner
tags: spinner
---

# dile-spinner

This is a web component designed to implement the typical "Ajax loading" spinner interface, commonly used to indicate that content is being loaded or processed in the background while the user waits for a response from the server.

## Installation

```bash
npm i @dile/ui
```

## Usage

The simpler implementation. Useful to show a inline spinner element, localized in the place where you put the dile-spinner element.

### Usage

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner.js';
```

Use the component.

```html
<dile-spinner active></dile-spinner>
```

## Properties

- **active**: Boolean. Defines the spinner visibility. The spinner only appears when active is true.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-color | The ajax loading color | #888
--dile-spinner-dot-size | The size of the dots in the spinner animation | 6px
--dile-spinner-background | Spinner background | transparent

## dile-spinner demos

### Default spinner

```html:preview
<script type="module">
import '@dile/ui/components/spinner/spinner.js';
</script>

<dile-spinner active></dile-spinner>
```

### Styled spinner

```html:preview
<style>
  .styled {
    --dile-spinner-color: #fff;
    --dile-spinner-dot-size: 8px;
    --dile-spinner-background: #c64;
  }
</style>
<dile-spinner class="styled" active></dile-spinner>
```

### Interactive demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {

  render() {
    return html`
      <style>
      .green {
        --dile-spinner-color: #3a6;
      }
      </style>
      <p>
        <button id="start">Start spinner</button>
        <button id="stop">Stop Spinner</button>
      </p>
      <dile-spinner class="green"></dile-spinner>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner');
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