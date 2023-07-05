```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-confirm.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-confirm';
```

```js script
import { html, LitElement, css } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-confirm/dile-confirm.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-confirm

Web Component to implement a modal confirm dialog, based on [dile-modal](/components/dile-modal) web component.

## Installation

```bash
npm i @dile/dile-confirm
```

## Use

Import the component.

```javascript
import '@dile/dile-confirm/dile-confirm';
```

After that you can use the dile-confirm tag, with a code like this:

```html
<dile-confirm id="myModal">
  <p>
    Delete this file?
  </p>
</dile-confirm> 
```

Whatever you place inside the ```<dile-confirm>``` tag will be the content displayed when the modal box opens. 

In addition, the confirm box display two buttons inside the modal interface: 

- Cancel button: pressing it, the confirm box closes and dispatchs the ```dile-confirm-cancelled``` event
- Accept button: pressing it, the confirm box closes and dispatchs the ```dile-confirm-accepted``` event

## Properties

- **opened**: Bolean property used to change the confirm modal state. The false value closes the dialog and true means open.
- **cancelLabel**: The text to the cancel button.
- **acceptLabel**: The text to the accept button.
- **blocking**: Make a answer manadatory, so clicks outside the dialog do not closes the confirm box.

## Methods

- **open**: Use it to open the modal confirm box
- **close**: Use it to close the modal confirm box
- **accept**: Closes the modal box and dispatch dile-confirm-accepted event
- **cancel**: Closes the modal box and dispatch dile-confirm-cancelled event

## Custom events

- **dile-confirm-cancelled**: Dispatched when the confirm box is cancelled. This occurs when the user press the cancel button or closes the modal box cliking outside.
- **dile-confirm-accepted**: Dispatched when the confirm box is accepted. This occurs when the user press the accept button.

## Style customization

These are the dile-confirm CSS custom properties. 

Remember, as this component is based on ```<dile-modal>```, you may also customize the modal box interface by using the CSS custom properties of the [dile-modal component](/components/dile-modal).

Custom property | Description | Default
----------------|-------------|---------
--dile-confirm-accept-button-color | Accept button background color | #007bff
--dile-confirm-cancel-button-color | Cancel button background color | #dc3545
--dile-confirm-accept-text-button-color | Accept button text color | #fff
--dile-confirm-cancel-text-button-color | Cancel button text color | #fff
--dile-confirm-border-radius-button | Button border radius | 5px
--dile-confirm-padding-button | Button padding | 7px
--dile-confirm-font-size-button | Button font size | 1em
--dile-confirm-font-weight-button | Button font weight | normal
--dile-confirm-buttons-text-align | Buttons element text align | right
--dile-confirm-text-transform  | Button text transformation | uppercase
--dile-confirm-buttons-margin-top | Confirm buttons section margin-top | 10px
--dile-confirm-buttons-margin-bottom | Confirm buttons section margin-bottom | 10px
--dile-confirm-buttons-margin-left | Confirm buttons section margin-left | 0
--dile-confirm-buttons-margin-right | Confirm buttons section margin-right | 0

## dile-confirm demo

### Regular confirm dialog

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      
    `
  }

  render() {
    return html`
      <dile-confirm id="confirm">
        <p>
          ¿Do yo want to cook a pizza?
        </p>
      </dile-confirm>
      <button id="open">Show confirm dialog</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('confirm').open();
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled confirm dialog

```js preview-story
class StyledComponent extends LitElement {
  static get styles() {
    return css`
      dile-confirm {
        --dile-modal-border-radius: 2px;
        --dile-modal-content-background-color: #303030;
        --dile-modal-width: 400px;
        --dile-modal-min-width: 100px;
        --dile-modal-content-shadow-color: #000;
        --dile-modal-background-color: #f66;
        --dile-modal-content-padding: 0.5rem;
        --dile-confirm-buttons-text-align: center;
        --dile-confirm-accept-button-color: #ddd;
        --dile-confirm-cancel-button-color: #ddd;
        --dile-confirm-cancel-text-button-color: #007bff;
        --dile-confirm-accept-text-button-color: #dc3545;
        --dile-confirm-border-radius-button: 5px;
        --dile-confirm-font-size-button: 0.8em;
        --dile-confirm-padding-button: 3px 5px;
      }
      dile-confirm p {
        color: #f66;
        font-size: 0.9em;
        margin: 0 0 10px;
        text-transform: uppercase;
        text-align: center;
      }
      dile-confirm div {
        padding-bottom: 10px;
      }
    `
  }

  render() {
    return html`
      <dile-confirm id="confirm" acceptLabel="Yes, delete" cancelLabel="No, thanks">
        <p>
          ¿Do yo want to delete the selected files?
        </p>
      </dile-confirm>
      <button id="open">Show styled confirm dialog</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('confirm').open();
    });
  }
}
customElements.define('styled-component', StyledComponent);
export const JsStory2 = () => html`<styled-component></styled-component>`;
```