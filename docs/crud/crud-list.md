---
title: Crud list
tags: operations
---

# dile-crud-list

The `dile-crud-list` component is designed to list existing elements in a REST API resource. It is a highly sophisticated component with multiple customization options to adapt to various needs and web service configurations.

The component allows you to create lists with or without pagination, provide various controls on the items, such as edit and delete buttons, as well as apply filters and different sorting options, among other features.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud-list component.

```javascript
import '@dile/crud/components/list/crud-list.js';
```
Use the component.

```html
<dile-crud-list
  .config=${this.config}
></dile-crud-list>
```

### Properties

- **config**: Object, the configuration object that customizes the behavior and appearance of the component.
- **elements**: Array, the list of items to be displayed by the list component.
- **paginationData**: Object, the data used for pagination, such as current page and total pages.
- **numItems**: Number, the total number of items being listed.
- **pageSize**: Number, the number of items to display per page.
- **keyword**: String, the search keyword used to filter the items in the list.
- **isSelectAllActive**: Boolean, indicates whether the "select all" feature is active.
- **sort**: Object, the sorting configuration, defining how the items should be ordered.
- **actionIds**: Array, the IDs of the selected items for batch actions.
- **filters**: Array, the filters applied to the list to refine the displayed items.

### Methods

- **goNext()**: Go to the next page, in paginated lists.
- **goPrev()**: go to the previous page, in paginated lists.  
- **refresh()**: Refresh the list. This method makes a new request to the API server and display the elements.
- **setKeyword(keyword)**: Set the keyword value for filtering.
- **setSort(sortObject)**: Set the sort object to a new value.
- **setPageSize(size)**: Change the page size, on paginated lists.
- **setFilters(filters)**: Set the filters of the list element.
- **getPageIds()**: Get the ids of the selected elements.
- **getAllIds()**: Get the ids of all elements in the resource. This method will make a request to the web service. When the response is recived the component will execute the `doSuccessGetIds(e)` method, wich select all ids of the list element.

### Events

- **insert-requested**: This event is dispatched when the list component requests to open the insertion form. This can happen when there are no items in the list, either because the resource is empty or the filtering yields no results, in which case a button may appear to insert new items.
- **crud-item-edit**: This event is dispatched when the user clicks on the edit icon for an item in the list. The event detail includes a property called `itemId`, which contains the identifier of the item to be edited.
- **crud-item-delete**: This event is dispatched when the user clicks on the delete icon for an item in the list. The event detail includes a property called `itemId`, which contains the identifier of the item to be deleted.
- **crud-list-all-ids-selected**: This event is dispatched when one of the controls for selecting multiple items has been activated (either all items on a page or all items in the resource). The event detail contains the list of selected IDs.
- **crud-list-get-success**: This event is dispatched when the list component has received a set of records from the API server that it will display.
- **crud-pagination-prev**: Dispatched when the previous page button is clicked.
- **crud-pagination-next**: Dispatched when the next page button is clicked.

## Configuration

This component requires a configuration object with numerous properties, methods, and templates to customize its behavior, functionality, and appearance.

Complete information on how to configure it easily can be found on the [general CRUD guides page](/crud/). Also, you can find implementation examples below.

To simplify the use of CRUD components, the configuration object required is the same for all the various CRUD components, such as lists, fully functional CRUD pages, or detail pages for a record.

## Examples

### Create configuration object for a resource

Before looking at implementation examples of lists, it’s important to understand how to build configuration objects, as they are absolutely necessary for centrally providing the parameters needed to customize functionality.

You can learn how to create configuration objects on the page that explains the [resource configuration object](/crud/crud-item-delete/).

{% include "componentes-crud/country-config.md" %}

### Create a item Component

The list components require a template to implement the list items. This template typically uses a component that receives the item object as an attribute to render it.

In this first example, you can find the implementation of a list item. 

{% include "componentes-crud/country-item.md" %}

### Unpaginated list

This is a simple list component without pagination. When the edit and delete icons are clicked, messages will be displayed in the console.

Additionally, clicking the name of the continent in each country's item will also log a message to the console. This continent event demonstrates that item components can have their own behaviors and events, which can be handled by the components implementing the lists.

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import '@dile/crud/components/list/crud-list.js'
  
  class DemoCountryList extends LitElement {
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
      // The countryConfig variable has been defined globally to simplify this demo. Ideally, it should be imported from a module.
      this.config = window.countryConfig.getConfig();
    }

    render() {
      return html`
        <dile-crud-list
          @continent-event=${this.showOnConsole}
          @crud-item-edit=${this.showOnConsole}
          @crud-item-delete=${this.showOnConsole}
          .config="${this.config}"
        ></dile-crud-list>
      `;
    }

    showOnConsole(e) {
      console.log(e.detail);
    }

  }
  customElements.define('demo-country-list', DemoCountryList);
</script>
<demo-country-list></demo-country-list>
