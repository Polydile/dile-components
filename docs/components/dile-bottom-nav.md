---
title: Bottom Nav
package: '@dile/ui'
element: '&lt;dile-bottom-nav&gt;'
status: experimental
summary: Mobile bottom navigation bar fixed to the viewport, with icon items, selection state and items that open a bottom sheet menu.
tags: menu
---

# dile-bottom-nav

Web Component to create the navigation bar placed at the bottom of mobile apps. Each option shows an icon and a label, one of them can be marked as selected and some of them can open a bottom sheet that slides up from the bottom of the screen.

The bar is `position: fixed` at the bottom of the viewport by default. It is designed for narrow screens, but it works in any layout.

This package contains two components: `dile-bottom-nav`, the bar itself, and `dile-bottom-nav-item`, each of its options.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component. This also registers `dile-bottom-nav-item`.

```javascript
import '@dile/ui/components/bottom-nav/bottom-nav.js';
```

Import the glyphs of the icons you use, from [@dile/iconlib](/icons/dile-iconlib/).

```javascript
import '@dile/iconlib/lucide-icons/house.js';
import '@dile/iconlib/lucide-icons/search.js';
import '@dile/iconlib/lucide-icons/plus.js';
```

Use the component.

```html
<dile-bottom-nav attrForSelected="name" selected="home">
  <dile-bottom-nav-item name="home" label="Home" icon="lucide.house" href="/"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="search" label="Search" icon="lucide.search"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="create" label="Create" icon="lucide.plus">
    <a href="/playlist/new" data-close>New playlist</a>
    <a href="/blend" data-close>Blend</a>
  </dile-bottom-nav-item>
</dile-bottom-nav>
```

An item without content behaves as a regular navigation option: clicking it selects it. An item with content (any element or text in its default slot) opens that content in a bottom sheet instead, and does not change the selection.

> **Note:** The fixed bar covers the bottom of the page. Add a `padding-bottom` to your page body (around the bar height) so the last content is not hidden behind it.

### Icons

Icons work like in [dile-iconlib](/icons/dile-iconlib/) or [dile-icon-badge](/icons/dile-icon-badge/): the `icon` attribute is a string with the `"family.name"` format (e.g. `"lucide.house"`, `"material.star"`), so you can declare it directly in the HTML, without assigning it from JavaScript.

The icon glyphs are not included in the component: import separately each icon you use.

```javascript
import '@dile/iconlib/lucide-icons/house.js';
```

```html
<dile-bottom-nav-item label="Home" icon="lucide.house"></dile-bottom-nav-item>
```

Supported icon families are the ones documented in [dile-iconlib](/icons/dile-iconlib/): `lucide`, `material`, `fontawesome`, `phosphor`, `tabler` and `remixicon`. To find the name of an icon, search the [Icon Catalog](/icons/icon-catalog/).

The close icon displayed while the sheet is opened (`lucide.x` by default) is already imported by the component. If you change it with the `close-icon` attribute, import its glyph too.

If you need another kind of icon, place any element in the `icon` slot of the item:

```html
<dile-bottom-nav-item label="Profile">
  <img slot="icon" src="/avatar.png" alt="" width="24" height="24">
</dile-bottom-nav-item>
```

## Properties

### dile-bottom-nav properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `String` | `undefined` | Currently selected item. By default it is the index of the item (starting at 0). If `attrForSelected` is set, it is the value of that attribute. |
| `attrForSelected` | `String` | `undefined` | Name of the item attribute used to match the `selected` value, usually `name`. |
| `selectorId` | `String` | `undefined` | Links the bar with a [dile-pages](/components/dile-pages/) component that has the same `selectorId`, so the page changes when an item is selected. |
| `hashSelection` | `Boolean` | `false` | Connects the selection with the URL hash. |
| `static` | `Boolean` | `false` | If true, the bar is rendered in the document flow (`position: relative`) instead of being fixed at the bottom of the viewport. |
| `label` | `String` | `"Main navigation"` | Accessible name of the navigation landmark. |

