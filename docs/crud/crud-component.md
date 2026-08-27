---
title: Crud component
tags: main
---

# dile-crud

The `dile-crud` component is the primary tool for building the CRUD system, combining various components from this library to implement the full functionality of a create, read, update, and delete (CRUD) system.

Additionally, `dile-crud` also offers batch operation management through the definition of action components.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud component.

```javascript
import '@dile/crud/components/crud/crud.js';
```
Use the component.

```html
<dile-crud
  .config=${this.config}
></dile-crud>
```

### Properties

- **title**: String, title for the crud component. Optional.
- **config**: Object, the configuration object that customizes the behavior and functionality of the CRUD system.
- **actionIds**: Array, the list of IDs for the items selected for batch operations.
- **keyword**: String, the search keyword used to filter the items in the CRUD system.
- **belongsTo**: String, indicates the name of the resource to which the records managed by the `dile-crud` component belong in this instance. 
- **relationId**: String, is the identifier that uniquely identifies the specific resource. 
- **language**: String, the feedback messages language. Available 'en', 'es'. Fallback to 'en'.
- **filtersAlwaysVisible**: Boolean, when `true`, renders the filters form directly below the nav actions bar instead of hiding it behind a button that opens an overlay. Default `false`. See [Always Visible Filters](#always-visible-filters).
- **singleActionDispatcher**: String, the `name` of an action defined in `config.actions.list` to run directly on the selected items, bypassing the batch actions dropdown menu. See [Single Action Dispatcher](#single-action-dispatcher).

### Methods

- **openInsert()**: Opens the form or interface for inserting a new item into the CRUD system.
- **editItem(id)**: Opens the form or interface to edit the item with the specified `id`.
- **setKeyword(keyword)**: Sets the search keyword used to filter the items within the list system based on the provided `keyword`.
- **attachActionId(id)**: Adds the specified `id` to the list of IDs selected for batch actions.
- **detachActionId(id)**: Removes the specified `id` from the list of IDs selected for batch actions.
- **removeActionItems(idsArray)**: Removes the items with the specified IDs in `idsArray` from the CRUD system.
- **refresh()**: Refreshes the data or content of the CRUD system, reloading the items from the server.
- **setCustomizationOption(optionName, value)**: Dynamically sets a customization option in the CRUD configuration. Receives the option name (e.g., `hideCheckboxSelection`, `disableInsert`) and the value to set.

### Events

This component is based on elements such as `dile-crud-list`, `dile-crud-insert`, `dile-crud-update`, `dile-crud-item-delete`, and many others. Therefore, all events documented in those components can be listened to in `dile-crud`. Please refer to the mentioned components for information on those events.

**Specific events of `dile-crud`:**

- **crud-item-insert**: Dispatched when the system shows the insert form.
- **crud-action-success**: Dispached when an action succeed. The detail of this event includes the properties `msg` with a message from the server response, `action` with the name of the action being responded to, and `data` with any additional data that the backend may have sent as a response. Of course, the backend shoul be developed to send all this data.

### CRUD component CSS Custom Properties {#crud-component-css-custom-properties}

It is possible to customize the appearance of CRUD components using Custom CSS Properties. This component uses elements such as `dile-button` and `dile-input-search`, and therefore supports the custom CSS properties documented for those components. It also uses CSS custom properties that are consistently applied across the entire component catalog, some of which are detailed on the theming page.

Additionally, there are specific custom properties for dile-crud, which are detailed in the following table:

Custom property | Description | Default
--- | --- | ---
--filter-list-margin | Margin of the filter list container | 0 0.5rem
--filter-list-gap | Gap between filter list items | 0.5rem
--dile-crud-h1-font-size | Font size for h1 headings in CRUD forms | 1.5rem
--dile-crud-h1-font-weight | Font weight for h1 headings in CRUD forms | bold
--dile-crud-h1-margin | Margin for h1 headings in CRUD forms | 0 0 1rem 0
--dile-crud-insert-button-padding-y | Vertical padding for the insert button | 0.4rem
--dile-crud-insert-button-padding-x | Horizontal padding for the insert button | 0.5rem
--dile-crud-insert-button-font-size | Font size for the insert button | 1rem
--dile-crud-action-color | Color for action buttons and icons | #888
--dile-on-crud-action-color | Text/foreground color for action buttons | #fff
--dile-crud-filters-label-font-size | Font size for filter overlay and labels (affects entire filters popup) | var(--dile-input-label-font-size, 1em)
--dile-crud-filters-select-font-size | Font size for select fields in filters | var(--dile-select-font-size, 0.875em)
--dile-crud-filters-input-padding | Padding for input/select fields in filters | var(--dile-input-padding, 5px)
--dile-crud-filters-label-margin-bottom | Margin bottom for filter labels | var(--dile-input-label-margin-bottom, 4px)
--dile-crud-filters-field-margin | Margin for filter fields (checkboxes and other elements) | 0.4rem 0
--dile-crud-filters-inline-margin | Margin of the card wrapping the always-visible filters form | 0.5rem 0
--dile-crud-filters-inline-background-color | Background color of the always-visible filters card | var(--dile-very-light-color, #f5f5f5)
--dile-crud-filters-inline-border | Border of the always-visible filters card | none
--dile-crud-filters-inline-gap | Gap between filter fields in the always-visible filters grid (from 500px viewport width) | 1rem
--dile-crud-filters-inline-columns-medium | Grid columns for the always-visible filters form on viewports from 500px wide | 1fr 1fr
--dile-crud-filters-inline-columns-large | Grid columns for the always-visible filters form on viewports from 1200px wide | 1fr 1fr 1fr
--dile-crud-single-action-background-color | Background color of the single action dispatcher button | var(--dile-primary-color, #7BB93D)
--dile-crud-single-action-text-color | Text color of the single action dispatcher button | var(--dile-on-primary-color, #fff)
--dile-crud-single-action-border-color | Border color of the single action dispatcher button | var(--dile-primary-dark-color, #12354d)
--dile-crud-single-action-hover-background-color | Background color of the single action dispatcher button on hover | var(--dile-primary-light-color, #f3f3ae)
--dile-crud-single-action-hover-text-color | Text color of the single action dispatcher button on hover | var(--dile-on-primary-light-color, #303030)
--dile-crud-single-action-hover-border-color | Border color of the single action dispatcher button on hover | var(--dile-primary-color, #666666)


## Generating CRUD Components for Entities with the CLI

You can use the [Dile Components CLI](/cli/) to create the scaffolding for CRUD components that are already configured for use with `dile-crud`. To do this, run the following command:

```bash
dile g-crud post/post-crud
```

> This command requires that the resource configuration file has been generated previously, which can be done with the CLI command `g-resource-config`. You can find more information on the [resource configuration page](/crud/resource-config/).

You can get the help with the complete options for this command by running:

```bash
dile g-crud --help
```

## Configuration

Please refer to the [general documentation on the CRUD library](/crud/) to find the established mechanisms for configuring the `dile-crud` component.

## belongTo and relationId configuration

These fields facilitate the implementation of a type of filtering on the items that a `dile-crud` component will allow you to manage. For example, if you are trying to view invoices for the customer with `id=10`, `belongsTo` would be set to "customer" and `relationId` would be set to "10."

This is useful, for example, for managing a specific record on an admin page, like those that can be created using the [`dile-crud-single` component](/crud/crud-single/). For instance, when viewing the details of a country, you could use a `dile-crud` component configured with `belongsTo` and `relationId` to manage all the states within that country directly from the `dile-crud-single` component.

> Note that these configurations must be supported by the backend. The listing component will handle sending the necessary query strings to the backend, ensuring that the records delivered for the listings in this `dile-crud` component are properly filtered.


## Unpaginated Crud Example

For the correct functioning of the `dile-crud` component, a configuration object is required. Depending on the functionalities requested through the configuration object, various additional components from the CRUD library may also be needed.

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/country-config.md" %}

### Item component

The item component serves as a template to display each of the elements in the list.

{% include "componentes-crud/country-item.md" %}

### Resource form component

The resource form provides the necessary fields for adding new elements to the resource. In this example, the same form is used for both insertions and edits, but it is possible to have a different form for each operation.

Instructions on how to create these forms can be found in the [`dile-crud-insert`](/crud/crud-insert/) and [`dile-ajax-form`](/crud/ajax-form/) component documentation.

{% include "componentes-crud/country-form.md" %}

### Crud component

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/crud/crud';

export class DemoCountryCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = window.countryConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-country-crud', DemoCountryCrud);
</script>
<demo-country-crud></demo-country-crud>
```

## Paginated Crud Example

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/board-game-config.md" %}

### Item component

The item component serves as a template to display each of the elements in the list.

{% include "componentes-crud/board-game-item.md" %}

### Resource form component

The resource form provides the necessary fields for adding new elements to the resource. In this case, the same form is used for both insertions and edits, but it is possible to have a different form for each operation.

Instructions on how to create these forms can be found in the `dile-crud-insert` component documentation and `dile-ajax-form`.

{% include "componentes-crud/board-game-form.md" %}

### Action component

For the purposes of this CRUD component demo, we will include a custom batch action.

You can find more information about actions in the [actions section of the CRUD documentation](/crud/actions-configuration/).

#### Change Essentian Action

{% include "componentes-crud/board-game-change-essential-action.md" %}

#### Change Name Action

{% include "componentes-crud/change-name-action.md" %}

### Crud component

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class DemoBoardGameCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = window.boardGameConfig.getConfig();
    this.config.customization.hideCheckboxSelection = false;
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-board-game-crud', DemoBoardGameCrud);
</script>
<demo-board-game-crud></demo-board-game-crud>
```

## Always Visible Filters {#always-visible-filters}

By default, filters are hidden behind a button that opens an overlay panel (see the `dile-crud-filters` component used in the examples above). Setting the `filtersAlwaysVisible` property to `true` renders the filters form directly below the nav actions bar instead, using the `dile-crud-filters-inline` component internally.

This is useful when filters are a primary part of the workflow and you want them visible at all times, without requiring an extra click to open them.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class DemoBoardGameCrudFiltersAlwaysVisible extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = window.boardGameConfig.getConfig();
  }

  render() {
    return html`
      <dile-crud
        filtersAlwaysVisible
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-board-game-crud-filters-always-visible', DemoBoardGameCrudFiltersAlwaysVisible);
</script>
<demo-board-game-crud-filters-always-visible></demo-board-game-crud-filters-always-visible>
```

You can customize the appearance of the filters card and its grid layout with the `--dile-crud-filters-inline-*` custom properties documented in the [CSS Custom Properties](#crud-component-css-custom-properties) table above.

## Single Action Dispatcher {#single-action-dispatcher}

When a resource only needs a single batch action (for example, just deleting the selected items), opening the actions dropdown menu to pick from a list of one is unnecessary friction. Setting `singleActionDispatcher` to the `name` of an action renders a direct button for that action instead, skipping the dropdown selection step entirely.

The action definition (`label`, `destructive`, etc.) is looked up by `name` in `config.actions.list`, using the same action object shape documented on the [actions configuration page](/crud/actions-configuration/). The button is only shown once at least one item is selected via checkboxes, exactly like the standard batch actions menu.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class DemoBoardGameCrudSingleAction extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = window.boardGameConfig.getConfig();
    this.config.customization.hideCheckboxSelection = false;
    this.config.actions.single = [
      {
        label: 'Delete board games',
        name: 'DeleteAction',
        destructive: true,
      },
    ];
  }

  render() {
    return html`
      <dile-crud
        singleActionDispatcher="DeleteAction"
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-board-game-crud-single-action', DemoBoardGameCrudSingleAction);
</script>
<demo-board-game-crud-single-action></demo-board-game-crud-single-action>
```

> Note that `config.templates.formActions` is reused as-is for the single action dispatcher (it receives the action name and the array of selected item ids, just like batch actions do). Only the action metadata (`label`, `destructive`) is sourced from `actions.single` instead of `actions.list`.

You can customize the button's colors, including its hover state, with the `--dile-crud-single-action-*` custom properties documented in the [CSS Custom Properties](#crud-component-css-custom-properties) table above.