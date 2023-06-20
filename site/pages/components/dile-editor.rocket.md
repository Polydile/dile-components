```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-editor.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */
```

```js server
export const title = 'dile-editor';
```

```js script
import { html } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '@dile/dile-editor/dile-editor.js'
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# dile-editor

Webcomponent to implement a rich markdown editor.

This component is a "work in progress".

## Installation
```bash
npm i @dile/dile-editor
```

## Usage

Import the component:

```javascript
import '@dile/dile-editor/dile-editor.js';
```

Use the component:

```html
<dile-editor></dile-editor>
```

## Properties

- **value**: The markdown code of the content editable.

## CSS Custom Properties

You can customize the editor using this CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-editor-focus-border-color | Color border on focused state | 36px

## dile-editor demos

### Empty editor

```html preview-story
<dile-editor></dile-editor>
```

