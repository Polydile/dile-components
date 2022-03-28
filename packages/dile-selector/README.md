# @dile/dile-selector

Web Component to create easily a generic selector interface from one value between several posibilities.

This component is created to use in more complex component, only to create a navigation interface. 

For example it is is possible to use with a dile-pages component, to change the view when the selected item changes.

## Installation

```bash
npm i @dile/dile-selector
```

## Usage
```html
<script type="module">
  import '@dile/dile-selector/dile-selector.js';
  import '@dile/dile-selector/dile-selector-item.js';
</script>

<dile-selector selected="2">
  <dile-selector-item>One</dile-selector-item>
  <dile-selector-item>Two</dile-selector-item>
  <dile-selector-item>Three</dile-selector-item>
  <dile-selector-item>Four</dile-selector-item>
</dile-selector>
```

### Properties

- **selected**: This property sets the currently selected tab of the interface. By default the selected value need to be an integer, specifying th index of the selected tab (starting at 0 for the first tab, 1 for the second...).
- **attrForSelected**: This property tells the ```<dile-selector>``` component which attribute need to match the ```selected``` property to set the active tab. By default ```atrrForSelected``` is ```undefined```. In that case the ```selected``` property should be an integer and match to the index of the tab. If you set ```atrrForSelected``` with a value, then the ```selected``` property will be matched with the value of the attribute named in ```attrForSelected```.

### More complex example

The next example show how to use the attrForSelected property.

```html
<dile-selector selected="posts" attrForSelected="name">
  <dile-selector-item icon="navigate_next" name="users">Users</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="posts">Posts</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="articles">Articles</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="faq">FAQ</dile-selector-item>
  <dile-selector-item icon="navigate_next" name="contact">Contact</dile-selector-item>
</dile-selector>
```

## Events

### dile-selected-changed:

When ```selected``` property changes by a user interaction inside the ```<dile-selector>``` component, it dispatch the ```dile-selected-changed``` custom event. You will recive the new selected value in the ```detail``` event object property.

## @dile/dile-selector-item

This component implements a selection option.

### Properties

- **Selected**: make this option selected
- **icon**: Use an icon, from one of this posible values: "navigate_next", "arrow_forward", "star", "label_important", "add"

## CSS custom properties

You can customize the selector using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-selector-padding-y | The padding top and bottom of the selection elements | 0.2rem
--dile-selector-padding-x | The padding left and right of the selection elements | 0.5rem
--dile-selector-background-color | The option background color | Transparent
--dile-selector-text-color | The option text color | #000
--dile-selector-selected-text-color | The selected option text color | #fff
--dile-selector-selected-background-color | The selected option background color | #039be5;
--dile-selector-selected-font-weight | The selected option text font weight  | normal
--dile-selector-icon-color | Defines the icon color | #039be5
--dile-selector-selected-icon-color | Defines the icon color | #fff
--dile-selector-icon-size | Icon size | 20px