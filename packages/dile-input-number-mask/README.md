# @dile/dile-input-number-mask

Web Component for a customized input text to create numbers with a display format introuced by a mask.

```
<dile-input-number-mask label="The label" placeholder="Type your telephone number" mask="00 000-00-00"></dile-input-number-mask>
```

## Install

```
npm install @dile/dile-input-number-mask
```

## Usage

### Import the component

Into your HTML page

```
<script src="./node_modules/@dile/dile-input-number-mask/dile-input-number-mask.js" type="module"></script>

```

...Or into your module script

```
import '@dile/dile-input-number-mask/dile-input-number-mask';
```

## Use the component

```
<dile-input-number-mask
  name="password_name"
  label="Text to the label"
  mask="00 000-00-00"
></dile-input-number-mask>
```

The mask attribute is provided in a format where all "0" chars are the numbers introduced by the user. The other chars provided are the mask. So, with the mask "00 000-00-00" and introducing the number "121234567", the input would represent "12 123-45-67" value.

This component inherits all the properties, events and styles from @dile/dile-input component. So the docs are the same in both components.

The only diferece between dile-input and dile-input-number-mask is that the input displays a number with a mask.