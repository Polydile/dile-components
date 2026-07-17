---
title: Toast
tags: feedback
---

# dile-toast

Web Component to send feedback to the user, inspired on the Material Design "toast" component.

## Usage

Installation:

```bash
npm install @dile/ui
```

Import the component:

```javascript
import '@dile/ui/components/toast/toast.js';
```

Use the component:

```html
<dile-toast id="myToast" duration="5000"></dile-toast>
```

## Properties

- **duration**: number of microseconds the toast will be visible on the page.
- **messages**: Array of message objects. You will not use usually this property directly to create feedback messages, instead of that is preferable to use the open() method, to create the message object in the expected way for the component.
- **showCloseIcon**: Boolean, default `false`. If `true`, each toast shows a close icon that lets the user dismiss it manually before its `duration` elapses.

## Methods

- **open(text, status)**:To use this component and show feedback messages to the user, simpy call the open() method of the component. There are two arguments accepted. **text**: The message you wish to send. **status**: The status of the message ('success', 'error' or 'neutral'). This is an optional argument, default value is 'neutral'.

```javascript
let toastElement = document.getElementById('myToast');
toastElement.open('This is a success toast!!', 'success');
```

## Events

- **dile-toast-closed-by-user**: fired when the user manually closes a toast using the close icon (only available when `showCloseIcon` is `true`). `event.detail.message` contains the closed message object (`id`, `text`, `toastType`).

## Style customization

The background color of the toast depends on the status of the message. You can customize it using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-toast-success-color | Success background color | #27ae60
--dile-toast-error-color | Error background color | #e74c3c
--dile-toast-neutral-color | Neutral background color | #303030
--dile-toast-text-color | Text color | #fff
--dile-toast-width | With of the toast element | 280px
--dile-toast-padding | Padding for the toasts | 10px 15px
--dile-toast-z-index | z-index for the toasts | 1001
--dile-toast-font-weight | Messages font weight | normal
--dile-toast-font-size | Messages font size | 1em
--dile-toast-border-radius | Border radius | 0
--dile-toast-close-icon-color | Close icon color | value of --dile-toast-text-color (#fff)
--dile-toast-close-icon-size | Close icon size | 16px

## dile-toast demos

### Default toast

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/toast/toast.js';

class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        z-index: 1000;
      }
    `
  }
  render() {
    return html`
      <dile-toast id="myToast" duration="5000"></dile-toast>
      <button id="opensuccess">Show success toast</button>
      <button id="openneutral">Show neutral toast</button>
      <button id="openerror">Show error toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('opensuccess').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a success toast', 'success');
    });
    this.shadowRoot.getElementById('openneutral').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a neutral toast', 'neutral');
    });
    this.shadowRoot.getElementById('openerror').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a error toast', 'error');
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Styled toast

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
      dile-toast {
        --dile-toast-success-color: #cfd;
        --dile-toast-neutral-color: #ddd;
        --dile-toast-error-color: #fcd;
        --dile-toast-text-color: #303030;
        --dile-toast-font-weight: bold;
        --dile-toast-font-size: 1.1rem;
        --dile-toast-border-radius: 2rem;
      }
    `
  }

  render() {
    return html`
      <dile-toast id="myToast"></dile-toast>
      <button id="opensuccess">Show success toast</button>
      <button id="openneutral">Show neutral toast</button>
      <button id="openerror">Show error toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('opensuccess').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a success toast', 'success');
    });
    this.shadowRoot.getElementById('openneutral').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a neutral toast', 'neutral');
    });
    this.shadowRoot.getElementById('openerror').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('I am a error toast', 'error');
    });
  }
}
customElements.define('second-component', SecondComponent);
</script>
<second-component></second-component>
```

### Closable toast

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class ClosableToastComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        z-index: 1000;
      }
    `
  }
  render() {
    return html`
      <dile-toast id="myToast" duration="5000" showCloseIcon></dile-toast>
      <button id="opensuccess">Show closable success toast</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('opensuccess').addEventListener('click', () => {
      this.shadowRoot.getElementById('myToast').open('Click the X to dismiss me', 'success');
    });
  }
}
customElements.define('closable-toast-component', ClosableToastComponent);
</script>
<closable-toast-component></closable-toast-component>
```