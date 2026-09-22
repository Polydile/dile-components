---
title: List
tags: operations
element: dile-crud-list
package: '@dile/crud'
summary: Lists resource records with pagination, filters, sorting, per-item actions, and optional DataGrid support.
---

# dile-crud-list

The `dile-crud-list` component is designed to list existing elements in a REST API resource. It is a sophisticated component with multiple customization options to adapt to various needs and web service configurations.

The component allows you to create lists of resource elements, with or without pagination, provide various controls on the items, such as edit and delete buttons, as well as apply filters, different sorting options, and **render using either traditional list items or a full DataGrid component**.

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
- **language**: String, the interface and feedback messages language. Available 'en', 'es'. Fallback to 'en'.
- **disableLoadOnStart**: Boolean, controls whether the component should automatically load elements when it initializes. When set to true, the component will not trigger the initial loading of data on startup, allowing for manual data loading to be managed as needed.

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
- **crud-list-refresh**: This event is dispatched when the list component is about to refresh its data. This happens when the `refresh()` method is called, either programmatically or through user interaction.
- **crud-item-edit**: This event is dispatched when the user clicks on the edit icon for an item in the list. The event detail includes a property called `itemId`, which contains the identifier of the item to be edited.
- **crud-item-delete**: This event is dispatched when the user clicks on the delete icon for an item in the list. The event detail includes a property called `itemId`, which contains the identifier of the item to be deleted.
- **crud-list-all-ids-selected**: This event is dispatched when one of the controls for selecting multiple items has been activated (either all items on a page or all items in the resource). The event detail contains the list of selected IDs.
- **crud-list-get-success**: This event is dispatched when the list component has received a set of records from the API server that it will display.
- **crud-list-sort-changed**: This event is dispatched every time `setSort()` is called, whether from a grid column header, the `dile-crud-sort-form` control, or programmatically. The event detail is `{ sortField, sortDirection }`. `dile-crud` listens for this to keep `dile-crud-sort-form` in sync with sorting done from a DataGrid.
- **crud-pagination-prev**: Dispatched when the previous page button is clicked.
- **crud-pagination-next**: Dispatched when the next page button is clicked.


### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-crud-list-summary-background-color | Background color of the summary section | var(--dile-primary-light-color, #999)
--dile-crud-list-summary-color | Text color of the summary section | var(--dile-on-primary-light-color, #fff)
--dile-crud-list-summary-font-size | Font size of the summary section | 0.8rem
--dile-crud-list-summary-border-bottom | Border bottom of the summary section | 1px solid #ccc
--dile-crud-list-summary-padding | Padding of the summary section | 0.4rem 1rem
--dile-crud-list-pagination-margin-top | Top margin of the pagination section | 1rem
--dile-crud-filters-list-margin | Margin of the filters list container | 0 0.5rem
--dile-crud-filters-list-gap | Gap between filter items | 0.5rem
--dile-crud-list-filters-list-margin | Margin of the filters list inside dile-crud-list | 0
--dile-crud-list-empty-padding | Padding of the empty list message | 3rem 1rem
--dile-crud-list-empty-text-align | Text alignment of the empty list message | center
--dile-crud-list-elements-container-template-columns | CSS grid template columns for the elements container | 1fr
--dile-crud-list-elements-container-gap | Gap between elements in the container | 0
--dile-icon-color | Icon color in pagination navigation buttons | var(--dile-on-secondary-color, #fff)
--dile-icon-rounded-background-color | Background color of pagination navigation buttons | var(--dile-secondary-color, #2962FF)
--dile-on-secondary-dark-color | Icon color on hover for pagination navigation buttons | #1942DF
--dile-secondary-dark-color | Background color on hover for pagination navigation buttons | #fff
--dile-crud-pagination-nav-button-disabled-icon-color | Icon color when pagination button is disabled | #f5f5f5
--dile-crud-pagination-nav-button-disabled-background-color | Background color when pagination button is disabled | #ddd
--dile-crud-select-all-checkbox-color | Checkbox icon color in select all button | #303030
--dile-crud-select-all-checkbox-size | Checkbox icon size in select all | 1.5rem
--dile-crud-select-all-overlay-checkbox-color | Checkbox icon color in select all overlay menu | #303030

To customize the appearance of the listings, check other CRUD system components such as [dile-list-item](/crud/crud-list-item/) or [dile-chip](/dile-chip/).

## Configuration

This component requires a configuration object with numerous properties, methods, and templates to customize its behavior, functionality, and appearance.

Complete information on how to configure it easily can be found on the [general CRUD guides page](/crud/). Also, you can find implementation examples below.

> To simplify the use of CRUD components, the configuration object required is the same for all the various CRUD components, such as lists, fully functional CRUD pages, or detail pages for a record.

## Rendering Modes {#rendering-modes}

`dile-crud-list` decides how to render each element with the following precedence, evaluated in this order:

1. **`config.templates.grid`** (a function) — if defined, it wins over everything else.
2. **`config.grid.columns`** (a declarative array) — if defined and `templates.grid` isn't, the list renders the built-in `<dile-crud-data-grid>` component.
3. **Default** — if neither is configured, the list renders each element via `config.templates.item`, exactly as described above under [Usage](#usage) and [Configuration](#configuration).

For most tabular listings, you don't need to write any DataGrid component yourself: configure **Option A** below. Only reach for **Option B** when the declarative columns aren't expressive enough for what you need.

### Option A (Recommended): Declarative Data Grid via `config.grid` {#option-a}

Setting `config.grid.columns` renders the built-in `<dile-crud-data-grid>` component for you. It automatically builds an `Actions` column (using `DileCrudItemActions.hasActions(config)` and `<dile-crud-item-actions>` internally — see [dile-crud-item-actions](/crud/crud-list-item/#dile-crud-item-actions)) and forwards grid-level options to the underlying `@dile/ui` `<dile-data-grid>` primitive. No custom component is required.

#### Column definition reference

Each entry in `config.grid.columns` accepts:

Property | Type | Description
---------|------|------------
`field` | String | Property name read from each row when no `render` is given.
`header` | String | Column header text. Falls back to `field` if omitted.
`width` | String (CSS value) | Sets a fixed column width, e.g. `'110px'`.
`align` | `'left' \| 'center' \| 'right'` | Cell/header text alignment. Default `'left'`.
`sortable` | Boolean | Enables the clickable sort header and sort icon for this column.
`render(item, rowIndex, column)` | Function | Custom cell content; overrides the `field` lookup.
`hideOnCard` | Boolean | Hides this column in the responsive card layout.
`hideCardLabel` | Boolean | Hides the auto-generated field label in card layout.
`sticky` | `true \| 'left' \| 'right'` | Pins the column.

> **Only mark a column `sortable` if the backend can actually order by it.** `dile-crud-data-grid` always sorts externally (see [Sort Mode](#sort-mode) below) — clicking the header just asks the backend to sort by `field`, with no client-side fallback. If the backend can't honor it (e.g. `field` is resolved from a joined/derived table), the request still goes out, and whatever order the backend falls back to will look like an unrelated re-shuffle of the list rather than a real sort. If you also expose [`sort.options`](/crud/resource-config/#sort) via `dile-crud-sort-form`, keep both lists in sync: a sortable grid column whose `field` isn't in `sort.options` is silently ignored by the sort-form sync described below, rather than erroring — see [Shared Behavior](#shared-behavior-between-both-grid-modes).

#### Grid-level options reference

All of the following live under `config.grid`:

Property | Type | Default | Description
---------|------|---------|------------
`columns` | Array | — | Required to activate this rendering mode.
`stickyFirstColumn` | Boolean | `true` | Pins the first column while scrolling horizontally.
`striped` | Boolean | `true` | Alternates row background colors.
`responsiveMode` | `'auto' \| 'cards' \| 'scroll'` | `'auto'` | Controls how the grid degrades on small containers.
`emptyMessage` | String | `'No data available'` | Message shown when there are no rows.
`selectable` | Boolean | `!config.customization.hideCheckboxSelection` | Overrides the global checkbox-selection setting for this grid specifically.
`hideActionsColumn` | Boolean | `false` | Suppresses the automatic `Actions` column entirely.
`actionsColumnHeader` | String | `config.labels.actionsHeader` or `'Actions'` | Header text for the auto-injected `Actions` column.
`actionsColumnWidth` | String | `'110px'` | Width of the auto-injected `Actions` column.
`actionsColumnAlign` | `'left' \| 'center' \| 'right'` | `'right'` | Alignment of the auto-injected `Actions` column.

#### Example

This is the configuration used by the Countries DataGrid demo:

```javascript
grid: {
  columns: [
    {
      field: 'id',
      header: 'ID',
      width: '70px',
      align: 'center',
      sortable: true,
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      field: 'continent',
      header: 'Continent',
      sortable: true,
      render: (country) => html`
        <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 12px; background-color: var(--dile-primary-light-color, #e0f2fe); color: var(--dile-primary-dark-color, #0369a1); font-size: 0.8rem; font-weight: 600;">
          ${country.continent || 'N/A'}
        </span>
      `,
    },
  ],
  stickyFirstColumn: true,
  striped: true,
},
```

No `templates.grid` function and no custom component are needed — `<dile-crud-data-grid>` and its automatic `Actions` column handle the rest.

### Option B (Escape Hatch): Fully Custom Component via `config.templates.grid` {#option-b}

Use this only when `config.grid.columns` isn't expressive enough — for example, if you need full control over the grid wrapper, multiple grids on the same page, non-`<dile-data-grid>` markup, or client-side sorting (see [Sort Mode](#sort-mode) below). Instead of rendering individual items via `templates.item`, you render the entire listing yourself by configuring `templates.grid(elements, actionIds, config, sort)`:

```javascript
templates: {
  grid: (elements, actionIds, config, sort) => html`
    <customers-data-grid
      .items=${elements}
      .selectedIds=${actionIds}
      .config=${config}
      .sort=${sort}
    ></customers-data-grid>
  `,
}
```

When `templates.grid` is defined:
1. `DileCrudList` delegates the rendering of all rows and selection check states to your DataGrid component.
2. The `config` object is passed as the third parameter to the template, allowing your DataGrid (and its internal `<dile-crud-item-actions .item=${item} .config=${this.config}>`) to automatically respect global and per-item edit/delete/restore permissions without manual configuration.
3. Clicking a column header emits `dile-data-grid-sort`, which is automatically captured by `DileCrudList` to trigger backend sorting via `setSort({ sortField, sortDirection })`.
4. Checkbox changes emit `item-checkbox-changed`, synchronizing `actionIds` across both the list and batch actions toolbar.
5. The `sort` object (`{ sortField, sortDirection }`, or `null` before any sort is applied) is passed as the **fourth** parameter, reflecting the sort currently confirmed by the backend. **You must forward it back into `<dile-data-grid>` as `.sortField`/`.sortDirection`** (see the example below) when using `sort-mode="external"`. `DileCrudList` re-renders its content behind a loading indicator on every sort request, which unmounts and remounts your grid component — without feeding `sort` back in, the grid loses track of the current column/direction on every round-trip, the sort icon disappears, and clicking the same header again restarts at ascending instead of toggling to descending.

Unlike `config.grid.columns`, this path does **not** auto-inject an `Actions` column — you are responsible for adding one yourself using `DileCrudItemActions.hasActions(config)` and `<dile-crud-item-actions>`, exactly as shown in the example below and as documented in [dile-crud-item-actions](/crud/crud-list-item/#dile-crud-item-actions).

#### Implementing a CRUD DataGrid Component

Here is a complete, real-world example of a custom DataGrid component tailored for a CRUD resource. Notice how:
- It declares `items`, `selectedIds`, and `config` properties.
- It uses `DileCrudItemActions.hasActions(this.config)` to conditionally include the `Actions` column.
- Inside the `Actions` column `render` method, `<dile-crud-item-actions .item=${item} .config=${this.config}>` automatically takes care of edit/delete/restore permissions and events.
- Custom cell elements use `part="..."` in their render template, allowing the host component to easily style them with `dile-data-grid::part(...)` across the Shadow DOM boundary.
- `selectable` is derived from `config.customization.hideCheckboxSelection`, matching the behavior of the built-in `<dile-crud-data-grid>` from Option A, instead of being hardcoded.
- It declares `sort-mode="external"` explicitly and forwards the `sort` parameter back into `<dile-data-grid>` as `.sortField`/`.sortDirection`, so the sort icon and asc/desc toggle keep working correctly across the server round-trips triggered by `setSort`.

```javascript
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/data-grid/data-grid.js';
import { DileCrudItemActions } from '@dile/crud/components/list/src/DileCrudItemActions.js';
import '@dile/crud/components/list/crud-item-actions.js';

export class CustomersDataGrid extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-data-grid::part(country-badge) {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        background-color: var(--dile-primary-light-color, #e0f2fe);
        color: var(--dile-primary-dark-color, #0369a1);
        font-size: 0.8rem;
        font-weight: 600;
      }
    `
  ];

  static get properties() {
    return {
      items: { type: Array },
      selectedIds: { type: Array },
      config: { type: Object },
      sort: { type: Object },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.selectedIds = [];
    this.config = null;
    this.sort = null;
  }

  get columns() {
    const cols = [
      {
        field: 'id',
        header: 'ID',
        width: '70px',
        align: 'center',
        sortable: true,
      },
      {
        field: 'name',
        header: 'Customer Name',
        sortable: true,
      },
      {
        field: 'country',
        header: 'Country',
        sortable: true,
        render: (customer) => html`
          <span part="country-badge">${customer.country || 'N/A'}</span>
        `,
      },
    ];

    // Conditionally include Actions column only if actions are enabled
    if (DileCrudItemActions.hasActions(this.config)) {
      cols.push({
        header: 'Actions',
        align: 'right',
        width: '110px',
        hideCardLabel: true,
        render: (customer) => html`
          <dile-crud-item-actions
            .item=${customer}
            .config=${this.config}
          ></dile-crud-item-actions>
        `,
      });
    }

    return cols;
  }

  render() {
    return html`
      <dile-data-grid
        .items=${this.items}
        .columns=${this.columns}
        .selectedIds=${this.selectedIds}
        .sortField=${this.sort?.sortField || ''}
        .sortDirection=${this.sort?.sortDirection || ''}
        ?selectable=${!this.config?.customization?.hideCheckboxSelection}
        sticky-first-column
        striped
        sort-mode="external"
      ></dile-data-grid>
    `;
  }
}

customElements.define('customers-data-grid', CustomersDataGrid);
```

### Shared Behavior Between Both Grid Modes {#shared-behavior-between-both-grid-modes}

Both Option A and Option B render inside the same `.grid-container` wrapper inside `dile-crud-list`, which listens for `item-checkbox-changed` (syncing `actionIds`/selection) and `dile-data-grid-sort` (calling `setSort({ sortField, sortDirection })`). Selection sync and server-driven sort behave identically regardless of which option you use.

Every call to `setSort()` — whether triggered by a grid header click or by any other sort control — also makes `dile-crud-list` dispatch a bubbling `crud-list-sort-changed` event (`detail: { sortField, sortDirection }`). Inside `dile-crud`, this keeps the `dile-crud-sort-form` control (the sort dropdown in the toolbar) in sync: sorting from the grid updates which option the form shows as selected, and vice versa. If the incoming `sortField` isn't one of `config.sort.options` — for example a grid column that's `sortable` but has no equivalent entry in `sort.options` — `dile-crud` leaves the form's current selection untouched rather than pointing it at an option it has no control for.

### Sort Mode: One Real Capability Difference {#sort-mode}

`config.grid.columns` always uses `sort-mode="external"` on the underlying `<dile-data-grid>`, meaning every column sort click triggers a new server request via `setSort`. A hand-written `templates.grid` component (Option B) can instead set `sort-mode="client"` to sort a small/unpaginated dataset entirely client-side, without hitting the server — something the declarative path cannot currently do.

## Unpaginated List Example

### Create configuration object for a resource

Before looking at implementation examples of lists, it’s important to understand how to build configuration objects, as they are absolutely necessary for centrally providing the parameters needed to customize functionality.

You can learn how to create configuration objects on the page that explains the [resource configuration object](/crud/crud-item-delete/).

{% include "componentes-crud/country-config.md" %}

### Create a item Component

The list components require a template to implement the list items. This template typically uses a component that receives the item object as an attribute to render it.

> Here you can [find more information on how to create components for list items](/crud/crud-list-item/), as well as examples and a guide to generate their scaffolding using the [Dile Components CLI](/cli/).

In this first example, you can find the implementation of a list item. 

{% include "componentes-crud/country-item.md" %}

### Unpaginated list component

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
```

## Paginated List Example

### Create configuration object for a resource

Configuration objects creation are explained on the page that explains the [resource configuration object](/crud/crud-item-delete/).

{% include "componentes-crud/board-game-config.md" %}

### Create a item Component

This components acts as a template for the list items.

{% include "componentes-crud/board-game-item.md" %}

### Paginated list component

The use of paginated lists primarily differs in the definition of a different configuration object, which has additional requirements.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

export class DemoBoardGameList extends LitElement {
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
      <dile-crud-list
        .config="${this.config}"
        pageSize="15"
      ></dile-crud-list>
    `;
  }

}
customElements.define('demo-board-game-list', DemoBoardGameList);
</script>
<demo-board-game-list></demo-board-game-list>
```
