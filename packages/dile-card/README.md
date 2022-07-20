# @dile/dile-card

Web Component to create a customized Card.

## Installation
```bash
npm i @dile/dile-card
```

## Usage
```html
<script type="module">
  import '@dile/dile-card/dile-card.js';
</script>

<dile-card shadow-md title="Welcome to this card">
  <div>
    This card has title and main body
  </div>
  <div slot="footer">
    <a href="#">Action 1</a>
  </div>
</dile-card>
```

## Properties

- **title**: Card title, optional.

## Shadow attributes

By default the card has a light shadow (between `sm` and `md`). but you can set the shadow using some attributes.

- **shadow-sm**: Small shadow.
- **shadow-md**: Medium shadow.
- **shadow-lg**: Large shadow.
- **shadow-xl**: Extra large shadow.
- **shadow-2xl**: Extra Extra large shadow.
- **shadow-none**: Without shadow.

If need a responsive shadow, you can use the --dile-card-box-shadow CSS Custom property.

```html

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
--dile-card-title-font-weight | Title font weight | 300
--dile-card-footer-border-separator | Footer border separator | 1px solid #ccc
--dile-card-footer-background-color | Footer background color | transparent
--dile-card-box-shadow | Box shadow | Defined by the shadow attributes