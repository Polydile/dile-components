---
title: Crud Single
tags: main
---

# dile-crud-single

The `dile-crud-single` component is designed to display the details of a record from a REST API, along with the available actions for it and any related resources.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud component.

```javascript
import '@dile/crud/components/single/crud-single.js';
```
Use the component.

```html
<dile-crud-single
  relatedId="1"
  .config="${this.config}"
></dile-crud-single>
```

### Properties

- **config**: Object, the configuration object that customizes the behavior and appearance of the `dile-crud-single` component.
- **relatedId**: String, the identifier of the specific record that is being displayed and managed by the component.
- **element**: Object, the item object containing the details of the record to be displayed.
- **actionIds**: Array, containing the identifier of the item being managed in the `dile-crud-single` component. This identifier is used to trigger batch actions in the CRUD system. Although this component displays a single record, an array is used for actions, with a single identifier in the array.
- **language**: String, the interface and feedback messages language. Available 'en', 'es'. Fallback to 'en'.

### Methods

- **refresh()**: Reloads the current data for the record being displayed. This method is used to update the view after changes have been made to the record.
- **edit()**: Opens the form to edit the current record being displayed by the `dile-crud-single` component.

### Events

This component is built on multiple components from the `@dile/crud` catalog. As a result, it can dispatch a large number of events, such as those detailed in `dile-crud`, `dile-crud-update`, `dile-crud-item-delete`, and others.

Particularly useful events include:

- **crud-action-success**: Dispached when an action succeed. The detail of this event includes the properties the `action` name, the `msg` and `data` with any additional data that the backend may have sent as a response.
- **crud-item-detail-loaded**: This event is dispatched when the item details have been successfully loaded from the API. The event detail includes the loaded data.
- **crud-update-success**: Dispatched when an update operation is successfully completed. It sends the same detail that is received from the `dile-ajax-form` component.

Refer to the documentation of other components to discover many more events available in `dile-crud-single`.


## Generating Single Components with the CLI

You can use the [Dile Components CLI](/cli/) to create the scaffolding for single components from `@dile/crud` that are already configured for use with `dile-crud-single`. To do this, run the following command:

```bash
dile g-single post/post-single
```

> This command requires that the resource configuration file has been generated previously, which you can do using the CLI command `g-resource-config`. More information is available on the [resource configuration page](/crud/resource-config/).

If you want to see the help with the complete options for this command, run:

```bash
dile g-single --help
```


## Configuration

Please refer to the [general documentation](/crud/) to find the established mechanisms for configuring the `dile-crud` component.

## Examples

### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/country-config.md" %}

### Resource form component

The resource form provides the necessary fields for editing the record.

Instructions on how to create these forms can be found in the [`dile-crud-insert`](/crud/crud-insert/) and [`dile-ajax-form`](/crud/ajax-form/) component documentation.

{% include "componentes-crud/country-form.md" %}

### Detail template component

Technically, it's not necessary to build a component to define the details of the item you want to display, as a simple template would be enough. However, to keep things organized and reusable, you would typically use a component dedicated to displaying the details, which also allows you to include additional functionality if needed.

{% include "componentes-crud/country-detail.md" %}


### Action components

Some actions that can be performed from the `crud-single` component include:

{% include "componentes-crud/country-actions.md" %}


### Component for Relationships

The single pages of a CRUD can display records of related entities using `dile-crud` components, filtered by the `belongsTo` and `relationId` properties.

For this relationship to work, we need the components required by the board games CRUD itself.

#### Configuration object

Find the guides for creating the configuration object on the [resource configuration page](/crud/resource-config/).

{% include "componentes-crud/board-game-config.md" %}

#### Item component

The item component to display each of the elements in the list.

{% include "componentes-crud/board-game-item.md" %}

#### Resource form component

The resource form.

{% include "componentes-crud/board-game-form.md" %}

#### Action component

The board game custom batch action.

{% include "componentes-crud/board-game-change-essential-action.md" %}

#### Single relations component

This is the component that allows you to define relationships. In this component, we use a `dile-crud`, but technically you could include any type of content.

{% include "componentes-crud/country-single-relations.md" %}


### Crud single Component

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/single/crud-single'

export class DemoCountrySingle extends LitElement {
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
      <dile-crud-single
        relatedId="1"
        .config="${this.config}"
      ></dile-crud-single>
    `;
  }
}
customElements.define('demo-country-single', DemoCountrySingle);
</script>
<demo-country-single></demo-country-single>
```