---
title: Relation Checker
tags: 'Crud extras'
---

# dile-relation-checker

The `dile-relation-checker` component is designed to manage and display a list of items with a toggleable status, allowing users to easily check or uncheck each item in relation to a specific entity. 

It retrieves items from an API, displays them in a searchable list, and provides functionality to update each item's status through API requests. This component is ideal for managing many-to-many relationships or association lists within CRUD interfaces.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-ajax component.

```javascript
import '@dile/crud/components/relation-checker/relation-checker.js';
```

Use the component.

```html
<dile-relation-checker 
  endpointGet="http://localhost/api/board-games/1/mechanics"
  endpointCheck="http://localhost/api/board-games/1/mechanics" 
  label="Board Game Mechanics"
></dile-relation-checker>
```

### Properties

- **endpointGet**: String, the API endpoint that provides the list of items to check, including their current checked/unchecked status. The response format should include each item with properties `{ label, id, checked }`.
- **endpointCheck**: String, the route used to toggle the checked/unchecked status of an item. Sends an object `{ id, checked }` to update the item status.
- **items**: Array, contains the list of items received from the API for potential relationships, including their `checked` status.
- **label**: String, the title label for the selection box displayed at the top of the component.
- **keyword**: String, the keyword used to filter the items based on the search input.
- **getRelationItems**: Object, a function that processes the server response to retrieve the list of items for relationships. By default, it expects the items in the `data` property of the response.
- **computeTooltip**: Object, a function that generates a tooltip for each item in the list. It receives an item object as an argument and returns the tooltip text. The default behavior returns `null` (no tooltip).

### Custom events

These custom events allow for external handling of data loading and save operation outcomes, making it easy to display feedback to users or trigger other actions based on these events.

- **relation-data-recived**: Dispatched when data is successfully fetched from the `endpointGet` API. The event detail contains the following information:

  ```json
  {
    "items": [] // Array of items retrieved from the API
  }
  ```

- **relation-error-get**: Dispatched when there is an error in fetching data from the `endpointGet` API.
- **relation-success-save**: Dispatched when an item’s checked status has been successfully saved to the `endpointCheck` API.
- **relation-error-save**: Dispatched when there is an error in saving the checked status of an item to the `endpointCheck` API.

## Styling

It is possible to use these custom CSS properties in the `dile-relation-checker` component:

Custom property | Description | Default
----------------|-------------|---------
--relation-checker-title-font-size | The font size of the title in the checker component | 1.25rem
--relation-checker-title-font-weight | The font weight of the title in the checker component | bold
--relation-checker-title-color | The color of the title in the checker component | #303030
--relation-checker-checkbox-size | The size of the checkbox in the relation checker item | 24px
--relation-checker-tooltip-icon-size | The size of the tooltip icon in the relation checker item | 18px
--dile-chip-tooltip-padding | The padding of the tooltip chip in the relation checker item when using the "onlyicon" class | 0.15rem

In addition to the CSS custom properties mentioned above, the `dile-relation-checker` component relies on other components from the Dile Components catalog:

- `[dile-input-search](/components/dile-input-search/)`
- `[dile-checkbox](/components/dile-checkbox/)`
- `[dile-chip-tooltip](/components/dile-chip-tooltip/)`

For this reason, you can also use the style customizations specified in their respective documentation pages.

## dile-relation-checker Demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/relation-checker/relation-checker'
import '@dile/crud/components/ajax-select-crud/ajax-select-crud'

export class DemoRelationChecker extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      gameId: { type: String },
    };
  }

  constructor() {
    super();
    this.gameId = 1;
  }
  render() {
    return html`
      <dile-ajax-select-crud
        id="countryselect"
        idProperty="id"
        name="game_id"
        label="Game"
        endpoint="https://timer.escuelait.com/api/board-games" 
        queryStringVariable="keyword"
        value="${this.gameId}"
        placeholder="Search Board Game"
        .getSelectResultList=${(response) => response.data.result.data}
        displayProperty="name"
        selectDefaultPlaceholder="Select board game..."
        @element-changed=${this.selectorChanged}
    ></dile-ajax-select-crud>
      <dile-relation-checker 
        endpointGet="http://localhost/api/board-games/${this.gameId}/mechanics"
        endpointCheck="http://localhost/api/board-games/${this.gameId}/mechanics" 
        label="Board Game Mechanics"
        .computeTooltip = ${(item) => item.description}
      ></dile-relation-checker>
    `;
  }
  selectorChanged(e) {
    console.log('selectorChanged', e.detail)
    this.gameId = e.detail.value;
    if(this.gameId) {
      this.updateComplete.then(() => 
        this.shadowRoot.querySelector('dile-relation-checker').refresh()
      )
    }
  }
}
customElements.define('demo-relation-checker', DemoRelationChecker);
</script>
<demo-relation-checker></demo-relation-checker>
```
