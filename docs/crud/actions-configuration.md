---
title: Actions configuration
tags: configuration
---

# Batch Action Configuration

The CRUD system includes functionality for configuring batch actions. With this feature, you can select multiple items from a list and perform an action that affects all selected items, such as deletions, updates, or any other operation your system may require.

## Enabling Item Selection

To enable the selection of multiple items from a list, this option must be available in the configuration object. This is set by configuring the `hideCheckboxSelection` property of the `customization` object within the configuration object to `false`.

```javascript
this.config.customization.hideCheckboxSelection = false;
```

## Defining Actions for a Resource

Resources can define any number of actions in the configuration object. This is done by defining two properties on the config object.


The properties to define are:

- **actions**: This is an array of actions. All actions are provided in an object containing a `label` property and a `name` property.

```javascript
actions: {
  list: [
    {
      label: 'Delete board games',
      value: 'DeleteAction'
    },
    {
      label: 'Change Essential',
      value: 'DemoChangeEssentialAction'
    },
  ],
},
´´´

- **formActions**: This is a template containing the forms for each available action. To select the correct form, a `dile-pages` component is used, with the selected action value as the key to determine which form to display. Each action form element is defined in a separate component, as described below.

```javascript
templates: {
    // ...
    formActions: (actionName) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
            <demo-change-essential-action action="DemoChangeEssentialAction"></demo-change-essential-action>
        </dile-pages>
    `,
  },
```

## Action Forms

Action forms are used to provide additional data, if needed, to the backend that will process the actions. This additional data will define the behavior of the action.

- For example, if you want to create a batch action to mark or unmark items as favorites, you would need to send a value, usually a boolean, that lets the backend know whether the items should be marked as favorites or not.
- For example, if you want to create duplicates of invoices, you should send the name of the new duplicated invoice, the client, and any other data the backend needs to generate the duplicate invoices.

Action forms are regular forms with specifications explained in the `dile-ajax-form` component. The basic requirement is that the form implements the `DileForm` mixin, to provide various methods for setting and retrieving form data.

In the action component, you can also include:

- Explanatory text for the action, with paragraphs or other HTML elements you wish to incorporate.
- As many form fields as needed, typically using form components from `@dile/ui` or other form components that implement the basic functionalities for setting and retrieving data via `DileForm`.

### Examples of Action Form Components

#### Action Without Form Fields

The backend may not need extra fields to process a batch action, such as when deleting a series of items.

The code for a basic action that only includes a paragraph for action verification is shown below:

```javascript
import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class DileCrudDeleteAction extends DileForm(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <p>Are you sure you want to delete those items?</p>
        `;
    }
}
```

#### Action With Form Fields

Below is an example of an action with form fields, which is used when additional data needs to be sent to the backend.

```javascript
import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/select/select.js';

export class DemoChangeEssentialAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <p>Change essential game state.</p>
      <dile-select name="essential">
        <select slot="select">
          <option value="0">Not Essential</option>
          <option value="1">Essential</option>
        </select>
      </dile-select>
    `;
  }
}
customElements.define('demo-change-essential-action', DemoChangeEssentialAction);
```