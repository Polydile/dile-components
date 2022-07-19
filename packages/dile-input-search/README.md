# @dile/dile-input-search

Web Component to create a customized search input with the tipical search icon and a clear search functionality. Also it provides a "delay" property to wait when a keystroke occurs and when a search is emitted.

This component does not search anything by itself. It's only a search user interface you may use to create a search functionality as you need. Instead of making a search the component emitt events with a keyword to tell others that the user want to perform a search action.

## Installation
```bash
npm i @dile/dile-input-search
```

## Usage

```html
<script type="module">
  import '@dile/dile-input-search/dile-input-search.js';
</script>

<dile-input-search></dile-input-search>
```

## Properties

- **delay**: Miliseconds the component waits between when a keystroke occurs and when a search keyword is emitted.
- **placeholder**: Placeholder text
- **keyword**: the text typed into the input search component
- **disabled**: The component is disabled

## Custom events

- **dile-input-search**: A search is performed with a new keyword. The event detail is an object like this:

```javascript
{
  keyword: "the text searched"
}
```

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-color | Icon color | 0.5rem
--dile-icon-size | Icon size | 24px
--dile-input-width | Input element width | 100%
--dile-input-border-width | Input element border width | 1px
--dile-input-border-color | Input element border color | #888
--dile-input-border-radius | Input element border radius | 5px
--dile-input-font-size | Input element font size | 1em
--dile-input-line-height | Input element line height | 1.5em
--dile-input-color | Input text color | #303030
--dile-input-background-color | Color for the background input element | #fff
--dile-input-padding | Padding for the input text | 5px
--dile-input-placeholder-color | Placeholder color | #ccc