### dile-bottom-nav-item properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `String` | `""` | Icon of the item, in the [dile-iconlib](/icons/dile-iconlib/) `"family.name"` format (e.g. `"lucide.house"`). The glyph must be imported separately. |
| `label` | `String` | `""` | Text displayed under the icon. Also used as the accessible name of the bottom sheet. |
| `name` | `String` | `undefined` | Item identifier, used with `attrForSelected="name"` and sent in the events detail. |
| `href` | `String` | `undefined` | If set, the item is rendered as a native link. Ignored when the item has a bottom sheet. |
| `target` | `String` | `undefined` | Target of the native link. |
| `selected` | `Boolean` | `false` | Selected status. Managed by `dile-bottom-nav`. |
| `opened` | `Boolean` | `false` | Opened status of the bottom sheet. |
| `selectable` | `Boolean` | `false` | If true, an item with a bottom sheet also becomes selected when it is clicked. |
| `closeOnClick` | `Boolean` | `false` | If true, the bottom sheet closes when any link or button inside it is clicked. Exposed via `close-on-click`. |
| `closeIcon` | `String` | `"lucide.x"` | Icon displayed in the item, inside a circle, while its bottom sheet is opened, in the `"family.name"` format. Clicking it closes the sheet. Exposed via `close-icon`. |
| `verticalAlign` | `String` | `"top"` | Static bar only. Vertical position of the floating sheet relative to the item: `top`, `bottom` or `center`. |
| `horizontalAlign` | `String` | `"center"` | Static bar only. Horizontal position of the floating sheet relative to the item: `center`, `under_left`, `under_right`, `left` or `right`. |
| `moveTop` | `Number` | `-8` | Static bar only. Pixels to move the floating sheet vertically. The default leaves an 8px gap above the item. |
| `moveLeft` | `Number` | `0` | Static bar only. Pixels to move the floating sheet horizontally. |

## Fixed and static bars

How the bottom sheet opens depends on the bar:

- **Fixed bar** (default): the sheet is a full width floating card right above the bar, with a dark overlay over the page. The page scroll is locked while it is opened, compensating the scrollbar width so neither the page nor the bar items move.
- **Static bar** (`static` attribute): the sheet is a floating card of fixed width (`--dile-bottom-nav-sheet-width`), placed above the item and centered with it, without overlay and without locking the page scroll. If the card does not fit in the viewport it is moved to stay inside. The positioning is done by the [DileOverlay mixin](/components/dile-menu-overlay/), so the alignment can be changed with `verticalAlign`, `horizontalAlign`, `moveTop` and `moveLeft`.

## Closing the bottom sheet

The bottom sheet closes when the user:

- Clicks the close icon of the item that opened it.
- Clicks the dark overlay behind the sheet (fixed bar).
- Clicks anywhere outside the sheet (static bar).
- Presses the `Escape` key.
- Clicks an element with the `data-close` attribute inside the sheet.
- Clicks any link or button inside the sheet, if the item has the `close-on-click` attribute.
- Opens the bottom sheet of another item (only one sheet is opened at a time).

In both cases the bar stays visible while the sheet is opened, and the item that opened the sheet replaces its icon and label with a close icon.

## Changing pages with dile-pages

`dile-bottom-nav` works with [dile-pages](/components/dile-pages/) the same way as [dile-tabs](/components/dile-tabs/): give both components the same `selectorId` and the page changes when an item is selected. Items with a bottom sheet do not change the page, because they don't change the selection.

```html
<dile-pages selectorId="appnav" attrForSelected="name" selected="home">
  <section name="home">Home page</section>
  <section name="search">Search page</section>
</dile-pages>

<dile-bottom-nav selectorId="appnav" attrForSelected="name" selected="home">
  <dile-bottom-nav-item name="home" label="Home" icon="lucide.house"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="search" label="Search" icon="lucide.search"></dile-bottom-nav-item>
</dile-bottom-nav>
```

This also works inside other components. See the demo below with the bar in the footer of a [dile-card](/components/dile-card/).

## Methods

These methods are available in `dile-bottom-nav-item`:

- **open()**: Opens the bottom sheet. Does nothing if the item has no slotted content.
- **close()**: Closes the bottom sheet.
- **toggle()**: Opens or closes the bottom sheet.

## Events

- **dile-selected-changed**: Dispatched by `dile-bottom-nav` when the selected item changes. `detail` contains `{ selected, selectorId, initializationEvent }`.
- **dile-bottom-nav-item-click**: Dispatched by an item when it is clicked, with or without bottom sheet. `detail` contains `{ name, item }`.
- **dile-bottom-nav-sheet-opened**: Dispatched by an item when its bottom sheet opens. `detail` contains `{ name, item }`.
- **dile-bottom-nav-sheet-closed**: Dispatched by an item when its bottom sheet closes. `detail` contains `{ name, item }`.

```javascript
document.querySelector('dile-bottom-nav').addEventListener('dile-selected-changed', (e) => {
  console.log('Selected item:', e.detail.selected);
});
```

## Slots

### dile-bottom-nav slots

- **main slot** (unnamed slot): the `dile-bottom-nav-item` elements.

### dile-bottom-nav-item slots

- **main slot** (unnamed slot): content of the bottom sheet. If it is empty, the item has no bottom sheet.
- **icon slot**: custom icon element, replacing the `icon` property.

## CSS Custom Properties

### dile-bottom-nav

