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
//import '@dile/dile-editor/dile-editor.js'
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
- **name**: Name for this editor form field 
- **label**: Label for this editor
- **viewSelected**  Selected view (this property can be "markdown" to show markdown code in a regular textarea or "editor" to show a rich editor)
- **errored**: boolean property to show error styles.
- **message**: Message Displayed
- **hideErrorOnInput**: Clean the error state when the user input some content

## Events

- **element-changed**: The element-changed event is dispatched when editor value propery changes. This event emits a detail object with its ```name``` and ```value``` properties.

## CSS Custom Properties

You can customize the editor using this CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-input-section-width | Editor width | 100%
--dile-editor-focus-border-color | Color border on focused state | 36px
--dile-input-label-font-size | Font size for the label | 1em
--dile-input-label-color | Color for the label text | #59e
--dile-input-label-font-weight | Label text font weight | normal
--dile-input-label-margin-bottom | Label marging bottom | 4px
--dile-editor-background-color | Editor background color | #fff;
--dile-editor-views-nav-background-color | Editor views selector background color | #f5f5f5
--dile-editor-views-nav-color | Editor views selector text color | #106eda
--dile-editor-views-nav-selected-color | Editor views selected view text color | #0f4e96
--dile-editor-views-nav-selected-line-color | Editor views selected view line color | #0f4e96
--dile-editor-toolbar-background-color | Toolbar background color | transparent
--dile-editor-toolbar-color | Toolbar icons color | #303030
--dile-icon-size | Toolbar icons size | 24px
--dile-input-message-padding-top | Space from input to message | 4px
--dile-input-message-font-size | Message font size | 0.875rem
--dile-input-message-color | Message text color | #888
--dile-input-message-error-color | Message text color on errored state | #c00

You can use the [dile-select component](https://dile-components.polydile.com/components/dile-select/) custom properties to change the paragraph type styles.

## dile-editor demos

### Empty editor

```html preview-story
<dile-editor></dile-editor>
```

