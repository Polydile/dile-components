---
title: Card
package: '@dile/ui'
element: '&lt;dile-card&gt;'
status: stable
summary: Container component for card-based layouts with optional title and footer slots. Supports shadow styling and flexible content organization.
---

# dile-card

Web Component to create a customizable Card.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/card/card.js';
```

Use the component

```html
<dile-card shadow-md title="Welcome to this card">
  <div>
    This card has title and main body
  </div>
  <div slot="footer">
    <a href="#">Action 1</a>
  </div>
</dile-card>
```

## Slots

This component has two slots.

- **main slot** (unnamed slot): for the card main content.
- **footer slot**: card footer.

## Properties

- **title**: Card title, string (optional).
- **titleLevel**: Heading level for the title (default: 2), number (optional).
- **icon**: Icon to display above the title. Icon naming and import follows [dile-iconlib](../icons/dile-iconlib.md) conventions with format "family.icon" (e.g., "tabler.activity-heartbeat", "phosphor.balloon"). The icon component must be imported by the consumer, string (optional).

## Styling Attributes

### Shadow attributes

By default the card has a light shadow (between `sm` and `md`). but you can set the shadow using some attributes.

- **shadow-sm**: Small shadow.
- **shadow-md**: Medium shadow.
- **shadow-lg**: Large shadow.
- **shadow-xl**: Extra large shadow.
- **shadow-2xl**: Extra Extra large shadow.
- **shadow-none**: Without shadow.

If a responsive shadow needed, you can use the ```--dile-card-box-shadow``` CSS Custom property.

```css
dile-card {
  --dile-card-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
@media(min-width: 500px) {
  dile-card {
    --dile-card-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  } 
}
```

### Grey style

You can apply a grey theme to the card using the `grey` attribute. This will set a light grey background and adjust the text color accordingly.

- **grey**: Applies a grey style with `--dile-card-grey-background-color: #f4f4f4;` and `--dile-card-grey-text-color: #303030;`

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-card-padding-y | Vertical padding | 0.5rem
--dile-card-padding-x | Horizontal padding | 0.8rem
--dile-card-border | Card border | 1px solid #ccc
--dile-card-border-radius | Card border radius | 0.5rem
--dile-card-background-color | Background color | #fff
--dile-card-text-color | Text color | #303030
--dile-card-text-align | Text align | left
--dile-card-font-weight | Font weight | normal
--dile-card-title-font-size | Title font size | 1.5rem
--dile-card-title-color | Title text color | --dile-card-text-color or #303030
--dile-card-title-font-weight | Title font weight | 300
--dile-card-title-margin-bottom | Aditional margin-bottom for the title | 0
--dile-card-title-padding-top-with-icon | Title padding-top when icon is present | 0.5rem
--dile-card-icon-color | Icon color | var(--dile-on-background-color, #888) or var(--dile-card-grey-text-color, #303030) if grey
--dile-card-footer-border-separator | Footer border separator | 1px solid #ccc
--dile-card-footer-background-color | Footer background color | transparent
--dile-card-footer-padding-top | Footer padding top | 0.75rem
--dile-card-box-shadow | Box shadow | Defined by the shadow attributes
--dile-card-grey-background-color | Grey background color (when grey attribute is used) | #f4f4f4
--dile-card-grey-text-color | Grey text color (when grey attribute is used) | #303030

## dile-card demos

### Regular card

```html:preview
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-sm>This card has only main body</dile-card>
```

### Card with title

```html:preview
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-xl title="Welcome to this card">This card has title and main body</dile-card>
```

### Card with title, footer and main content

```html:preview
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-md title="Welcome to this card">
  <div>
    This card has title and main body
  </div>
  <div slot="footer">
    <a href="#">Action test</a>
  </div>
</dile-card>
```

### Styled card

```html:preview
<style>
  .styled {
    --dile-card-border: 2px solid #add;
    --dile-card-border-radius: 20px;
    --dile-card-background-color: #f4f4f4;
    --dile-card-text-color: #36f;
    --dile-card-title-font-weight: 700;
    --dile-card-footer-border-separator: 2px solid #add;
    --dile-card-footer-background-color: #eff;
    --dile-card-footer-padding-top: 12px;
  }
  .footer-styled {
    color: #666;
  }
</style>
<dile-card shadow-none title="I am a styled card" class="styled">
  Styled card main content
  <span slot="footer" class="footer-styled">
    Footer content
  </span>
</dile-card>
```

### Grey card

```html:preview
<style>
  .grey-demo {
    margin: 1.2rem;
  }
</style>
<dile-card grey shadow-md title="Grey styled card">
  This card has a grey background with the grey attribute
  <div slot="footer">
    <a href="#">Action link</a>
  </div>
</dile-card>
```

### Responsive card

```html:preview
<style>
  .responsive-card {
    --dile-card-box-shadow: 0 0 #0000;
    --dile-card-border-radius: 1px;
  }
  @media (min-width: 400px) {
    .responsive-card {
      --dile-card-border-radius: 5px;
      --dile-card-box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }
  @media (min-width: 600px) {
    .responsive-card {
      --dile-card-border-radius: 10px;
      --dile-card-box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }
  @media (min-width: 800px) {
    .responsive-card {
      --dile-card-border-radius: 15px;
      --dile-card-box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }
  }
</style>
<dile-card class="responsive-card" title="Shadow responsive">
  The shadow of this card has a responsive change.
</dile-card>
```

### Card with icon

```html:preview
<script type="module">
  import '@dile/iconlib/tabler-icons/activity-heartbeat.js';
</script>
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-md icon="tabler.activity-heartbeat" title="Health Stats">
  Card with icon above the title, aligned to the left.
</dile-card>
```

### Card with icon and footer

```html:preview
<script type="module">
  import '@dile/iconlib/phosphor-icons/balloon.js';
</script>
<style>
  dile-card {
    margin: 1.2rem;
  }
</style>
<dile-card shadow-md icon="phosphor.balloon" title="Special Offer">
  This card displays an icon above the title with footer content
  <div slot="footer">
    <a href="#">Learn more</a>
  </div>
</dile-card>
```

### Card with styled icon

```html:preview
<script type="module">
  import '@dile/iconlib/material-icons/add-box.js';
</script>
<style>
  .icon-styled {
    --dile-card-border: 2px solid #2d5f4f;
    --dile-card-background-color: #e8f4f0;
    --dile-card-title-color: #2d5f4f;
    margin: 1.2rem;
    --dile-icon-size: 40px;
        --dile-card-icon-color: #2d9f4f;
  }
</style>
<dile-card shadow-lg icon="material.add-box" title="Add Item" class="icon-styled">
  The icon appearance can be customized using dile-iconlib CSS variables. The consumer is responsible for importing the icon component.
</dile-card>
```
