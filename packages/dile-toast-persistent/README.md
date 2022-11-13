# @dile/dile-toast-persistent

Web Component to implement an always visible toast message that opens and closes with a smooth animation.

## Install

```
npm install @dile/dile-toast-persistent
```

## Usage

### Import the component

```
import '@dile/dile-toast-persistent/dile-toast-persistent';
```

### Use the component

This component needs to configure the toast content as slot

```
<dile-toast-persistent>
  This is the toast content!!
</dile-toast-persistent>
```

Now you can use the open() and close() component methods to show or hide the toast message.

## Properties

The component offers several properties to configure the way it works.

- **right**: Bolean property. When is set to true, the toast appears at the right side.
- **moveTop**: Number of pixels to modify the default vertical position of the toast. Accepts positive (move down) an negative (move up) values. Default -16.
- **moveLeft**: The component inherits this property from DileOverlayMixin but is not very useful un this toast message. Only works well in the toast right position to translate to the left the toast overlay when using negative values. Default -10.


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
--dile-toast-persistent-background-color | menu overlay layer background color | #fff
--dile-toast-persistent-color | Overlay text color | #303030
--dile-toast-persistent-z-index | menu overlay layer z-index | 999
--dile-toast-persistent-width | Menu overlay layer width | 280px
--dile-toast-persistent-max-width | Menu overlay layer max width | 300px
--dile-toast-persistent-border-radius | Menu overlay layer border radius | 5px
--dile-toast-persistent-box-shadow | Menu overlay box shadow | 0 0 20px rgba(102, 102, 102, 0.5)
--dile-toast-persistent-padding | Menu layer padding | 1px
--dile-toast-persistent-transition | Open / Close transition configuration | ease 0.5s