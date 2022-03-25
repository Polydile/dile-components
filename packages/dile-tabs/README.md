# @dile/dile-tabs

Web Component to create easily a generic tabs interface.

You can define the tab items and the whole tabs component. You could use this component with more complex component, only to create a navigation beteen several options. 

It is possible to use with dile-pages to change the view of the component when one tab is selected.

## Installation

```bash
npm i @dile/dile-tabs
```

## Usage
```html
<script type="module">
  import '@dile/dile-tabs/dile-tabs.js';
</script>

<dile-tabs selected="2">
  <dile-tab>One</dile-tab>
  <dile-tab>Two</dile-tab>
  <dile-tab>Three</dile-tab>
  <dile-tab>Four</dile-tab>
</dile-tabs>
```

### Properties

- **selected**: This property sets the currently selected tab of the interface. By default the selected value need to be an integer, specifying th index of the selected tab (starting at 0 for the first tab, 1 for the second...).
- **attrForSelected**: This property tells the ```<dile-tabs>``` component which attribute need to match the ```selected``` property to set the active tab. By default ```atrrForSelected``` is ```undefined```. In that case the ```selected``` property should be an integer and match to the index of the tab. If you set ```atrrForSelected``` with a value, then the ```selected``` property will be matched with the value of the attribute named in ```attrForSelected```.

### More complex example

The next example show how to use the attrForSelected property.

```html
<dile-tabs selected="posts" attrForSelected="name">
  <dile-tab name="users">Users</dile-tab>
  <dile-tab name="posts">Posts</dile-tab>
  <dile-tab name="articles">Articles</dile-tab>
  <dile-tab name="faq">FAQ</dile-tab>
  <dile-tab name="contact">Contact</dile-tab>
</dile-tabs>
```

## Events

### dile-tabs-selected-changed:

When ```selected``` property changes by a user interaction inside the ```<dile-tabs>``` component, it dispatch the ```dile-tabs-selected-changed``` custom event. You will recive the new selected value in the ```detail``` event object property.

## CSS custom properties

You can customize the tabs using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-tab-text-color | The tab text color | #666
--dile-tab-background-color | The tab background color | Transparent
--dile-tab-selected-text-color | The tab text color | #fff
--dile-tab-selected-background-color | The tab background color | #039be5;
--dile-label-padding | Content padding of the tab | 8px 12px 6px 12px
--dile-tab-selected-line-height | Defines selected tab line height | 5px
--dile-tab-selected-line-color | Defines selected tab line color | #0070c0
--dile-tab-border-radius | Tab top-left & top-right border radius | 4px
--dile-tab-border | Unselected tab border | none
--dile-tab-selected-border | Selected tab border | none
--dile-tab-font-weight | Tab font weight | normal
--dile-tab-text-transform | Tab text transform | uppercase