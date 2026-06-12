---
title: Spinner Icon
tags: spinner
---

# dile-spinner-icon

This is a web component that displays a spinning loader-circle icon from the Lucide Icons library. It's useful for indicating that content is being loaded or processed in the background.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner-icon.js';
```

Use the component.

```html
<dile-spinner-icon active></dile-spinner-icon>
```

## Properties

- **active**: Boolean. Defines the spinner visibility. The spinner only appears when active is true.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-icon-animation-time | Duration of one complete rotation | 1s
--dile-icon-color | The spinner icon color | #888
--dile-icon-size | The size of the spinner icon | 24px

## dile-spinner-icon demos

### Default spinner

```html:preview
<script type="module">
import '@dile/ui/components/spinner/spinner-icon.js';
</script>

<dile-spinner-icon active></dile-spinner-icon>
```

### Styled spinner

```html:preview
<style>
  .styled {
    --dile-spinner-icon-animation-time: 0.8s;
    --dile-icon-color: #f7971e;
    --dile-icon-size: 32px;
  }
</style>
<dile-spinner-icon class="styled" active></dile-spinner-icon>
```

### Interactive demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-icon.js';
import '@dile/ui/components/button/button.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <style>
      .green {
        --dile-spinner-icon-animation-time: 1.2s;
        --dile-icon-color: #3a6;
        --dile-icon-size: 28px;
      }
      </style>
      <p>
        <dile-button id="start">Start spinner</dile-button>
        <dile-button id="stop">Stop Spinner</dile-button>
      </p>
      <dile-spinner-icon class="green"></dile-spinner-icon>
    `
  }
  firstUpdated() {
    let spinner = this.shadowRoot.querySelector('dile-spinner-icon');
    this.shadowRoot.getElementById('start').addEventListener('click', (e) => {
      spinner.setAttribute('active', '');
    });
    this.shadowRoot.getElementById('stop').addEventListener('click', (e) => {
      spinner.removeAttribute('active');
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```
