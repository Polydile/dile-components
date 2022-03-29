# @dile/dile-pages

This component can be used to display some content or other based on it's property values.

If you comes from Polymer, the short explanation would be "Simple iron-pages adaptation for LitElement".

This custom element is used to show one of several "pages". The pages are the direct children elements of the component. In brief, this component only shows one of it's children elements, and is able to interchange the active children with a simple animation.

Note: Be careful if you are using this component to display the main views of a big application, because it is not developed with lazy load in mind. If you want to use lazy load for the diferent pages, it would be better to look for another solution.

## Installation
```bash
npm i @dile/dile-pages
```

## Usage
```html
<script type="module">
  import '@dile/dile-pages/dile-pages.js';
</script>

<dile-pages selected="1">
  <div> View 1</div>
  <div> View 2</div>
</dile-pages>
```

## Properties

You can use 2 properties to configure the current active page:

- **selected**: A string to select the active page.
- **attrForSelected** (optional): A string with the attribute name in the page elements to match with "selected" property.
- **selectorId** (optional): A property to link this component to a selector interface like dile-tabs or dile-selector. That component also needs to have a selectorId attribute with the same value.

If you don't provide a value to attrForSelected property, "selected" will be matched to the index of the children element (selected=0 corresponds to the first page, selected=1 to the second... )

## Example

In the example bellow the active page will be the third: the div with the attribute name="page3".

```
<dile-pages selected="page3" attrforselected="name">
  <div name="page1">
    <h2>Page 1</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
  </div>
  <div name="page2">
    <h2>Page 2</h2>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi atque, et quaerat vero saepe maiores, maxime dolore officiis earum cumque temporibus tenetur, possimus deserunt magni itaque! Reiciendis, assumenda quo?</p>
  </div>
  <div name="page3">
    <h2>Page three</h2>
    <p>Just another page</p>
  </div>
</dile-pages>
```

The next example will show the third children, the div element with the H2 heading "Page three". Note you can use any tag as page.

```
<dile-pages selected="2">
  <span>
    <h2>Page 1</h2>
  </span>
  <article>
    <h2>Page 2</h2>
  </article>
  <div>
    <h2>Page three</h2>
  </div>
</dile-pages>
```