---
title: Editor
tags: utils
---

# dile-editor

Webcomponent to implement a rich markdown editor.

> This component is suitable for production but there are some pending improvements to develop.

## Installation
```bash
npm i @dile/editor
```

## Usage

Import the component:

```javascript
import '@dile/editor/editor.js';
```

Use the component:

```html
<dile-editor></dile-editor>
```

### Properties

- **value**: The markdown code of the content editable.
- **name**: Name for this editor form field 
- **label**: Label for this editor
- **viewSelected**  Selected view (this property can be "markdown" to show markdown code in a regular textarea or "editor" to show a rich editor)
- **errored**: boolean property to show error styles.
- **message**: Message Displayed
- **hideErrorOnInput**: Clean the error state when the user input some content
- **disableToolbarItems**: String, to disable some editor options. The format of the string consists of specifying the names of the options to disable, separated by the pipe character "`|`" (something like `h3|h4|italic`). Further down on this documentation page, you'll find a list of the names of each toolbar option that can be disabled.
- **addicionalCommands**: Object, to include additional options on the editor toolbar. See configuration instructions bellow.

### Methods

- **clearError()**: Remove errored state.

### Events

- **element-changed**: The element-changed event is dispatched when editor value propery changes. This event emits a detail object with its ```name``` and ```value``` properties.

## CSS Custom Properties

You can customize the editor using these CSS Custom Properties.

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

## Toolbar option names for disabling

These are the names of the options available in the toolbar, which can be used to disable the corresponding formatting functionalities in the editor.

- bold
- italic
- code_mark
- link
- removeLink
- image
- unordered_list
- ordered_list
- lift
- undo
- redo
- paragraph
- h1
- h2
- h3
- h4
- code

## Adding Additional Options to the Editor Toolbar

The `dile-editor` component allows adding other custom actions to the editor's toolbar. To achieve this, it is possible to assign an object value to the `addicionalCommands` property.

### Syntax of the `addicionalCommands` Object

The object to be added consists of three properties, all optional, where you can set an array of new commands. These properties place actions in different locations of the toolbar.

- **toolbarItems**: This property allows placing options among the main buttons.
- **undoItems**: To place options next to the undo/redo buttons.
- **blockItems**: To add new options in the block type selector (paragraphs, headings, etc.)

### How to Create New Commands

To create new commands, it is necessary to use the mechanisms provided by Prosemirror, the WYSIWYG editor creation framework that `dile-editor` is based on. However, thanks to the code classes provided in the `dile-editor` component itself, it is possible to create basic commands with a bit more ease.

Let’s look at a code example to achieve this.

```javascript
import { ToolbarItem, ToolbarImage } from '@dile/editor/src/prosemirror/toolbar-item.js';
import { homeIcon, editIcon } from '@dile/icons';
import {
  boldCommand,
  headingCommandCreator,
  linkCommand,
} from '@dile/editor/src/prosemirror/markdown-commands.js';

const newBold = new ToolbarItem({
  command: boldCommand,
  commandName: 'bold',
  icon: homeIcon,
});
const newImage = new ToolbarImage({
  command: linkCommand,
  commandName: 'image',
  icon: editIcon,
  dialogTemplate: html`<dile-editor-image-dialog id="imageDialog"></dile-editor-image-dialog>`,
});
const heading5 = {
  command: headingCommandCreator(5),
  commandName: 'h5',
};
const heading6 = {
  command: headingCommandCreator(6),
  commandName: 'h6',
};

this.addicionalCommands = {
  toolbarItems: [newBold, newImage],
  blockItems: [heading5, heading6],
};
```

Once the additional commands object is created, we can bind it to the `dile-editor` component:

```html
<dile-editor .addicionalCommands=${this.addicionalCommands} label="Customized Editor"></dile-editor>
```

## dile-editor demos

### Empty editor

```html:preview
<script type="module">
  import '@dile/editor/editor.js';
</script>
<dile-editor></dile-editor>
```

### Disable some toolbar options

```html:preview
<dile-editor disableToolbarItems="h1|h2|h3|h4|italic|image|link"></dile-editor>
```

### Using a label

```html:preview
<dile-editor label="Comments:"></dile-editor>
```

### Initialize editor with some markdown content
    
The markdown editor has two ways for initializing its content:

#### Using the value property

Setting the `value` property of the component's tag, which will set that text as the initial content of the component.

#### Using the slot content

Placing any markdown content inside the host tag as a slot. This is a much more convenient way as it easily allows you to introduce any type of content, even content that spans multiple lines, such as paragraphs, lists, headings, etc. The following example demonstrates the markdown initialization by the slot content.

```html:preview
<dile-editor label="Markdown editor" disableToolbarItems="h4|italic"># Dile editor
This is a rich editor. This editor has a value property with the markdown code of this content editable area.
</dile-editor> 
```

### Styled editor

```html:preview
<style>
  .styled {
  --dile-editor-background-color: #ffc;
  --dile-editor-views-nav-background-color: orange;
  --dile-editor-views-nav-color: #ffc;
  --dile-editor-toolbar-background-color: #f4f4f4;
  --dile-editor-toolbar-color: orange;
  --dile-input-color: orange;
  --dile-icon-size: 18px;
  --dile-editor-border: 2px solid #666;
  }
</style>
<dile-editor class="styled">### I have some styles

Do you like them?       

- Yes
- No
</dile-editor>
```

### Editor with new custom options

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { ToolbarItem, ToolbarImage } from '@dile/editor/src/prosemirror/toolbar-item.js'
  import { homeIcon, photoIcon } from '@dile/icons';
  import {
    boldCommand,
    headingCommandCreator,
    linkCommand,
  } from '@dile/editor/src/prosemirror/markdown-commands.js';
  export class DileEditorCustomized extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];
  
    constructor() {
      super();
      const newBold = new ToolbarItem({
        command: boldCommand,
        commandName: 'bold',
        icon: homeIcon,
      });
      const newImage = new ToolbarImage({
        command: linkCommand,
        commandName: 'image',
        icon: photoIcon,
        dialogTemplate: html`<dile-editor-image-dialog id="imageDialog"></dile-editor-image-dialog> `,
      });
      const heading5 = {
        command: headingCommandCreator(5),
        commandName: 'h5',
      };
      const heading6 = {
        command: headingCommandCreator(6),
        commandName: 'h6',
      };

      this.addicionalCommands = {
        toolbarItems: [newBold, newImage],
        blockItems: [heading5, heading6],
      }
    }
    render() {
      return html`
        <dile-editor .addicionalCommands=${this.addicionalCommands} label="Customized Editor"></dile-editor>
      `;
    }
  }
  customElements.define('dile-editor-customized', DileEditorCustomized);
</script>
<dile-editor-customized></dile-editor-customized>
```