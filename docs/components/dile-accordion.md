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
- `<dile-accordion>`: The container that manages all items and ensures only one is open at a time

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

> **Note**: Content inside `<dile-accordion-item>` must have the attribute `slot="accordion-item-content"`

### Prevent content flickering

To prevent flickering of the content inserted in the slot, you can do the following:

1. Add `dile-cloak` attribute to the `dile-accordion-item` component:

```html
<dile-accordion-item dile-cloak title="Accordion item 1 title">
  <div slot="accordion-item-content">Content here</div>
</dile-accordion-item>
```

2. Add this style (preferably in a style tag within the html):

```html
<style>
  [dile-cloak] {
    display: none !important;
  }
</style>
```

The component itself will display the content once it is loaded, which means the content of the light DOM will not be visible until then.

## Properties

Properties for `<dile-accordion-item>`:

- **opened**: Set the state of the component between opened and closed. Boolean property. Default: `false`
- **title**: Defines the text shown in the button header. String property.

## Methods

Methods for `<dile-accordion-item>`:

- **open()**: Opens the expandable content.
- **close()**: Closes the expandable content.
- **toggle()**: Changes the state, from open to close or close to open. When state is "opened", it also generates a custom event which `<dile-accordion>` uses to close the other items it contains.

## Events

Events for `<dile-accordion-item>`:

- **accordion-item-opened**: Dispatched when an item is opened. Detail includes the item reference.

## Accessibility Features

This component is fully accessible and meets **WCAG 2.1 Level AA** and **WCAG 2.2 Level AA** standards, including support for:

- ✅ **Keyboard navigation**: Tab to navigate, Space/Enter to expand/collapse
- ✅ **ARIA attributes**: `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`
- ✅ **Screen reader support**: Announces state changes and relationships
- ✅ **Visible focus indicators**: Clear 3px outline (AAA compliant)
- ✅ **Live region announcements**: Changes are announced to assistive technologies

### Keyboard Navigation

- **Tab**: Navigate between accordion buttons
- **Space / Enter**: Toggle the accordion item open/closed
- **Focus indicator**: Clear 3px blue outline (customizable)

### ARIA Implementation

Each accordion item includes proper ARIA attributes:

- `aria-expanded`: Indicates if the item is open (`true`) or closed (`false`)
- `aria-controls`: Links the button to its content region
- `role="region"`: Marks the content as an important region
- `aria-labelledby`: Associates the region with its button label
- `aria-hidden="true"`: Hides decorative icons from screen readers

### Screen Reader Support

The component announces:
- The accordion structure and item titles
- State changes (expanded/collapsed)
- Focused element and its current state

Tested with: NVDA (Windows), JAWS, VoiceOver (macOS), TalkBack (Android)

## CSS customization

There are some CSS custom properties to customize the style of this accordion component.

**NOTE**: It's important to know that some properties have different levels. Let's explain it with an example:

- `--dile-accordion-item-color` applies color property to the whole component. If they are not specifically set, button text, button icon and content text will follow this rule.
- `--dile-accordion-item-button-color` applies color property just in the button content. If they are not specifically set, button text and button icon will follow this rule.
- `--dile-accordion-item-button-icon-color` applies color property just to the icon of the button.
- `--dile-accordion-item-content-color` applies color property just for the expandable content text.

This way you can set a global property if all elements need the same value. If you need to give specific styles to each element, you can use concrete variables, which will override the global ones.

### **dile-accordion-item** GLOBAL css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-max-width | Max width for the entire component | 100%
--dile-accordion-item-border-radius | Component border radius. Button and expandable content follow this rule if not set on them | none
--dile-accordion-item-color | General color. Button text, button icon and expandable content follow this rule if not set on them | --dile-on-primary-color or white
--dile-accordion-item-background | Component background. Button and expandable container follow this rule if not set on them | --dile-primary-color or transparent
--dile-accordion-item-inner-separation | Separation between button and expandable content | .5rem

