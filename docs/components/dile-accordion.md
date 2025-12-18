---
title: Accordion
---


# dile-accordion

Web component to create a simple accordion, useful for displaying expandable content such as FAQs.

## Installation

```bash
npm i @dile/ui
```

## Usage

This component is made up of two subcomponents:

- `<dile-accordion-item>`: Each expandable item of the accordion
- `<dile-accordion>`: The container that allows you to sync all items inside

Import the components.

```javascript
import "@dile/ui/components/accordion/accordion.js"
import '@dile/ui/components/accordion/accordion-item.js';
```

Use the component.

```html
<dile-accordion>
  <dile-accordion-item title="Title for accordion item 1">
    <div slot="accordion-item-content">
      ...Content...
    </div>
  </dile-accordion-item>
  ...Add as many items as you need
</dile-accordion>
```

> Note: Content inside **<dile-accordion-iten>** must have attribute **slot="accordion-item-content"**

### Prevent content flickering

To prevent flickering of the content inserted in the slot, you can do the following:

1. Add `dile-cloak` attribute to the dile-accordion-item component:

```html
<dile-accordion-item dile-cloak title="Accordion item 1 title">
```

2. Add this style (preferably in a style tag within the html):

```html
<style>
  [dile-cloak] {
    display: none !important;
  }
</style>
```

The component itself will display the content once it is loaded, which means the content of the light dom will not be visible until then.

## Properties

Properties for `dile-accordion-item`:

- **opened**: Set the state of the component between opened and closed. Boolean property.
- **title**: Defines text show in the button.

## Methods

Methods for `dile-accordion-item`:

- **open()**: Opens the expandable content.
- **close()**: Closes the expandable content.
- **toggle()**: Changes the state, from open to close or close to open. When state is "opened", it also generates a custom event which `dile-accordion` uses to close the rest of the items it contains.

## Events

Methods for `dile-accordion-item`:

- **accordion-item-opened**: Dispatched when state is "opened".

## CSS customization

There are some CSS custom properties to customize the style and the animation of this accordion component.

**NOTE**: It's important to know that some properties have some diferent levels. Let's explain it with an example:

- `--dile-accordion-item-color` applies color property to the whole component. If they are not specifically set, button text, button icon and content text will follow this rule.
- `--dile-accordion-item-button-color` applies color property just in the button content. If they are not specifically set, button text and button icon will follow this rule.
- `--dile-accordion-item-button-icon-color` applies color property just icon of the button.
- `--dile-accordion-item-content-color` applies color property just for the expandable content text.

This way you can set a global property if all elements need the same value. If you need to give specific styles to each element, you can use concrete variables, which will override the global ones.

### **dile-accordion-item** GLOBAL css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-max-width | Max width for the entire component | 100%
--dile-accordion-item-border-radius | Component border radius. Button and expandable content follow this rule | none
--dile-accordion-item-color | General color. Button text, button icon and expandable content follows this rule | white
--dile-accordion-item-background | Component border radius. Button and expandable containers follow this rule | transparent
--dile-accordion-item-inner-separation | Separation between button and expandable content | .5rem

### **dile-accordion-item** BUTTON css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-button-padding | Button padding | .7rem
--dile-accordion-item-button-border | Button border | none
--dile-accordion-item-button-border-radius | Button border radius | var(--dile-accordion-item-border-radius, .5rem)
--dile-accordion-item-button-box-shadow | Button box shadow | 2px 2px 10px gray
--dile-accordion-item-button-font-size | Button font size | 1.1rem
--dile-accordion-item-button-background | Button background | var(--dile-accordion-item-background, black)
--dile-accordion-item-button-color | Button color | var(--dile-accordion-item-color, white)
--dile-accordion-item-button-icon-closed-color | Button icon color when closed | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, var(--dile-accordion-item-color, white)))
--dile-accordion-item-button-icon-opened-color | Button icon color when opened | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, var(--dile-accordion-item-color, white)))

