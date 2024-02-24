```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-input-message.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-input-message';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-input/dile-input-message.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-input-message

Input text message field.

This component inherits all properties and methods from `<dile-input>`, but it is only created for messaging purposes. 

So, this component has not got any input interface. It can show messages and error messages. And is integrated with dile-form-mixin to show error messages on validation errors.

## Install

```bash
npm install @dile/dile-input
```

## Usage

Import the component.

```javascript
import '@dile/dile-input/dile-input-message';
```

Use the component

```html
<dile-input-message message="I am olny showing a message"></dile-input-message>
```

## Clear error message

- **clearError()**: clear the message and the error state.
