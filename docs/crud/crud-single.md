---
title: Crud Single
tags: main
element: dile-crud-single
package: '@dile/crud'
summary: Displays a single record's details along with its available actions and relations.
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
- **layout**: String, the visual layout of the component: `'stacked'` or `'sidebar'`. Reflected as an attribute. When not set, the value of `config.customization.singleLayout` is used, and if that is not set either, `'stacked'`. See [Layouts](#layouts).

### Layouts {#layouts}

The component can arrange the record detail and its actions in two ways:

- **`stacked`** (default): the detail on top, then the actions bar (Edit, direct actions and list actions) and, below it, the card with the rest of the single actions.
- **`sidebar`**: the detail on the left and a column on the right with the actions bar and the actions card stacked vertically. Buttons in the column take the full width (including the "Actions" button that opens the batch actions menu, which always shows its label in this layout) and the actions card shows one action per row. When the component is narrower than `48rem` the column moves below the detail. Relations are always rendered below, at full width.

In the `sidebar` layout the detail takes the look of the action group cards by default: background, border, box shadow and border radius (in the four corners) come from the `--dile-crud-single-group-*` variables (`--dile-crud-single-group-background-color`, `--dile-crud-single-group-border`, `--dile-crud-single-group-box-shadow` and `--dile-crud-single-group-border-radius`), so changing them restyles the groups and the detail together. If you set any of the [`dile-crud-detail`](/crud/crud-detail/) variables (`--dile-crud-detail-data-background-color`, `--dile-crud-detail-data-border`, `--dile-crud-detail-data-box-shadow`, `--dile-crud-detail-data-border-*-radius`) they take precedence. The `stacked` layout keeps the default detail look.

```html
<dile-crud-single
  relatedId="1"
  layout="sidebar"
  .config="${this.config}"
></dile-crud-single>
```

You can also set the layout for a whole resource in its configuration object, with `customization.singleLayout`:

```javascript
customization: {
  singleLayout: 'sidebar',
},
```

### Action groups {#action-groups}

Single actions can be organized in blocks of full-width buttons with `actions.singleGroups`. Each group has an optional `title` and the list of action names it contains. Every button can show an `icon` (dile-iconlib `"family.name"` format) and a `variant`: `'primary'`, `'outline'` or `'danger'` (by default `'danger'` for destructive actions and `'primary'` for the rest).

```javascript
import '@dile/iconlib/lucide-icons/mail.js';
import '@dile/iconlib/lucide-icons/download.js';

// In the configuration object
actions: {
  single: [
    { name: 'SendEmail', label: 'Send by email', icon: 'lucide.mail', onClick: (element) => sendEmail(element) },
    { name: 'DownloadPdf', label: 'Download PDF', icon: 'lucide.download', variant: 'outline', onClick: (element) => download(element) },
    { name: 'CancelInvoice', label: 'Cancel invoice', destructive: true },
  ],
  singleGroups: [
    { title: 'Quick actions', actions: ['SendEmail', 'DownloadPdf'] },
    { actions: ['CancelInvoice'] },
  ],
},
```

- Clicking a grouped button runs the action exactly as `triggerAction(name)`: it calls `onClick` if defined, or opens the action form otherwise.
- Grouped actions are removed from the actions bar and from the actions card, even if they are listed in `directSingleActions`. The actions not included in any group keep their usual place.
- `shouldAppear` is respected, and groups without visible actions are not rendered.
- In the `sidebar` layout the groups appear in the right column, after the actions bar. In the `stacked` layout they appear below the detail, in a responsive grid.
- Icons are not loaded automatically: import the icon modules you use, as shown above.
- Buttons are centered by default. To align their icon and label to the left (in the `sidebar` layout this also applies to the edit, direct actions and "Actions" buttons of the column) set these custom properties on an ancestor of `dile-crud-single`:

```css
dile-crud-single {
  --dile-crud-single-group-action-justify-content: flex-start;
  --dile-crud-single-group-action-text-align: start;
}
```

More details in the [actions configuration page](/crud/actions-configuration/).

### Methods

- **refresh()**: Reloads the current data for the record being displayed. This method is used to update the view after changes have been made to the record.
- **edit()**: Opens the form to edit the current record being displayed by the `dile-crud-single` component.
- **triggerAction(actionName, initialData)**: Programmatically triggers an action. The optional `initialData` parameter allows you to pre-populate the action's form with initial values. This is useful when you need to open an action with some data already filled in. The data will only be applied for that particular opening; after the action is completed or cancelled, the form will be reset on the next opening.
- **triggerDirectAction(actionName, initialData)**: An alias for `triggerAction()` that triggers direct actions defined in the configuration.

### Triggering Actions with Initial Data

You can programmatically trigger an action and pre-populate its form with initial data. This is particularly useful when an action needs to create something related to the current item.

For example, if you have a "Create Invoice" button next to each habitual product, you can open the action with the product already selected:

```javascript
const crudSingle = document.querySelector('dile-crud-single');
crudSingle.triggerAction('CreateInvoiceDraftFromHabitualProductsAction', {
  products: [{ product_uuid: uuid, units: 1 }],
});
```

The form will be populated with the provided data and displayed to the user. After the action completes (either successfully or via cancellation), the form will reset on the next opening, ensuring a clean state for new operations.

### Events

This component is built on multiple components from the `@dile/crud` catalog. As a result, it can dispatch a large number of events, such as those detailed in `dile-crud`, `dile-crud-update`, `dile-crud-item-delete`, and others.

**Action events:**

The `dile-crud-single` component includes actions functionality via `dile-crud-single-actions`. The following events are dispatched by the actions system and propagate through the component hierarchy:

- **crud-action-requested**: Dispatched when the user requests to open an action form. The event detail includes the `action` property with the name of the action requested.
- **crud-action-start**: Dispatched when an action is about to be sent to the server. The event detail includes `action` (the name of the action) and `actionIds` (the ID of the item).
- **crud-action-success**: Dispatched when an action succeeds. The detail of this event includes: 
  - `action` name of the action
  - `msg` message sent from the backend
  - `data` with any additional data that the backend may have sent as a response.
- **crud-action-error**: Dispatched when an action encounters an error. The event detail includes `msg` (message from the server response) and `errors` (validation errors). The error messages will appear next to their corresponding elements in the action form.

**Other useful events:**
- **crud-item-detail-loaded**: This event is dispatched when the item details have been successfully loaded from the API. The event detail includes the loaded data.
- **crud-item-detail-load-error**: This event is dispatched when the item details can't be loaded.
- **crud-update-success**: Dispatched when an update operation is successfully completed. It sends the same detail that is received from the `dile-ajax-form` component.

Refer to the documentation of other components to discover many more events available in `dile-crud-single`.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-primary-dark-color | Actions bar background color | #d7d353
--dile-box-selector-item-text-align | Text alignment for box selector items | center
--dile-box-selector-item-font-weight | Font weight for box selector items | bold
--dile-card-border | Border style for action card | none
--dile-card-background-color | Background color for action card | var(--dile-secondary-light-color, #beed8e)
--dile-card-text-color | Text color for action card | var(--dile-on-secondary-light-color, #303030)
--dile-box-selector-item-background-color | Background color for box selector items on hover | var(--dile-primary-light-color, #fbfbe9)
--dile-box-selector-item-color | Text color for box selector items on hover | var(--dile-on-primary-light-color, #303030)
--dile-box-selector-item-border | Border for box selector items on hover | 4px solid var(--dile-primary-color, #f3f3ae)
--dile-crud-action-color | Color for action buttons and icons | #888
--dile-on-crud-action-color | Text/foreground color for action buttons | #fff
--dile-crud-list-options-font-size | Font size of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-font-size` or `1rem`
--dile-crud-list-options-font-weight | Font weight of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-font-weight` or `bold`
--dile-crud-list-options-text-transform | Text transformation of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-text-transform` or `none`
--dile-crud-list-options-letter-spacing | Letter spacing of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-letter-spacing` or `0`
--dile-crud-list-options-padding-y | Vertical padding of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-padding-y` or `0.5rem`
--dile-crud-list-options-padding-x | Horizontal padding of action buttons (Edit, Actions, Run action) | Inherits from `--dile-button-padding-x` or `0.8rem`
--dile-crud-single-actions-columns | Grid columns of the actions card | `1fr 1fr` (`1fr` in the sidebar layout)
--dile-crud-single-actions-card-margin-bottom | Bottom margin of the actions card | `1.5rem` (`0` in the sidebar layout)
--dile-crud-single-sidebar-width | Width of the actions column in the sidebar layout | 18rem
--dile-crud-single-gap | Gap between the detail and the actions column in the sidebar layout | 1.5rem
--dile-crud-single-sidebar-gap | Gap between the blocks of the actions column | 1rem
--dile-crud-single-sidebar-actions-background-color | Background color of the actions bar in the sidebar layout | var(--dile-primary-dark-color, #d7d353)
--dile-crud-single-sidebar-actions-padding | Padding of the actions bar in the sidebar layout | 1rem
--dile-crud-single-sidebar-actions-border-radius | Border radius of the actions bar in the sidebar layout | 0.5rem
--dile-crud-single-groups-min-width | Minimum width of each group column in the stacked layout grid | 16rem
--dile-crud-single-groups-gap | Gap between action groups | 1rem
--dile-crud-single-group-background-color | Background color of an action group | var(--dile-background-color, #fff)
--dile-crud-single-group-text-color | Text color of an action group | var(--dile-on-background-color, #303030)
--dile-crud-single-group-border | Border of an action group | 1px solid rgba(0, 0, 0, 0.08)
--dile-crud-single-group-box-shadow | Box shadow of an action group | 0 1px 3px rgba(0, 0, 0, 0.08)
--dile-crud-single-group-border-radius | Border radius of an action group | 0.5rem
--dile-crud-single-group-padding | Padding of an action group | 1rem
--dile-crud-single-group-buttons-gap | Gap between the buttons of a group | 0.6rem
--dile-crud-single-group-title-font-size | Font size of the group title | 1.25rem
--dile-crud-single-group-title-font-weight | Font weight of the group title | 400
--dile-crud-single-group-title-color | Color of the group title | inherit
--dile-crud-single-group-action-font-size | Font size of grouped action buttons | 1rem
--dile-crud-single-group-action-font-weight | Font weight of grouped action buttons | normal
--dile-crud-single-group-action-border-radius | Border radius of grouped action buttons | 0.5rem
--dile-crud-single-group-action-border-width | Border width of grouped action buttons | 1px
--dile-crud-single-group-action-padding-y | Vertical padding of grouped action buttons | 0.6rem
--dile-crud-single-group-action-padding-x | Horizontal padding of grouped action buttons | 0.8rem
--dile-crud-single-group-action-justify-content | Alignment of the content (icon + label) of the grouped action buttons and, in the `sidebar` layout, of every button in the actions column (edit, direct actions and the batch "Actions" menu). Use `flex-start` to align left | center
--dile-crud-single-group-action-text-align | Alignment of the label lines when a button text wraps, for the same buttons. Use `start` together with `flex-start` above | center
--dile-crud-single-action-{variant}-background-color | Background color of grouped buttons for a variant (`primary`, `outline`, `danger`) | primary: var(--dile-primary-color); outline: transparent; danger: light tint of var(--dile-danger-color)
--dile-crud-single-action-{variant}-text-color | Text and icon color for a variant | primary: var(--dile-on-primary-color); outline: var(--dile-on-background-color); danger: var(--dile-danger-color)
--dile-crud-single-action-{variant}-border-color | Border color for a variant | primary: var(--dile-primary-color); outline: currentColor; danger: tint of var(--dile-danger-color)
--dile-crud-single-action-{variant}-hover-background-color | Hover background color for a variant | primary: var(--dile-primary-dark-color); outline: rgba(0, 0, 0, 0.05); danger: var(--dile-danger-color)
--dile-crud-single-action-{variant}-hover-text-color | Hover text color for a variant | primary: var(--dile-on-primary-dark-color); outline: var(--dile-on-background-color); danger: var(--dile-on-danger-color)
--dile-crud-single-action-{variant}-hover-border-color | Hover border color for a variant | primary: var(--dile-primary-dark-color); outline: var(--dile-on-background-color); danger: var(--dile-danger-color)

The [`dile-crud-detail`](/crud/crud-detail/) component, used internally to display the details of the element, has additional CSS custom properties available for customization.

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

### Crud single with sidebar layout

The same record using `layout="sidebar"`. The `dile-crud-single` element is already registered on the page, so it doesn't need to be imported again.

```html:preview
<script type="module">
import { LitElement, html } from 'lit';

export class DemoCountrySingleSidebar extends LitElement {
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
        layout="sidebar"
        .config="${this.config}"
      ></dile-crud-single>
    `;
  }
}
customElements.define('demo-country-single-sidebar', DemoCountrySingleSidebar);
</script>
<demo-country-single-sidebar></demo-country-single-sidebar>
```

### Crud single with action groups

The sidebar layout with the actions organized in groups, with icons and variants.

```html:preview
<script type="module">
import { LitElement, html } from 'lit';
import '@dile/iconlib/lucide-icons/mail.js';
import '@dile/iconlib/lucide-icons/download.js';
import '@dile/iconlib/lucide-icons/ban.js';

export class DemoCountrySingleGroups extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    const baseConfig = window.countryConfig.getConfig();
    const log = (message) => (element) => console.log(message, element);
    this.config = {
      ...baseConfig,
      actions: {
        ...baseConfig.actions,
        single: [
          ...baseConfig.actions.single,
          { name: 'SendEmail', label: 'Send by email', icon: 'lucide.mail', onClick: log('Send by email') },
          { name: 'DownloadPdf', label: 'Download PDF', icon: 'lucide.download', variant: 'outline', onClick: log('Download PDF') },
          { name: 'Archive', label: 'Archive country', icon: 'lucide.ban', destructive: true, onClick: log('Archive') },
        ],
        singleGroups: [
          { title: 'Quick actions', actions: ['SendEmail', 'DownloadPdf', 'SetEurope'] },
          { actions: ['SetAsia'] },
          { actions: ['Archive'] },
        ],
      },
    };
  }

  render() {
    return html`
      <dile-crud-single
        relatedId="1"
        layout="sidebar"
        .config="${this.config}"
      ></dile-crud-single>
    `;
  }
}
customElements.define('demo-country-single-groups', DemoCountrySingleGroups);
</script>
<demo-country-single-groups></demo-country-single-groups>
```