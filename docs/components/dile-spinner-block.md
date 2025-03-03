---
title: Spinner Block
tags: spinner
---

# dile-spinner-block

Web component to implement a block-style spinner interface, useful for showing loading states in a section of the page. 

> This component always shows the loading state with the spinner continuously spinning. There is no option to stop it, unlike other spinner components in this catalog, such as [dile-spinner](https://dile-components.com/components/dile-spinner/).

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/spinner/spinner-block.js';
```

Use the component.

```html
<dile-spinner-block></dile-spinner-block>
```
  
## Styling

This component uses the `dile-spinner component`, so you can customize the spinner style with the [dile-spinner](https://dile-components.com/components/dile-spinner/) custom properties. Additionally, it has other CSS custom properties to style the block.


Custom property | Description | Default
----------------|-------------|---------
--dile-spinner-block-height | The height of the block container | 120px
--dile-spinner-block-justify-content | Aligns the spinner horizontally | center
--dile-spinner-block-align-items | Aligns the spinner vertically | center

## dile-spinner-block demos

### Default spinner block

```html:preview
<script type="module">
import '@dile/ui/components/spinner/spinner-block.js';
</script>

<dile-spinner-block></dile-spinner-block>
```

### Styled spinner block

```html:preview
<style>
  .styledblock {
    border-radius: 2rem;
    background-color: aliceblue;
    --dile-spinner-block-height: 300px;
    --dile-spinner-color: rgb(123, 0, 255);
    --dile-spinner-dot-size: 4px;
  }
</style>
<dile-spinner-block class="styledblock"></dile-spinner-block>
```