# dile-input || 20

Web component to create a form text field with some extra features. It has a cursomizable style for the text field and the label element.

```js script
import "@dile/dile-input/dile-input.js";
```

## Demos

### Regular input file

This is the input file without any style.

```html
<dile-input name="name" label="Name" placeholder="Write your name"></dile-input>
```

<dile-input name="name" label="Name" placeholder="Write your name"></dile-input>

### Disabled input

Using the disabled property.

```html
<dile-input name="Address_more" label="Address complement" disabled></dile-input>
```

<dile-input name="Address_more" label="Address complement" disabled></dile-input>

### Errored property

It is easy to apply an error style using the errored property.

```html
<dile-input name="Telephone" label="Telephone" errored></dile-input>
```

<dile-input name="Telephone" label="Telephone" errored></dile-input>

### Disable autocomplete

It is posible to disable the native autocomplete feature of the input field.

```html
<dile-input name="telephone" label="Telephone number" placeholder="Write your telephone number" disableAutocomplete></dile-input>
```

<dile-input name="telephone" label="Telephone number" placeholder="Write your telephone number" disableAutocomplete></dile-input>

### Styled input

You can customize the component style using a large set of CSS custom properties

```html
<style>
.styled {
  --dile-input-label-color: #6d3d6c;
  --dile-input-label-font-weight: bold;
  --dile-input-border-radius: 0;
  --dile-input-border-color: #6d3d6c;
  --dile-input-border-width: 2px;
  --dile-input-label-margin-bottom: 0.5rem;
  --dile-input-line-height: 2.5rem;
}
</style>
<dile-input class="styled" name="name" label="Name" placeholder="Write your name"></dile-input>
```

<style>
.styled {
  --dile-input-label-color: #6d3d6c;
  --dile-input-label-font-weight: bold;
  --dile-input-border-radius: 0;
  --dile-input-border-color: #6d3d6c;
  --dile-input-border-width: 2px;
  --dile-input-label-margin-bottom: 0.5rem;
  --dile-input-line-height: 2.5rem;
}
</style>
<dile-input class="styled" name="name" label="Name" placeholder="Write your name" disableAutocomplete></dile-input>

## Documentation

Please, find the full component documentation on our repository on GitHub: [dile-input package repository](https://github.com/Polydile/dile-components/tree/master/packages/dile-input)