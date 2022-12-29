```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-textarea.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-textarea';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-textarea/dile-textarea.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-textarea

Input textarea field Web Component, with customized design.

This component is a wraper of [@lion/textarea component](https://github.com/ing-bank/lion/tree/master/packages/textarea).

```html
<dile-textarea label="The label" placeholder="Write something..."></dile-textarea>
```

## Install

```bash
npm install @dile/dile-textarea
```

## Usage

Import the component.

```javascript
import '@dile/dile-textarea/dile-textarea';
```

Use the component

```html
<dile-textarea
  label="Text to the label"
  max-rows="5"
  rows="2"
  placeholder="write something"
></dile-textarea>
```

## Properties

- **name**: the name of the textarea element. This is usefull to distinguish the related element in an textarea event listener.
- **label**: the element label
- **rows**: Visible rows
- **maxRows**: maximum rows (use max-rows in the HTML code, as attribute)
- **readOnly**: Defines the texts present in the input element when is empty
- **placeholder**: on true, the element is disabled
- **message**: Place a message under the textarea element
- **errored**: to mark the textarea element with a error style
- **hideErrorOnInput**: Hide the error message when the user changes the value of the textarea element

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-textarea-label-color | Label text color | #59e
--dile-textarea-label-font-size | Label font size | 1em
--dile-textarea-border | Textarea box border | 1px solid #888
--dile-textarea-border-radius | Textarea element border radius | 5px
--dile-textarea-font-size | Input element font size | 1em
--dile-textarea-padding | Padding for the textarea element | 5px
--dile-textarea-font-family | Textarea element font family | sans-serif
--dile-textarea-label-margin-bottom | Label marging bottom | 4px
--dile-input-error-border-color | Border color on errored state | #c00
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875em
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

## Events

### input

This element acts as an native textarea element. So, you can listen the native `input` event.

```javascript
inputField.addEventListener('input', (e) => {
  console.log('input event named ', e.target.name, ' has value: ', e.target.value);
});
```

## dile-textarea demos

### Default textarea
```html preview-story
<dile-textarea label="Comments"></dile-textarea>
```

```html preview-story
<style>
.styled {
  --dile-textarea-border: 2px solid blue;
  --dile-textarea-border-radius: 0;
  --dile-textarea-label-color: blue;
  --dile-textarea-padding: 2px;
}
</style>
<dile-textarea class="styled" rows="2" max-rows="4" label="Styled element" placeholder="Write something here"></dile-textarea>
```