Custom property | Description | Default
----------------|-------------|---------
--dile-bottom-nav-background-color | Bar background color | --dile-background-color or #fff
--dile-bottom-nav-height | Bar height (without the device safe area) | 56px
--dile-bottom-nav-max-width | Max width of the items area | none
--dile-bottom-nav-border-top | Bar top border | 1px solid rgba(0, 0, 0, 0.1)
--dile-bottom-nav-box-shadow | Bar shadow | 0 -2px 8px rgba(0, 0, 0, 0.08)
--dile-bottom-nav-z-index | Bar z-index | 100

### dile-bottom-nav-item

Custom property | Description | Default
----------------|-------------|---------
--dile-bottom-nav-item-color | Icon and label color | --dile-on-background-color or #666
--dile-bottom-nav-item-selected-color | Icon and label color of the selected item | --dile-secondary-color or #039be5
--dile-bottom-nav-item-padding | Item padding | 4px 2px
--dile-bottom-nav-item-gap | Space between icon and label | 2px
--dile-bottom-nav-icon-size | Icon size | 24px
--dile-bottom-nav-label-font-size | Label font size | 0.75rem
--dile-bottom-nav-label-font-weight | Label font weight | normal
--dile-bottom-nav-label-selected-font-weight | Label font weight of the selected item | bold
--dile-bottom-nav-close-icon-size | Size of the close icon circle displayed while the sheet is opened | 44px
--dile-bottom-nav-close-icon-background-color | Background of the close icon circle | --dile-bottom-nav-item-selected-color or --dile-secondary-color or #039be5
--dile-bottom-nav-close-icon-color | Color of the close icon | --dile-bottom-nav-background-color or --dile-background-color or #fff
--dile-bottom-nav-overlay-background-color | Overlay color behind the sheet | rgba(0, 0, 0, 0.5)
--dile-bottom-nav-sheet-background-color | Sheet background color | --dile-background-color or #fff
--dile-bottom-nav-sheet-text-color | Sheet text color | --dile-on-background-color or #303030
--dile-bottom-nav-sheet-max-width | Sheet max width (fixed bar) | none
--dile-bottom-nav-sheet-width | Sheet width (static bar) | 280px
--dile-bottom-nav-sheet-max-height | Sheet max height (the content scrolls beyond it) | 75vh
--dile-bottom-nav-sheet-gap | Space between the sheet and the bar and the screen edges (fixed bar) | 8px
--dile-bottom-nav-sheet-border-radius | Sheet border radius | 12px
--dile-bottom-nav-sheet-box-shadow | Sheet shadow | 0 -4px 16px rgba(0, 0, 0, 0.2)
--dile-bottom-nav-sheet-padding | Sheet padding | 1rem

## Accessibility

- The bar is a `<nav>` landmark named with the `label` property.
- Items are native buttons (or links when `href` is set). The selected item has `aria-current="page"`.
- Items with a bottom sheet have `aria-haspopup="dialog"` and `aria-expanded`.
- While the sheet is opened, the item label is visually hidden but kept for screen readers.
- The sheet is a dialog named with the item `label`, modal (`aria-modal="true"`) with the fixed bar and non modal with the static bar. It receives the focus when it opens, and the focus returns to the item when it closes. It is `inert` while closed.
- Animations are disabled when the user prefers reduced motion.

## dile-bottom-nav demos

The demos use the `static` attribute so the bar is displayed inside the page, and the sheets open as floating cards over the items. Remove it to fix the bar at the bottom of the viewport.

### Basic usage

```html:preview
<script type="module">
  import '@dile/ui/components/bottom-nav/bottom-nav.js';
  import '@dile/iconlib/lucide-icons/house.js';
  import '@dile/iconlib/lucide-icons/search.js';
  import '@dile/iconlib/lucide-icons/heart.js';
  import '@dile/iconlib/lucide-icons/settings.js';
  import '@dile/iconlib/lucide-icons/plus.js';
  import '@dile/iconlib/lucide-icons/library.js';
</script>
<dile-bottom-nav static attrForSelected="name" selected="home">
  <dile-bottom-nav-item name="home" label="Home" icon="lucide.house"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="search" label="Search" icon="lucide.search"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="favorites" label="Favorites" icon="lucide.heart"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="settings" label="Settings" icon="lucide.settings"></dile-bottom-nav-item>
</dile-bottom-nav>
```

