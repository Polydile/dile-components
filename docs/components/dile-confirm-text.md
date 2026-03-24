---
title: Confirm Text
tags: feedback
---

# dile-confirm-text

Web Component to implement a modal confirm dialog that requires the user to type a confirmation text, extending the [dile-confirm](/components/dile-confirm) web component.

This component is useful for high-risk operations where you want to ensure the user really intends to perform the action by requiring them to type a specific word or phrase.

## Installation

```bash
npm i @dile/ui
```

## Use

Import the component.

```javascript
import '@dile/ui/components/confirm-text/confirm-text.js';
```

After that you can use the dile-confirm-text tag, with a code like this:

```html
<dile-confirm-text 
  id="deleteConfirm"
  title="Delete Account"
  acceptLabel="Delete"
  cancelLabel="Cancel">
  <p>Are you sure you want to permanently delete your account?</p>
</dile-confirm-text>
```

The user will see the content you place inside the `<dile-confirm-text>` tag, plus an input field where they must type the confirmation text (default: "CONFIRM").

## Properties

- **opened**: Boolean property to change the confirm modal state. false closes the dialog, true opens it.
- **title**: The title displayed at the top of the modal dialog.
- **cancelLabel**: The text for the cancel button.
- **acceptLabel**: The text for the accept button.
- **blocking**: Make an answer mandatory, so clicks outside the dialog do not close the confirm box.
- **dontCloseOnAccept**: The dialog box remains open after the ACCEPT button is clicked. Must be closed manually by calling close().
- **confirmationText**: The text that the user must type to confirm (default: "CONFIRM").
- **inputLabel**: The label text for the input field.
- **inputMessage**: The helper message displayed below the input field.
- **wrongTextMessage**: Error message shown when the user types the wrong text.
- **emptyTextMessage**: Error message shown when the input field is empty.

## Methods

- **open**: Opens the modal confirm box.
- **close**: Closes the modal confirm box.
- **accept**: Closes the modal box and dispatches dile-confirm-accepted event.
- **cancel**: Closes the modal box and dispatches dile-confirm-cancelled event.

## Custom Events

- **dile-confirm-cancelled**: Dispatched when the confirm box is cancelled. This occurs when the user presses the cancel button or closes the modal box by clicking outside.
- **dile-confirm-accepted**: Dispatched when the confirm box is accepted. This occurs when the user types the correct confirmation text and presses the accept button.

## Style Customization

These are the dile-confirm-text CSS custom properties.

Since this component extends `<dile-confirm>`, you can use all the CSS custom properties of the [dile-confirm component](/components/dile-confirm/). Additionally, you can customize the modal box using the CSS custom properties of the [dile-modal component](/components/dile-modal/).

Custom property | Description | Default
----------------|-------------|---------
--dile-modal-background-color | Modal background overlay color | rgba(90, 0, 0, 0.8)
--dile-modal-content-shadow-color | Modal content box shadow color | rgba(20, 0, 0, 0.5)
--dile-confirm-cancel-button-color | Cancel button background color | #007bff
--dile-confirm-accept-button-color | Accept button background color | #dc3545
--dile-confirm-accept-text-button-color | Accept button text color | #fff
--dile-confirm-cancel-text-button-color | Cancel button text color | #fff
--dile-confirm-border-radius-button | Button border radius | 5px
--dile-confirm-padding-button | Button padding | 7px
--dile-confirm-font-size-button | Button font size | 1em
--dile-confirm-font-weight-button | Button font weight | normal
--dile-confirm-buttons-text-align | Buttons alignment | right

## Examples

### Basic confirm text dialog

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/confirm-text/confirm-text.js';

class BasicConfirmComponent extends LitElement {
  static get styles() {
    return css`
      button {
        padding: 10px 20px;
        font-size: 1em;
        cursor: pointer;
      }
    `
  }

  render() {
    return html`
      <dile-confirm-text 
        id="deleteConfirm"
        title="Delete Account"
        acceptLabel="Delete"
        cancelLabel="Cancel">
        <p>Are you sure you want to permanently delete your account? This action cannot be undone.</p>
      </dile-confirm-text>
      <button @click=${this.openConfirm}>Delete My Account</button>
    `
  }

  openConfirm() {
    const confirmElement = this.shadowRoot.getElementById('deleteConfirm');
    confirmElement.addEventListener('dile-confirm-accepted', () => {
      console.log('Account deletion confirmed');
    });
    confirmElement.addEventListener('dile-confirm-cancelled', () => {
      console.log('Account deletion cancelled');
    });
    confirmElement.open();
  }
}

customElements.define('basic-confirm-text', BasicConfirmComponent);
</script>
<basic-confirm-text></basic-confirm-text>
```

### Styled confirm text dialog with custom text

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/confirm-text/confirm-text.js';

class StyledConfirmTextComponent extends LitElement {
  static get styles() {
    return css`
      button {
        padding: 10px 20px;
        font-size: 1em;
        cursor: pointer;
        background-color: #ff9800;
        color: white;
        border: none;
        border-radius: 5px;
      }
      button:hover {
        background-color: #f57c00;
      }
      dile-confirm-text {
        --dile-modal-background-color: rgba(0, 100, 150, 0.9);
        --dile-modal-content-background-color: #f0f8ff;
        --dile-modal-border-radius: 10px;
        --dile-modal-width: 90%;
        --dile-modal-content-shadow-color: rgba(0, 50, 100, 0.7);
        --dile-confirm-accept-button-color: #ff9800;
        --dile-confirm-cancel-button-color: #28a745;
        --dile-confirm-border-radius-button: 25px;
        --dile-confirm-padding-button: 10px 15px;
        --dile-confirm-font-weight-button: bold;
        --dile-confirm-buttons-text-align: center;
      }
      dile-confirm-text p {
        margin: 0 0 10px;
      }
    `
  }

  render() {
    return html`
      <dile-confirm-text 
        id="archiveConfirm"
        title="Archive All Data"
        confirmationText="ARCHIVE"
        inputLabel="Type ARCHIVE to confirm archiving all data"
        inputMessage="This action will archive all your data. It cannot be easily undone."
        wrongTextMessage="You must type ARCHIVE exactly as shown"
        emptyTextMessage="Please type ARCHIVE in the field"
        acceptLabel="Archive Now"
        cancelLabel="Keep Data">
        <p>This will archive all your data permanently.</p>
        <p><strong>⚠️ This is an irreversible operation.</strong></p>
      </dile-confirm-text>
      <button @click=${this.openConfirm}>Archive All Data</button>
    `
  }

  openConfirm() {
    const confirmElement = this.shadowRoot.getElementById('archiveConfirm');
    confirmElement.addEventListener('dile-confirm-accepted', () => {
      console.log('Data archiving confirmed');
    });
    confirmElement.addEventListener('dile-confirm-cancelled', () => {
      console.log('Data archiving cancelled');
    });
    confirmElement.open();
  }
}

customElements.define('styled-confirm-text', StyledConfirmTextComponent);
</script>
<styled-confirm-text></styled-confirm-text>
```