### **dile-accordion-item** BUTTON css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-button-padding | Button padding | .7rem
--dile-accordion-item-button-border | Button border | none
--dile-accordion-item-button-border-radius | Button border radius | var(--dile-accordion-item-border-radius, .5rem)
--dile-accordion-item-button-box-shadow | Button box shadow | none
--dile-accordion-item-button-font-size | Button font size | 1.1rem
--dile-accordion-item-button-background | Button background | --dile-accordion-item-background or dile-primary-color or black)
--dile-accordion-item-button-color | Button color | --dile-accordion-item-color or dile-on-primary-color or white)
--dile-accordion-item-button-icon-closed-color | Button icon color when closed | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, ...))
--dile-accordion-item-button-icon-opened-color | Button icon color when opened | var(--dile-accordion-item-button-icon-color, var(--dile-accordion-item-button-color, ...))
--dile-accordion-item-button-focus-outline | Focus indicator outline color (WCAG 2.2) | #4A90E2

### **dile-accordion-item** EXPANDABLE CONTENT css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-item-content-padding | Expandable content padding | .7rem
--dile-accordion-item-content-border | Expandable content border | none
--dile-accordion-item-content-border-radius | Expandable content border radius | var(--dile-accordion-item-border-radius, .5rem)
--dile-accordion-item-content-box-shadow | Expandable content box shadow | none
--dile-accordion-item-content-background | Expandable content background | --dile-accordion-item-background or --dile-background-color or transparent
--dile-accordion-item-content-font-size | Expandable content font size | 1rem
--dile-accordion-item-content-color | Expandable content color | --dile-accordion-item-color or --dile-on-background-color or #303030

### **dile-accordion** css variables

Custom property | Description | Default
----------------|-------------|---------
--dile-accordion-gap | Separation between each item | .5rem

## Examples

### Basic accordion item

```html:preview
<dile-accordion-item title="Accordion item 1 title">
  <div slot="accordion-item-content">
    <p>This is the expandable content. It can contain any HTML elements.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
</dile-accordion-item>

<script type="module">
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### Customized accordion item

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

<dile-accordion-item id="isolated-custom" dile-cloak title="Accordion item with custom styles">
  <div slot="accordion-item-content">
    <p>This is a customized accordion item with gradient backgrounds and rounded corners.</p>
    <p>You can customize colors, spacing, borders, shadows and more using CSS variables.</p>
  </div>
</dile-accordion-item>

<script type="module">
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### Basic accordion (multiple items)

```html:preview
<dile-accordion>
  <dile-accordion-item title="FAQ: What is this component?">
    <div slot="accordion-item-content">
      <p>This is a web component accordion that displays expandable and collapsible content sections.</p>
      <p>Only one section can be open at a time when using the dile-accordion container.</p>
    </div>
  </dile-accordion-item>
  <dile-accordion-item title="FAQ: Is it accessible?">
    <div slot="accordion-item-content">
      <p>Yes! This component is fully accessible and meets WCAG 2.1/2.2 Level AA standards.</p>
      <p>It supports keyboard navigation, screen readers, and has visible focus indicators.</p>
    </div>
  </dile-accordion-item>
  <dile-accordion-item title="FAQ: How do I customize it?">
    <div slot="accordion-item-content">
      <p>You can customize the accordion using CSS custom properties for colors, spacing, borders, and more.</p>
      <p>See the CSS customization section above for all available variables.</p>
    </div>
  </dile-accordion-item>
</dile-accordion>

<script type="module">
  import "@dile/ui/components/accordion/accordion.js"
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

### Customized accordion

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
    --dile-accordion-item-button-focus-outline: #FF6B6B;
  }

  dile-accordion-item.custom-item p{
    margin: 0;
  }
</style>

<dile-accordion id="custom">
  <dile-accordion-item class="custom-item" dile-cloak title="Section 1: Features">
    <div slot="accordion-item-content">
      <p>This customized accordion demonstrates how to use CSS variables to create different styles.</p>
      <p>Notice the red icon when opened and green when closed, custom focus outline color, and more.</p>
    </div>
  </dile-accordion-item>
  <dile-accordion-item class="custom-item" dile-cloak title="Section 2: Accessibility">
    <div slot="accordion-item-content">
      <p>Try navigating with the keyboard (Tab to focus, Space/Enter to toggle).</p>
      <p>The focus outline is clearly visible and customizable via --dile-accordion-item-button-focus-outline.</p>
    </div>
  </dile-accordion-item>
</dile-accordion>

<script type="module">
  import "@dile/ui/components/accordion/accordion.js"
  import "@dile/ui/components/accordion/accordion-item.js"
</script>
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with web component support
