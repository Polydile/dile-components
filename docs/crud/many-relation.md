---
title: Many Relation
tags: 'Crud extras'
---

# dile-many-relation

The `dile-many-relation` component provides a generic front-end interface for managing many-to-many relationships. It displays the currently associated items and allows users to add new ones via a searchable select or remove existing ones, all backed by REST API endpoints.

It is designed to work with any pair of entities. A typical use case would be managing the Tags associated with a Board Game from the Board Game detail page.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the component:

```javascript
import '@dile/crud/components/many-relation/many-relation.js';
```

Basic usage:

```html
<dile-many-relation
  endpointGet="/api/tags"
  endpointList="/api/board-games/1/tags"
  endpointAdd="/api/board-games/1/tags"
  endpointRemove="/api/board-games/1/tags"
  idProperty="id"
  bodyIdProperty="tag_id"
  displayProperty="name"
  resultDataProperty="data"
  loadFromEndpoint
  language="en"
></dile-many-relation>
```

### Properties

#### Endpoints

- **endpointGet**: String. API endpoint used by the internal select to search all available items (e.g. `/api/tags`).
- **endpointList**: String. API endpoint to retrieve the currently related items (e.g. `/api/board-games/1/tags`). Used on initial load when `loadFromEndpoint` is true, and after every add or remove operation to refresh the list.
- **endpointAdd**: String. API endpoint for the POST request that adds a new relation (e.g. `/api/board-games/1/tags`).
- **endpointRemove**: String. Base API endpoint for the DELETE request. The related item's ID is appended automatically (e.g. `/api/board-games/1/tags` → `DELETE /api/board-games/1/tags/6`).

#### Initial data

- **relatedItems**: Array. Currently related items passed in from the parent. Used when `loadFromEndpoint` is `false`. Defaults to `[]`.
- **loadFromEndpoint**: Boolean. When `true`, the component ignores `relatedItems` and fetches the initial list from `endpointList` on mount. After every add or remove operation the list is always refreshed from `endpointList`, using the API as the source of truth. Defaults to `false`.

#### Select configuration (passed to the internal `dile-ajax-select-crud`)

- **displayProperty**: String. Property of each item to display as its label in the select. Defaults to `'name'`.
- **idProperty**: String. Property of each item used as its unique identifier. Defaults to `'id'`.
- **bodyIdProperty**: String. Key used in the POST body when adding a relation. Useful when the POST body key differs from the item's ID property (e.g. `tag_id` instead of `id`). Defaults to the value of `idProperty`.
- **queryStringVariable**: String. Query string parameter name sent to `endpointGet` when the user types in the search field.
- **placeholder**: String. Placeholder text for the search input inside the select.
- **selectDefaultPlaceholder**: String. Placeholder shown in the select dropdown when no item is selected. Defaults to the i18n value (`"Select..."` / `"Selecciona..."`).
- **resultDataProperty**: String. Property path in the `endpointGet` response that contains the array of items for the select (e.g. `'data'`).
- **maxResults**: Number. Maximum number of results requested per search query.
- **pageParamName**: String. Query string parameter name used to pass the page size to `endpointGet`.
- **getSelectResultList**: Object (Function). Custom function to extract the items array from the `endpointGet` response. Signature: `(response) => []`.

#### List customisation

- **label**: String. Optional heading label displayed above the select input. When not set, no label is rendered.
- **itemTemplate**: Object (Function). Function used to render each related item in the list. Receives the item object and must return a lit-html template. Defaults to rendering `item[displayProperty]`. Example: `.itemTemplate=${item => html\`<b>${item.name}</b>\`}`.
- **getListItems**: Object (Function). Function to extract the items array from the `endpointList` response. Defaults to `(response) => response.data`.
- **addRelationLabel**: String. Override the label of the add button shown as a tooltip. If not set, the i18n value is used (`"Add"` / `"Añadir"`).
- **language**: String. Language code for the i18n system (`'en'`, `'es'`). Propagated from the parent.

