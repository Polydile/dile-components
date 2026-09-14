---
title: List lite
tags: operations
element: dile-crud-list-lite
package: '@dile/crud'
summary: A simple, prop-configured list for quick listings, with no pagination, filtering, sorting or search.
---

# dile-crud-list-lite

The `dile-crud-list-lite` component lists elements from a REST API resource, just like [dile-crud-list](/crud/crud-list/), but without needing a big [resource configuration object](/crud/resource-config/). Everything is configured through simple props: the endpoint, which properties of each item to use as label/link/icon, and which action buttons to show.

Use `dile-crud-list-lite` for quick, simple listings. If you need pagination, filtering, sorting or keyword search, use [dile-crud-list](/crud/crud-list/) instead.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the component.

```javascript
import '@dile/crud/components/list-lite/crud-list-lite.js';
```

Use it, pointing it to an endpoint and telling it which properties to use as label and link:

```html
<dile-crud-list-lite
  endpoint="https://example.com/api/countries"
  labelProperty="name"
  linkProperty="url"
></dile-crud-list-lite>
```

## Properties

### Data loading

- **endpoint**: String. The URL of the REST API resource to fetch.
- **resultDataProperty**: String. The property of the JSON response that holds the array of items. Defaults to `'data'`.
- **getResultList**: Function `(json) => array`. Custom extractor for the items array, for responses with a more complex shape. When set, it takes priority over `resultDataProperty`.
- **additionalQueryString**: Object. Extra query string parameters sent with the request.

### Item rendering

- **idProperty**: String. The property used as each item's identifier, passed to action events. Defaults to `'id'`.
- **labelProperty**: String. The property used as the item's visible label. Defaults to `'name'`.
- **linkProperty**: String. The property that holds a URL. When set, the label is rendered as a link to that URL. When unset, the label is rendered as plain text.
- **icon**: String. A default `dile-iconlib` icon, in `"family.name"` format (e.g. `"material.flag"`), shown before every item's label. As with any [dile-iconlib](/icons/dile-iconlib/) icon, you must import the specific icon module you use (e.g. `import '@dile/iconlib/material-icons/flag.js'`) in addition to importing `dile-crud-list-lite` itself.
- **iconProperty**: String. The property that, when present on an item, overrides `icon` for that specific item only. Remember to import every icon module referenced by your data.
- **itemTemplate**: Function `(item) => TemplateResult`. When set, completely replaces the default icon/label/link rendering for each item. Useful for complex item layouts.

### Limiting the list / revealing more items

- **maxItems**: Number. When set, only the first N fetched items are rendered (the full response is still available in `data`), and it also acts as the batch size for `moreLinkLabel` below.
- **moreLinkLabel**: String. When set — together with `maxItems`, and while there are more fetched items than currently shown — a "show more" link/button appears at the bottom of the list with this label. Clicking it reveals one extra batch of `maxItems` items (already fetched, no new request). The link disappears once every fetched item is shown, and reappears after `refresh()`/new data if there's more to reveal again.

  Example: 25 items come back from the endpoint, `maxItems="10"` and `moreLinkLabel="See more"`. Only 10 items show at first, with the "See more" link below them. Clicking it reveals 10 more (20 shown); the link is still there, since 5 remain. Clicking it again shows the remaining 5 (25 shown, all of them); the link disappears.

### Footer link

- **footerLinkLabel**: String. Label of the optional footer link.
- **footerLinkUrl**: String. URL of the optional footer link, e.g. to a page with the full, unfiltered listing. The link is only rendered when this is set. Unlike `moreLinkLabel`, this is a plain, always-visible navigation link — it doesn't depend on `maxItems` or how many items are currently shown.

### Action buttons

Each action button is hidden by default and only appears when its corresponding property is set to `true`. Clicking a button doesn't perform any action itself — it only dispatches an event (see below).

- **showEditAction**: Boolean. Shows the edit button. Defaults to `false`.
- **showDeleteAction**: Boolean. Shows the delete button. Defaults to `false`.
- **showRestoreAction**: Boolean. Shows the restore button instead of edit/delete, for items considered "deleted". Defaults to `false`.
- **deletedProperty**: String. The property whose truthy value marks an item as deleted (so it shows the restore button instead of edit/delete, when `showRestoreAction` is `true`).

### Messages

- **emptyMessage**: String. Message shown when the resource returns no items. Defaults to `'No data available'`.
- **ajaxErrorMessage**: String. Message shown when the request fails. Defaults to `'Error loading data'`.