### **dile-accordion-item** EXPANDABLE CONTENT css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-content-padding | Expandable content padding | .7rem
--dile-accordion-item-content-border | Expandable content border | none
--dile-accordion-item-content-border-radius | Expandable content border radius | var(--dile-accordion-item-border-radius, .5rem)
--dile-accordion-item-content-box-shadow | Expandable content box shadow | 2px 2px 10px gray
--dile-accordion-item-content-background | Expandable content background | var(--dile-accordion-item-background, black)
--dile-accordion-item-content-font-size | Expandable content font size | 1rem
--dile-accordion-content-color | Expandable content color | var(--dile-accordion-item-color, white)
--dile-accordion-item-button-icon-closed-color | Button icon color when closed | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, var(--dile-accordion-item-color, white)))
--dile-accordion-item-button-icon-opened-color | Button icon color when opened | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, var(--dile-accordion-item-color, white)))

### **dile-accordion** css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-gap | Separation between each item | .5rem


## dile-accordion demos

### dile-accordion-item isolated - BASIC

```html:preview
<dile-accordion-item title="Accordion item 1 title">
  <div slot="accordion-item-content">
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
</dile-accordion-item>

<script type="module">
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### dile-accordion-item isolated - CUSTOMIZED

```html:preview
<style>
  [dile-cloak] {
    display: none !important;
  }

  dile-accordion-item#isolated-custom {
      --dile-accordion-item-max-width: 500px;
      --dile-accordion-item-color: black;
      --dile-accordion-item-button-color: white;
      --dile-accordion-item-button-icon-color: green;
      --dile-accordion-item-button-background: linear-gradient(to left, #F3F3AE 10%, #2a8a74b6 90%);
      --dile-accordion-item-content-background: linear-gradient(to left, #F3F3AE 10%, #2a8a74b6 90%);
      --dile-accordion-item-inner-separation: 1rem;
      --dile-accordion-item-border-radius: 3rem;
      --dile-accordion-item-button-border-radius: 2rem;
      --dile-accordion-item-content-border-radius: 1rem;
      --dile-accordion-item-button-box-shadow: 2px 2px 15px #00000091;
      --dile-accordion-item-content-box-shadow: 2px 2px 15px #00000091;
    }
</style>

<dile-accordion-item id="isolated-custom" dile-cloak title="Accordion item 1 title">
  <div opened slot="accordion-item-content">
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
</dile-accordion-item>

<script type="module">
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### dile-accordion - BASIC

```html:preview
<dile-accordion>
  <dile-accordion-item title="Accordion item 1 title">
    <div opened slot="accordion-item-content">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
  </dile-accordion-item>
  <dile-accordion-item title="Accordion item 2 title">
    <div opened slot="accordion-item-content">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
  </dile-accordion-item>
</dile-accordion>

<script type="module">
  import "@dile/ui/components/accordion/accordion.js"
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### dile-accordion - CUSTOMIZED

```html:preview
<style>
  [dile-cloak] {
    display: none !important;
  }

  dile-accordion#custom{
    --dile-accordion-gap: .3rem;
  }

  dile-accordion-item.custom-item{
    border: 1px solid #0000008a;
    --dile-accordion-item-max-width: 800px;
    --dile-accordion-item-background: white;
    --dile-accordion-item-color: black;
    --dile-accordion-item-border-radius: 0;
    --dile-accordion-item-inner-separation: 0;
    --dile-accordion-item-button-box-shadow: none;
    --dile-accordion-item-content-box-shadow: none;
    --dile-accordion-item-button-icon-closed-color: green;
    --dile-accordion-item-button-icon-opened-color: red;
    --dile-accordion-item-button-font-size: 1.5rem;
  }

  dile-accordion-item.custom-item p{
    margin: 0;
  }

</style>

<dile-accordion id="custom">
  <dile-accordion-item class="custom-item" dile-cloak title="Accordion item 1 title">
    <div opened slot="accordion-item-content">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
  </dile-accordion-item>
  <dile-accordion-item class="custom-item" dile-cloak title="Accordion item 2 title">
    <div opened slot="accordion-item-content">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat modi blanditiis autem aspernatur quibusdam earum eveniet itaque perferendis culpa repellendus, reprehenderit beatae mollitia eum id recusandae porro. Eius, in molestiae!</p>
    </div>
  </dile-accordion-item>
</dile-accordion>

<script type="module">
  import "@dile/ui/components/accordion/accordion.js"
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```
