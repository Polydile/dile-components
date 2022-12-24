# @dile/dile-network

Web Component to check the network status

## Installation
```bash
npm i @dile/dile-network
```

## Usage

Import the component.

```javascript
import '@dile/dile-network/dile-network.js';
```

Use the component

```html
<dile-network></dile-network>
```

This component cheks the network status and can display a message in a overlay layer when the network is offline. The message can be configured by a "offLineLabel" property. 

## Properties

- **onLine**: this is only a boolean component property (can`t be setted from outside by an attribute) to inform the network status.
- **showOffLineStatus**: boolean, if it's true, then the component shows a message when offline mode is detected.
- **offLineLabel**: string con configure the offline message text.
- **showCloseIcon**: a icon to closes the overlay layer message.

## Useful methods

- **closeToast()**: closes the overlay layer message.

## Custom events

- **dile-network-status**: the component dispatch dile-network-status event when a network status change is detected. The event object detail can be used to known the current network status.

The event detail is an object containing a ```onLine``` bolean property. True means online and false mean offline.

## Style customization

To customize the component style (the offline message box) it is possible to use some of the [dile-persistent-toast](/components/dile-persistent-toast) custom properties. In addition there are some specific dile-network custom properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-network-toast-padding | Overlay layer padding | 0.65rem
--dile-network-toast-background-color | Overlay layer background color | #e33
--dile-network-label-text-color | Message text color | #fff
--dile-network-warning-icon-color | Color of the warning icon dsplayed on the message | #fff
--dile-network-close-icon-color | Close icon color | #fff