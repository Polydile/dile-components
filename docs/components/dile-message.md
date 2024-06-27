---
title: Message
tags: feedback
---

# dile-message

Web Component to show a custom message to the user. This component display the message until the user clicks in the included close icon. There are some posible ways to set the message and open the message interface. There is also an animation when the message opens and closes.

## Installation
```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/message/message.js';
```

Use the component.

```html
<dile-message opened>Hi from Polydile!!</dile-message>
```

Is also posible to set the display message in the "message" property, and open the interface with the open() method.

```html
<dile-message message="This is other message" id="msgElement"></dile-message>

<script>
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('msgElement').open();
});
</script>
```

Another possibility is to simply call the openMessage() method, setting the message in the method parameter. 

```html
<dile-message id="msgElement"></dile-message>

<script>
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('msgElement').openMessage('Setting a message and opening the interface in one step');
});
</script>
```

## Properties

- **opened**: If true the feedback box is in opened status.
- **message**: Message to display. Remember that, if message='' or undefined, then the component will display the content comming from the slot.
- **position**: Position of the message. Values accepted are "relative", "top", "bottom", "right-bottom".
- **hideCloseIcon**: If true the close icon will be hidden.

## Methods

- **open()**: Open the message box with a slide-down animation.
- **close()**: Close the message box with a slide-up animation.
- **openMessage()**: Open the message box and update the message displayed.

## Events

- **dile-message-closed-by-user**: This event is dispatched when the component closes by a user click on the close icon.

## Style customization

You can customize the message box interface by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-message-color | Message text and icon color | #fff
--dile-message-background-color | Message background color | #666
--dile-message-padding | Padding for the message box | 15px
--dile-message-icon-size | Close icon size | 20px
--dile-message-icon-color | Close icon color | #fff
--dile-message-right-bottom-separation | Botton and right separation when message position is right-bottom | 1.5rem
--dile-message-right-bottom-width | Message with when message position is right-bottom | 80vw
--dile-message-right-bottom-max-width | Message max-with when message position is right-bottom | 400px
--dile-message-z-index | Message layer z-index | 1

## dile-message demos

### Default message

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/message/message.js';

class MyComponent extends LitElement {
  
  render() {
    return html`
      <dile-message id="message">
        <h2>Fixed right bottom!!</h2>
        <p>Hello, Polydile friends!!</p>
      </dile-message>
      <button id="open">Show default message</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').open();
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Show the message in diferent positions

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class SecondComponent extends LitElement {
  static get styles() {
    return css`
      dile-message {
        margin-bottom: 0.2rem;
      }
    `
  }
  render() {
    return html`
      <dile-message id="message" position="relative">
        I will show in diferent positions... please click on the buttons.
      </dile-message>
      <button id="open">Open in this position ("relative")</button>
      <button id="opentop">Open in top position ("top")</button>
      <button id="openbottom">Open in bottom position ("bottom")</button>
      <button id="openrightbottom">Open in right-bottom corner ("right-bottom")</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').position = "relative";
      this.shadowRoot.getElementById('message').open();
    });
    this.shadowRoot.getElementById('opentop').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').position = "top";
      this.shadowRoot.getElementById('message').open();
    });
    this.shadowRoot.getElementById('openrightbottom').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').position = "right-bottom";
      this.shadowRoot.getElementById('message').open();
    });
    this.shadowRoot.getElementById('openbottom').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').position = "bottom";
      this.shadowRoot.getElementById('message').open();
    });
  }
}
customElements.define('second-component', SecondComponent);
</script>
<second-component></second-component>
```

### Styled message

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class ThirdComponent extends LitElement {
  static get styles() {
    return css`
      #message {
        --dile-message-background-color: rgb(28, 139, 71);
        --dile-message-padding: 1rem 2rem;
        --dile-message-icon-size: 2rem;
        --dile-message-color: rgb(242, 245, 198);
        --dile-message-icon-color: rgb(150, 195, 240);
      }
      h2, p {
        margin: 0 0 0.5rem;
      }
    `
  }
  render() {
    return html`
      <dile-message id="message" position="relative">
        <h2>I am styled message</h2>
        <p>Do you like this colors?</p>
      </dile-message>
      <button id="open">Open styled message</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').open();
    });
  }
}
customElements.define('third-component', ThirdComponent);
</script>
<third-component></third-component>
```

### Customize message text

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class FourthComponent extends LitElement {
  static get styles() {
    return css`
      #message {
        --dile-message-background-color: red;
        --dile-message-padding: 1rem 2rem;
        --dile-message-icon-size: 1.2rem;
      }
      h2, p {
        margin: 0.5rem 0;
      }
      .hide {
        display: none;
      }
    `
  }

  render() {
    return html`
      <dile-message id="message" position="top"></dile-message>
      <p id="opening">
        <input type="text" id="messageText" value="Write any message">
        <button id="open">Open this message</button>
      <p>
      <p id="closing" style="display: none;">
        <button id="close">Close this message</button>
      <p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').openMessage(
        this.shadowRoot.getElementById('messageText').value
      );
      this.shadowRoot.getElementById('opening').style.display = 'none';
      this.shadowRoot.getElementById('closing').style.display = 'block';
    });

    this.shadowRoot.getElementById('close').addEventListener('click', () => {
      this.shadowRoot.getElementById('message').close();
      this.shadowRoot.getElementById('opening').style.display = 'block';
      this.shadowRoot.getElementById('closing').style.display = 'none';
    });

    this.shadowRoot.getElementById('message').addEventListener('dile-message-closed-by-user', () => {
      this.shadowRoot.getElementById('opening').style.display = 'block';
      this.shadowRoot.getElementById('closing').style.display = 'none';
    });
  }
}
customElements.define('fourth-component', FourthComponent);
</script>
<fourth-component></fourth-component>
```