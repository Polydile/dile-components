---
title: Toast Persistent
tags: feedback
---

# dile-toast-persistent

Web Component to implement an always visible toast message that opens and closes with a smooth animation.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/toast/toast-persistent.js';
```

Use the component

This component needs to configure the toast content as slot

```html
<dile-toast-persistent>
  This is the toast content!!
</dile-toast-persistent>
```

Once you have the toast, you can use the `open()` and `close()` methods to show or hide it, or set the `opened` property directly.

## Properties

- **opened**: Boolean property. Controls the visibility of the toast. Setting it to `true` shows the toast with animation; setting it to `false` hides it. Reflects to an attribute.
- **right**: Boolean property. When set, the toast appears on the right side of the viewport.
- **center**: Boolean property. When set, the toast appears centered at the bottom of the viewport. If both `center` and `right` are set, `right` takes precedence.
- **openOnInit**: Boolean. If true the toast opens on initialization.
- **inline**: Boolean property. When set, the toast uses relative positioning instead of fixed positioning, allowing it to flow within the document layout rather than appearing as an overlay.

## Methods

- **open()**: Opens the toast.
- **close()**: Closes the toast.
- **toggle()**: Toggles the toast visibility.

## Custom events

- **overlay-opened**: dispatched when the toast opens.
- **overlay-closed**: dispatched when the toast closes.

## Style customization

You can customize the toast interface by using the CSS custom properties below.

Custom property | Description | Default
----------------|-------------|---------
--dile-toast-persistent-background-color | Toast background color | #0e6ff6
--dile-toast-persistent-color | Toast text color | #fff
--dile-toast-persistent-z-index | Toast z-index | 999
--dile-toast-persistent-width | Toast width | 300px
--dile-toast-persistent-max-width | Toast max width | 300px
--dile-toast-persistent-border-radius | Toast border radius | 0
--dile-toast-persistent-box-shadow | Toast box shadow | 0 0 2px rgba(200, 200, 200, 0.5)
--dile-toast-persistent-padding | Toast padding | 1px
--dile-toast-persistent-overflow | Toast overflow | visible
--dile-toast-persistent-transition | Open / Close transition | 0.5s ease
--dile-toast-persistent-gap | Space between the toast and the viewport edges | 1rem

## dile-toast-persistent demos

### Default toast

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/toast/toast-persistent.js';

class MyComponent extends LitElement {
  
  static get styles() {
    return css`
      dile-toast-persistent {
        --dile-toast-persistent-padding: 0 10px;
      }
    `
  }

  render() {
    return html`
      <dile-toast-persistent id="toast">
        <p>
          I am a toast message
        </p>
      </dile-toast-persistent>
      <button id="open">Show default toast</button>
      <button id="close">Close default toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').open();
    });
    this.shadowRoot.getElementById('close').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').close();
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Open the toast to the right

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
class SecondComponent extends LitElement {
  
  static get styles() {
    return css`
      dile-toast-persistent {
        --dile-toast-persistent-padding: 0 10px;
        --dile-toast-persistent-background-color: #923;
      }
    `
  }

  render() {
    return html`
      <dile-toast-persistent id="toast" right>
        <p>
          I am a toast message
        </p>
      </dile-toast-persistent>
      <button id="open">Show right toast</button>
      <button id="close">Close right toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').open();
    });
    this.shadowRoot.getElementById('close').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').close();
    });
  }
}
customElements.define('second-component', SecondComponent);
</script>
<second-component></second-component>
```

### Open the toast centered

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
class ThirdComponent extends LitElement {
  
  static get styles() {
    return css`
      dile-toast-persistent {
        --dile-toast-persistent-padding: 0 10px;
        --dile-toast-persistent-background-color: #1a6e3c;
      }
    `
  }

  render() {
    return html`
      <dile-toast-persistent id="toast" center>
        <p>
          I am a centered toast message
        </p>
      </dile-toast-persistent>
      <button id="open">Show center toast</button>
      <button id="close">Close center toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').open();
    });
    this.shadowRoot.getElementById('close').addEventListener('click', () => {
      this.shadowRoot.getElementById('toast').close();
    });
  }
}
customElements.define('third-component', ThirdComponent);
</script>
<third-component></third-component>
```
