# @dile/dile-message

Web Component to show a custom message to the user. This component display the message until the user clicks in the included close icon. There are some posible ways to set the message and open the message interface. Also there is an animation when the message opens and closes.

## Installation
```bash
npm i @dile/dile-message
```

## Usage

Import the component.

```javascript
import '@dile/dile-message/dile-message.js';
```

Use the component

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
- **position**: Position between top, bottom, right-bottom.
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
--dile-message-right-bottom-separation | Botton and right separation when message position is right-bottom | 1.5rem
--dile-message-right-bottom-width | Message with when message position is right-bottom | 80vw
--dile-message-right-bottom-max-width | Message max-with when message position is right-bottom | 400px