### Deferred start

- **disableLoadOnStart**: Boolean. When `true`, the component does not fetch any data when it connects to the DOM. Nothing is rendered until you call `start()`, or call `refresh()` for the first time. Defaults to `false`.

## Methods

- **start()**: Triggers the first load. Only needed when `disableLoadOnStart` is `true` — calling it again after the first load is a no-op.
- **refresh()**: Makes a new request to the endpoint and re-renders the list. If the component hasn't started yet (`disableLoadOnStart` and `start()`/`refresh()` not called before), this call also acts as the first `start()`.
- **getAllIds()**: Returns an array with the `idProperty` value of every fetched item, regardless of `maxItems`.
- **showMore()**: Reveals one extra batch of `maxItems` already-fetched items. Called automatically when the `moreLinkLabel` link is clicked; rarely needed to call directly.

## Events

Action buttons are rendered through [dile-crud-list-item](/crud/crud-list-item/), so the same events it dispatches bubble up from `dile-crud-list-lite`:

- **crud-item-edit**: Dispatched when the edit icon is clicked. `detail: { item, itemId }`.
- **crud-item-delete**: Dispatched when the delete icon is clicked. `detail: { item, itemId }`.
- **crud-item-restore**: Dispatched when the restore icon is clicked. `detail: { item, itemId }`.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-crud-list-lite-icon-color | Color of the item icon | #888
--dile-crud-list-lite-icon-size | Size of the item icon | 20px
--dile-crud-list-lite-icon-margin-right | Right margin of the item icon | 0.5rem
--dile-crud-list-lite-show-more-link-color | Color of the "show more" link | var(--dile-primary-color, #7BB93D)
--dile-crud-list-lite-show-more-link-font-size | Font size of the "show more" link | 0.9rem
--dile-crud-list-lite-show-more-link-margin-top | Top margin of the "show more" link | 0.75rem
--dile-crud-list-lite-show-more-link-text-align | Text alignment of the "show more" link | right
--dile-crud-list-lite-footer-link-color | Color of the footer link | var(--dile-primary-color, #7BB93D)
--dile-crud-list-lite-footer-link-font-size | Font size of the footer link | 0.9rem
--dile-crud-list-lite-footer-link-margin-top | Top margin of the footer link | 0.75rem
--dile-crud-list-lite-footer-link-text-align | Text alignment of the footer link | right
--dile-crud-list-lite-error-color | Color of the error message | #c00

To customize the appearance of each row (separators, padding, action button colors...), check the CSS custom properties of [dile-crud-list-item](/crud/crud-list-item/).

## Example

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import '@dile/crud/components/list-lite/crud-list-lite.js';
  import '@dile/iconlib/material-icons/flag.js';

  class DemoCountryListLite extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];

    render() {
      return html`
        <dile-crud-list-lite
          endpoint="https://timer.escuelait.com/api/countries"
          labelProperty="name"
          icon="material.flag"
          maxItems="5"
          moreLinkLabel="Show more"
          showEditAction
          showDeleteAction
          @crud-item-edit=${this.showOnConsole}
          @crud-item-delete=${this.showOnConsole}
        ></dile-crud-list-lite>
      `;
    }

    showOnConsole(e) {
      console.log(e.detail);
    }
  }
  customElements.define('demo-country-list-lite', DemoCountryListLite);
</script>
<demo-country-list-lite></demo-country-list-lite>
```

## Using a custom item template

You can pass an `itemTemplate` function for complete control over each item's inner content, reusing your own components:

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import '@dile/crud/components/list-lite/crud-list-lite.js';

  class DemoCountryItemLite extends LitElement {
    static get properties() {
      return { country: { type: Object } };
    }
    render() {
      return html`${this.country.name} - <i>${this.country.continent}</i>`;
    }
  }
  customElements.define('demo-country-item-lite', DemoCountryItemLite);

  class DemoCountryListLiteTemplate extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
        }
      `
    ];

    render() {
      return html`
        <dile-crud-list-lite
          endpoint="https://timer.escuelait.com/api/countries"
          .itemTemplate=${(country) => html`<demo-country-item-lite .country=${country}></demo-country-item-lite>`}
        ></dile-crud-list-lite>
      `;
    }
  }
  customElements.define('demo-country-list-lite-template', DemoCountryListLiteTemplate);
</script>
<demo-country-list-lite-template></demo-country-list-lite-template>
```
