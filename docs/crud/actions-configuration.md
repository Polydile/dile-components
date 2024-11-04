---
title: Actions configuration
tags: configuration
order: 5
---

# Actions configuration

The CRUD components offer two types of actions that can be performed on resources:

- Batch actions, which are executed on lists of items in the `dile-crud` components.
- Individual actions, which are executed on specific items found in the `dile-crud-single` components.

## Batch Action Configuration

The CRUD system includes functionality for configuring batch actions. With this feature, you can select multiple items from a list and perform an action that affects all selected items, such as deletions, mass updates, or any other operation your system may require.

### Enabling Item Checkboxes Selection

To enable the selection of multiple items from a list, use the `hideCheckboxSelection` option in the configuration object. Set the `hideCheckboxSelection` property to `false`. You’ll find this property within the `customization` object inside the configuration object.

```javascript
this.config.customization.hideCheckboxSelection = false;
```

### Defining Actions for a Resource

Resources can define any number of actions in the configuration object. This is done by defining two properties on the config object.

The properties to define are:

- **actions.list**: This is an array of actions. All actions are provided in an object containing a `label` property and a `name` property.

```javascript
actions: {
  list: [
    {
      label: 'Delete board games',
      name: 'DeleteAction'
      destructive: true,
    },
    {
      label: 'Change Essential',
      name: 'DemoChangeEssentialAction'
    },
  ],
},
```

- **templates.formActions**: This is a template containing the forms for each available action. A `dile-pages` component is used to select the correct component form.

The selected action name is used in the `dile-pages` component as a key to determine which form component should be displayed. Each action form element is defined in a separate component, as shown in the code below.

```javascript
templates: {
    // ...
    formActions: (actionName, actionIds) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
            <demo-change-essential-action action="DemoChangeEssentialAction" .actionIds=${actionIds}></demo-change-essential-action>
        </dile-pages>
    `,
  },
```

> As you can note in the previous code, to configure the list actions froms the `formActions` template method will recive the action name and action ids array as arguments.

### Action Forms

Action forms components, like `dile-crud-delete-action` are used to provide additional data, if needed, to the backend that will process the actions. This additional data will define the behavior of the action.

- For example, if you want to create a batch action to mark or unmark items as favorites, you would need to send a value, usually a boolean, that lets the backend know whether the items should be marked as favorites or not.
- For example, if you want to create duplicates of invoices, you should send the name of the new duplicated invoice, the client, and any other data the backend needs to generate the duplicate invoices.

Action forms are regular forms with specifications explained in the [`dile-ajax-form`](http://localhost:8080/crud/ajax-form/) component. The basic requirement is that the form implements the [`DileForm` mixin](http://localhost:8080/mixins/dile-form-mixin/), to provide various methods for setting and retrieving form data.

In the action component, you can include:

- Explanatory text for the action, with paragraphs or other HTML elements you wish to incorporate.
- As many form fields as needed, typically using form components from `@dile/ui` catalog or other form components that implement the basic functionalities for setting and retrieving data via `DileForm`.

### Examples of Action Form on Crud Components

#### Action Without Form Fields

The backend may not need extra fields to process a batch action, such as when deleting a series of items.

The code shown below is a basic action that only includes a paragraph to understand the action and confirm it:

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

  static get properties() {
    return {
      actionIds: { type: Array }
    };
  }

  constructor() {
    super();
    this.actionIds = [];
  }

  render() {
    return html`
      <p>Change essential game state of ${this.actionIds.length} elements.</p>
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


## Individual Actions in the dile-crud-single Component

The dile-crud-single components can also include actions that can be performed on individual items. To do this, we need to define an array of actions in the resource's configuration object.

- **actions.single**: In this case, the array of actions is defined in `actions.single`, as seen in the following code:

```javascript
actions: {
    single: [
      {
        name: "SetEurope",
        label: "Set Europe as continent"
      },
      {
        name: "SetAsia",
        label: "Set Asia as continent"
      },
    ]
  },
```

- **templates.formSingleActions**: In this case, a template is defined to specify the different forms for each of the single actions.

```javascript
templates: {
    // Other templates
    formSingleActions: (actionName, country) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <demo-set-europe-as-continent-action action="SetEurope" .country=${country}></demo-set-europe-as-continent-action>
            <demo-set-asia-as-continent-action action="SetAsia" .country=${country}></demo-set-asia-as-continent-action>
        </dile-pages>
    `,
  },
```

> As shown in the code above, the `formSingleActions` template is defined through a function that receives the name of the action to be displayed and the data object of the item on which the action is to be performed. This data object can be used to customize the forms or add other functionalities to the action form components.

### Example of Action Form on Single Components

```javascript
import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

class DemoSetEuropeAsContinentAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      country: { type: Object }
    };
  }

  render() {
    return html`
    <p>Do you really want to set Europe as continent of ${this.country?.name}?</p>
    `;
  }
}
customElements.define('demo-set-europe-as-continent-action', DemoSetEuropeAsContinentAction);
```

## Action Handlers in the Configuration

Both the `dile-crud` and `dile-crud-single` components emit a `crud-action-success` custom event that can be captured in the component host tag, to create handlers affecting the application. However, when actions are executed, some operations may need to occur within the component itself, such as refreshing lists.

To support this, there are two properties in the configuration object where functions can be assigned to perform actions within the component's internal context.

These methods will be executed when successful action processes are detected. To aid in identifying the actions performed, the methods receive the detail objects of the executed actions.

```javascript
{
  onActionListSuccess(actionSuccessDetail) {},
  onActionSingleSuccess(actionSuccessDetail) {},
}
```

- **onActionListSuccess**: Executes when an action in the `dile-crud` component has been successfully processed.
- **onActionSingleSuccess**: Executes when an action in the `dile-crud-single` component has been successfully processed.

### Action Handler config example

The following is an example of defining behavior to be executed for specific type of action (`AttachGameAction`) when this action is processed successfully.

```javascript
{
  // other config properties
  onActionSingleSuccess(actionDetail) {
    if(actionDetail.action == 'AttachGameAction') {
      this.shadowRoot.querySelector('mj-category-relations').refreshGames();
    }
  }
}
```