### Custom events

- **many-relation-add-success**: Dispatched when a new relation has been successfully created via POST.
- **many-relation-add-error**: Dispatched when the POST request to add a relation fails.
- **many-relation-remove-success**: Dispatched when a relation has been successfully deleted via DELETE.
- **many-relation-remove-error**: Dispatched when the DELETE request to remove a relation fails.
- **many-relation-add-no-selection**: Dispatched when the user clicks the add button without having selected an item first. Use this to show a warning message prompting the user to select an item before adding.
- **many-relation-list-error**: Dispatched when the GET request to refresh the related items list fails.

## Styling

Custom property | Description | Default
----------------|-------------|---------
`--dile-input-label-font-size` | Font size of the label heading | `1em`
`--dile-input-label-color` | Color of the label heading | `#59e`
`--dile-input-label-font-weight` | Font weight of the label heading | `normal`
`--dile-input-label-margin-bottom` | Bottom margin of the label heading | `4px`
`--many-relation-item-font-size` | Font size of each related item label | `0.9rem`
`--many-relation-item-color` | Text color of each related item label | `inherit`
`--many-relation-add-size` | Size of the add icon button (also controls the width of all icon columns for alignment) | `38px`
`--many-relation-add-color` | Color of the add icon | `#2962ff`
`--many-relation-add-disabled-color` | Color of the add icon when no item is selected | `#ccc`
`--many-relation-remove-size` | Size of the remove icon | `24px`
`--many-relation-remove-color` | Color of the remove icon | `#c00`
`--many-relation-empty-font-size` | Font size of the empty list message | `0.9rem`
`--many-relation-empty-color` | Text color of the empty list message | `#888`
`--many-relation-empty-font-style` | Font style of the empty list message | `italic`

The component also uses `dile-ajax-select-crud`, `dile-icon`, and `dile-spinner` internally, so their respective CSS custom properties are also available.

## dile-many-relation Demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/many-relation/many-relation.js';
import '@dile/crud/components/ajax-select-crud/ajax-select-crud.js';
import '@dile/ui/components/form-separator/form-separator.js';

export class DemoManyRelation extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      gameId: { type: Number },
    };
  }

  constructor() {
    super();
    this.gameId = 1;
  }

  render() {
    return html`
      <dile-ajax-select-crud
        idProperty="id"
        name="game_id"
        label="Board Game"
        endpoint="https://timer.escuelait.com/api/board-games"
        queryStringVariable="search"
        value="${this.gameId}"
        placeholder="Search board game..."
        .getSelectResultList=${(response) => response.data.result.data}
        displayProperty="name"
        selectDefaultPlaceholder="Select board game..."
        @element-changed=${this.onGameChanged}
      ></dile-ajax-select-crud>

    ${this.gameId 
      ? this.relationTemplate
      : 'Select board game...'
    }
    `;
  }
  get relationTemplate() {
    return html`
      <dile-form-separator label="dile-many-relation component in action"></dile-form-separator>
      <dile-many-relation
        endpointGet="https://timer.escuelait.com/api/tags"
        endpointList="https://timer.escuelait.com/api/board-games/${this.gameId}/tags"
        endpointAdd="https://timer.escuelait.com/api/board-games/${this.gameId}/tags"
        endpointRemove="https://timer.escuelait.com/api/board-games/${this.gameId}/tags"
        idProperty="id"
        bodyIdProperty="tag_id"
        displayProperty="name"
        resultDataProperty="data"
        loadFromEndpoint
        language="en"
        .itemTemplate=${(item) => html`<b>${item.name}</b>`}
      ></dile-many-relation>
    `
  }
  onGameChanged(e) {
    this.gameId = e.detail.value;
  }
}
customElements.define('demo-many-relation', DemoManyRelation);
</script>
<demo-many-relation></demo-many-relation>
```
