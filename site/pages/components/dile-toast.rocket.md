```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-toast.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-toast';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-toast/dile-toast.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-toast

Web Component to send feedback to the user, inspired on the Material Design "toast" component.

## Usage

Installation:

```bash
npm install @dile/dile-toast
```

Import the component:

```javascript
import '@dile/dile-toast/dile-toast';
```

Use the component:

```html
<dile-toast id="myToast" duration="5000"></dile-toast>
```

## Properties

- **duration**: number of microseconds the toast will be visible on the page.
- **messages**: Array of message objects. You will not use usually this property directly to create feedback messages, instead of that is preferable to use the open() method, to create the message object in the expected way for the component.

## Methods

- **open(text, status)**:To use this component and show feedback messages to the user, simpy call the open() method of the component. There are two arguments accepted. **text**: The message you wish to send. **status**: The status of the message ('success', 'error' or 'neutral'). This is an optional argument, default value is 'neutral'.

```javascript
let toastElement = document.getElementById('myToast');
toastElement.open('This is a success toast!!', 'success');
```

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

## dile-toast demos

### Default toast

```js preview-story
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
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled toast

```js preview-story
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
export const JsStory2 = () => html`<second-component></second-component>`;
```