### Items with bottom sheet

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';

  class BottomNavSheetDemo extends LitElement {
    static properties = { selected: { type: String } };
    static styles = css`
      a {
        display: block;
        padding: 0.9rem 0.25rem;
        color: inherit;
        text-decoration: none;
        border-bottom: 1px solid #eee;
      }
    `;
    constructor() {
      super();
      this.selected = 'home';
    }
    render() {
      return html`
        <dile-bottom-nav static attrForSelected="name" selected="home"
          @dile-selected-changed=${e => this.selected = e.detail.selected}>
          <dile-bottom-nav-item name="home" label="Home" icon="lucide.house"></dile-bottom-nav-item>
          <dile-bottom-nav-item name="search" label="Search" icon="lucide.search"></dile-bottom-nav-item>
          <dile-bottom-nav-item name="create" label="Create" icon="lucide.plus" close-on-click>
            <a href="#playlist">New playlist</a>
            <a href="#blend">Blend</a>
            <a href="#jam">Jam</a>
          </dile-bottom-nav-item>
          <dile-bottom-nav-item name="settings" label="Settings" icon="lucide.settings">
            <h3>Settings</h3>
            <p>Any content can be placed in the bottom sheet.</p>
            <button data-close>Done</button>
          </dile-bottom-nav-item>
        </dile-bottom-nav>
        <p>Selected: <b>${this.selected}</b></p>
      `;
    }
  }
  customElements.define('bottom-nav-sheet-demo', BottomNavSheetDemo);
</script>
<bottom-nav-sheet-demo></bottom-nav-sheet-demo>
```

### Inside a dile-card with dile-pages

The bar is placed in the `footer` slot of the card, with the `static` attribute, and changes the card pages through the shared `selectorId`. Some card CSS custom properties and negative margins make the bar fill the card footer edge to edge.

```html:preview
<script type="module">
  import '@dile/ui/components/card/card.js';
  import '@dile/ui/components/pages/pages.js';
</script>
<style>
  .nav-card {
    max-width: 380px;
    --dile-card-footer-padding-top: 0;
    --dile-card-footer-border-separator: none;
  }
  .nav-card dile-bottom-nav {
    margin: 0 calc(-1 * var(--dile-card-padding-x, 1rem)) calc(-1 * var(--dile-card-padding-y, 1rem));
    --dile-bottom-nav-box-shadow: none;
    /* Same colors as the card, whatever the page theme is. */
    --dile-bottom-nav-background-color: var(--dile-card-background-color, #fff);
    --dile-bottom-nav-item-color: var(--dile-card-text-color, #303030);
  }
  .nav-card dile-pages {
    min-height: 140px;
  }
  .nav-card h3 {
    margin-top: 0;
  }
  .nav-card-menu a {
    display: block;
    padding: 0.9rem 0.25rem;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid #eee;
  }
  .nav-card-menu a:last-child {
    border-bottom: none;
  }
</style>
<dile-card class="nav-card" title="My music">
  <dile-pages selectorId="cardnav" attrForSelected="name" selected="home">
    <section name="home">
      <h3>Home</h3>
      <p>Your recently played playlists and recommendations.</p>
    </section>
    <section name="search">
      <h3>Search</h3>
      <p>Find songs, artists and podcasts.</p>
    </section>
    <section name="library">
      <h3>Your library</h3>
      <p>Saved playlists, albums and episodes.</p>
    </section>
  </dile-pages>
  <dile-bottom-nav slot="footer" static selectorId="cardnav" attrForSelected="name" selected="home" label="Card navigation">
    <dile-bottom-nav-item name="home" icon="lucide.house" label="Home"></dile-bottom-nav-item>
    <dile-bottom-nav-item name="search" icon="lucide.search" label="Search"></dile-bottom-nav-item>
    <dile-bottom-nav-item name="library" icon="lucide.library" label="Library"></dile-bottom-nav-item>
    <dile-bottom-nav-item name="create" icon="lucide.plus" label="Create" close-on-click>
      <nav class="nav-card-menu">
        <a href="#playlist">New playlist</a>
        <a href="#blend">Blend</a>
      </nav>
    </dile-bottom-nav-item>
  </dile-bottom-nav>
</dile-card>
```

### Styled bottom nav

```html:preview
<style>
  .styled-bottom-nav {
    --dile-bottom-nav-background-color: #121212;
    --dile-bottom-nav-border-top: none;
    --dile-bottom-nav-item-color: #b3b3b3;
    --dile-bottom-nav-item-selected-color: #fff;
    --dile-bottom-nav-sheet-background-color: #282828;
    --dile-bottom-nav-sheet-text-color: #fff;
  }
</style>
<dile-bottom-nav class="styled-bottom-nav" static attrForSelected="name" selected="home">
  <dile-bottom-nav-item name="home" label="Home" icon="lucide.house"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="search" label="Search" icon="lucide.search"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="library" label="Your library" icon="lucide.library"></dile-bottom-nav-item>
  <dile-bottom-nav-item name="create" label="Create" icon="lucide.plus">
    <p>Create something new.</p>
    <button data-close>Close</button>
  </dile-bottom-nav-item>
</dile-bottom-nav>
```
