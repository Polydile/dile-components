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
import '@dile/ui/components/toast/toast-persistent';
```

Use the component

This component needs to configure the toast content as slot

```html
<dile-toast-persistent>
  This is the toast content!!
</dile-toast-persistent>
```

Once you have the toast, you can use the open() and close() component methods to show or hide the toast message.

## Properties

The component offers several properties to configure the way it works.

- **right**: Bolean property. By default the toast message appears on the left. When the ```right```  property is setted to true, the toast will appea on the right side. 
- **moveTop**: Number of pixels to modify the default vertical position of the toast. Accepts positive (move down) an negative (move up) values. Default is -16.
- **moveLeft**: The component inherits this property from [DileOverlayMixin](/mixins/dile-overlay-mixin) but is not very useful un this toast message. Only works well on the toast right position, to translate to the left the toast overlay when using negative values. Default -10.
- **openOnInit**: Boolean. If true the toast opens on initialization.

## Methods

- **open()**: Use it to open the menu overlay box
- **close()**: Use it to close the menu overlay box
- **toggle()**: Toggles the toast-persistent box
- **closeAll()**: Close all the elements of this type
- **closeOthers()**: Close the other items of this type (distinct to this)

## Custom events

- **overlay-opened**: dispatched when the overlay opens.
- **overlay-closed**: dispatched when the overlay closes.

## Style customization

You can customize the menu box interface by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-toast-persistent-background-color | menu overlay layer background color | #0e6ff6
--dile-toast-persistent-color | Overlay text color | #fff
--dile-toast-persistent-z-index | menu overlay layer z-index | 999
--dile-toast-persistent-width | Menu overlay layer width | 300px
--dile-toast-persistent-max-width | Menu overlay layer max width | 300px
--dile-toast-persistent-border-radius | Menu overlay layer border radius | 0
--dile-toast-persistent-box-shadow | Menu overlay box shadow | 0 0 2px rgba(200, 200, 200, 0.5)
--dile-toast-persistent-padding | Menu layer padding | 1px
--dile-toast-persistent-transition | Open / Close transition configuration | ease 0.5s

## dile-toast-persistent demos

### Default toast

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/toast/toast-persistent';

class MyComponent extends LitElement {
  
  static get styles() {
    return css`
      :host {
        position: relative;
        z-index: 1000;
      }
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
      :host {
        position: relative;
        z-index: 1000;
      }
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