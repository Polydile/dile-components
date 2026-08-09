---
title: Many Relation Overlay
tags: 'Crud extras'
---

# dile-many-relation-overlay

Same tool as [dile-many-relation](/crud/many-relation/) to manage a many-to-many relationship, but the internal select is [dile-ajax-select-crud-overlay](/crud/ajax-select-crud-overlay/) instead of `dile-ajax-select-crud`: search results appear directly in a floating popup as soon as they load, so picking an item to add only takes one click instead of two.

Both components are interchangeable — `dile-many-relation-overlay` extends `dile-many-relation` and only swaps which select component it renders internally, so every property, method and event documented for `dile-many-relation` applies here too.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the component:

```javascript
import '@dile/crud/components/many-relation/many-relation-overlay.js';
```

Basic usage:

```html
<dile-many-relation-overlay
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
></dile-many-relation-overlay>
```

### Properties, custom events and styling

Refer to the [dile-many-relation documentation](/crud/many-relation/) — `dile-many-relation-overlay` shares the exact same properties, custom events and CSS custom properties, since it only overrides the internal select component.

## dile-many-relation-overlay Demo

Same demo as in [dile-many-relation](/crud/many-relation/#dile-many-relation-demo): the select at the top just lets you choose which Board Game to work with (it comes with one pre-selected by default and isn't part of `dile-many-relation-overlay`), while the component below it lets you add or remove the Tags related to that game — this time through the popup-style select.

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/crud/components/many-relation/many-relation-overlay.js';
import '@dile/crud/components/ajax-select-crud/ajax-select-crud.js';
import '@dile/ui/components/form-separator/form-separator.js';

export class DemoManyRelationOverlay extends LitElement {
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
      <dile-form-separator label="dile-many-relation-overlay component in action"></dile-form-separator>
      <dile-many-relation-overlay
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
      ></dile-many-relation-overlay>
    `
  }
  onGameChanged(e) {
    this.gameId = e.detail.value;
  }
}
customElements.define('demo-many-relation-overlay', DemoManyRelationOverlay);
</script>
<demo-many-relation-overlay></demo-many-relation-overlay>
```
