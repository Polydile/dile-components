---
title: List Item
package: '@dile/ui'
element: '&lt;dile-list-item&gt;'
status: experimental
summary: Modular layout component for list items with slots, density control, line clamping, icons, and keyboard accessibility.
tags: layout
---

# dile-list-item

Web Component designed to easily create structured, accessible, and highly customizable list items.

It follows the **Leading (Prefix) → Content (Default) → Trailing (Suffix)** anatomy, supporting density presets, multi-line clamping, inset/full dividers, `@dile/iconlib` string properties, and keyboard-accessible navigation and button modes.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/list/list-item.js';
```

Use the component:

```html:preview
<script type="module">
  import '@dile/ui/components/list/list.js';
  import '@dile/ui/components/list/list-item.js';
  import '@dile/iconlib/lucide-icons/user.js';
  import '@dile/iconlib/lucide-icons/chevron-right.js';
  import '@dile/iconlib/lucide-icons/mail.js';
  import '@dile/iconlib/lucide-icons/star.js';
</script>

<dile-list style="max-width: 500px;" divider="full">
  <dile-list-item icon-prefix="lucide.user" icon-suffix="lucide.chevron-right">
    Profile Settings
  </dile-list-item>
  <dile-list-item icon-prefix="lucide.mail" icon-suffix="lucide.chevron-right">
    Inbox Notifications
  </dile-list-item>
</dile-list>
```

## Slots

The component exposes slots matching the visual anatomy of list rows:

Slot | Description
-----|------------
*(default)* | Main body content (e.g. titles, descriptions, custom blocks).
`prefix` *(or `leading`)* | Reserved leading space for avatars, icons, checkboxes, or drag handles.
`suffix` *(or `trailing`)* | Reserved trailing space for timestamps, badges, action buttons, switches, or chevrons.

### Modular Slots Example

```html:preview
<style>
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #38bdf8;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.85rem;
  }
  .badge {
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
  }
</style>

<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;">
  <dile-list-item divider="inset" clickable>
    <div class="avatar" slot="prefix">ML</div>
    <div>
      <strong>Maria Lopez</strong>
      <p style="margin: 0.2rem 0 0; color: #64748b; font-size: 0.85rem;">Sent you a message</p>
    </div>
    <span slot="suffix" class="badge">1</span>
  </dile-list-item>
</div>
```

> [!NOTE]
> If you provide an icon property (`iconPrefix` / `iconSuffix`) and a slotted element (`slot="prefix"` / `slot="suffix"`) simultaneously, the **slotted element takes full precedence**.

## Properties

Property | Attribute | Type | Default | Description
---------|-----------|------|---------|------------
`density` | `density` | String | `undefined` | Controls vertical padding and gap: `'compact'`, `'comfortable'`, or `'spacious'`. When unset, it behaves as `'comfortable'`.
`lines` | `lines` | String / Number | `undefined` | Automatically truncates body text with ellipsis at N lines (`'1'`, `'2'`, or number). When unset or `'auto'`, text is not truncated.
`align` | `align` | String | `undefined` | Vertical alignment of prefix/suffix relative to content: `'center'`, `'start'`, or `'end'`. When unset, it behaves as `'center'`.
`bodyAlign` | `body-align` | String | `undefined` | Text alignment of the body content: `'left'`, `'center'`, or `'right'`. When unset, the `--dile-list-item-text-align` custom property is used (`left` by default).
`divider` | `divider` | String | `undefined` | Bottom separator line: `'full'`, `'inset'` or `'none'`. The boolean attribute `divider` is the same as `'full'`. When unset, there is no divider.
`clickable` | `clickable` | Boolean | `false` | Enables interactive button mode (`cursor: pointer`, hover/active states, `role="button"`, `Enter`/`Space` activation).
`href` | `href` | String | `undefined` | Destination URL. When defined, renders an accessible native `<a>` tag inside (without `href` while the item is disabled).
`target` | `target` | String | `undefined` | Target frame for the link (e.g. `'_blank'`).
`iconPrefix` | `icon-prefix` | String | `''` | `@dile/iconlib` icon identifier for the prefix slot in `"family.name"` format.
`iconSuffix` | `icon-suffix` | String | `''` | `@dile/iconlib` icon identifier for the suffix slot in `"family.name"` format.
`disabled` | `disabled` | Boolean | `false` | Disables interaction, applies `aria-disabled="true"`, and sets `tabindex="-1"`.
`selected` | `selected` | Boolean | `false` | Applies selection highlight styling. Exposed as `aria-selected` when the item is an option (inside a list in selection mode), or as `aria-current="true"` otherwise.
`expanded` | `expanded` | Boolean | `undefined` | Reflects `aria-expanded` when the item acts as a disclosure trigger.
`value` | `value` | String | `undefined` | Value associated with the list item (used by `<dile-list>` for selection).
`itemTabindex` | `item-tabindex` | Number | `0` | Inner focusable element `tabindex` (managed by `<dile-list>` for roving tabindex).

## Density & Alignment

```html:preview
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;">
  <dile-list-item density="compact" icon-prefix="lucide.star" divider="full">
    Compact item density
  </dile-list-item>
  <dile-list-item density="comfortable" icon-prefix="lucide.star" divider="full">
    Comfortable item density (default)
  </dile-list-item>
  <dile-list-item density="spacious" icon-prefix="lucide.star">
    Spacious item density
  </dile-list-item>
</div>
```

The `align` attribute (`start`, `center`, `end`) sets the **vertical alignment of the prefix and suffix elements** without affecting the body content, whose horizontal alignment is controlled separately with `body-align`:

```html:preview
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;">
  <dile-list-item align="start" icon-prefix="lucide.user" icon-suffix="lucide.chevron-right" divider="inset">
    <div>
      <strong>align="start"</strong>
      <p style="margin: 0.25rem 0 0; color: #64748b; font-size: 0.85rem;">
        The prefix and suffix align to the top of the body block.
      </p>
    </div>
  </dile-list-item>
  <dile-list-item align="center" icon-prefix="lucide.user" icon-suffix="lucide.chevron-right" divider="inset">
    <div>
      <strong>align="center"</strong>
      <p style="margin: 0.25rem 0 0; color: #64748b; font-size: 0.85rem;">
        The prefix and suffix align to the vertical center of the item.
      </p>
    </div>
  </dile-list-item>
  <dile-list-item align="end" icon-prefix="lucide.user" icon-suffix="lucide.chevron-right">
    <div>
      <strong>align="end"</strong>
      <p style="margin: 0.25rem 0 0; color: #64748b; font-size: 0.85rem;">
        The prefix and suffix align to the bottom of the item.
      </p>
    </div>
  </dile-list-item>
</div>
```

To adjust the horizontal alignment of the body text, use `body-align="left|center|right"` or the `--dile-list-item-text-align` CSS property.

## Line Clamping

Truncate text automatically using `lines="1"` or `lines="2"`:

```html:preview
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 450px;">
  <dile-list-item lines="1" icon-prefix="lucide.mail" divider="full">
    lines="1": This is an extremely long subject line that gets truncated cleanly with ellipsis.
  </dile-list-item>
  <dile-list-item lines="2" icon-prefix="lucide.mail">
    lines="2": This message body preview contains multiple sentences spanning across several lines, and will be automatically clamped at line 2.
  </dile-list-item>
</div>
```

## Custom Events

Event | Detail | Description
------|--------|------------
`dile-list-item-click` | `{ item: DileListItem, value: string, href: string, selected: boolean }` | Dispatched when an enabled interactive item (`clickable`, `href`, or an option inside a selection list) is clicked or activated by keyboard (<kbd>Enter</kbd> / <kbd>Space</kbd>).

> [!TIP]
> **Secondary Action Isolation**: Clicks and keys on interactive controls placed anywhere inside the item (prefix, body or suffix), such as `<button>`, `<input>`, `<label>`, `<a>`, elements with `tabindex` or an interactive `role`, or nested `<dile-list-item>` elements, do **not** trigger `dile-list-item-click` on the parent item. Those controls keep their own behaviour.

## Accessibility

- By default the host has `role="listitem"`. A `clickable` item renders an inner element with `role="button"` that receives the focus; an item with `href` renders a native link.
- When the host role is `option` or `menuitem` (assigned automatically by `<dile-list>` in selection mode, or set by you), the host itself becomes the focusable element and carries `aria-selected` (options), `aria-disabled`, `aria-expanded` and `tabindex`.
- <kbd>Enter</kbd> activates the item. <kbd>Space</kbd> activates it on key release and never scrolls the page.
- Disabled items are removed from the tab order and expose `aria-disabled="true"`.

## CSS Shadow Parts

Part | Description
-----|------------
`item` | Root container element (`<a>` or `<div>`).
`prefix` | Container wrapping the prefix slot.
`content` | Content area wrapper (contains `body` and `suffix`).
`body` | Main body container (where `lines` clamp is applied).
`suffix` | Container wrapping the suffix slot.

```css
dile-list-item::part(prefix) {
  padding: 0.5rem;
  background-color: #f1f5f9;
  border-radius: 6px;
}

dile-list-item::part(body) {
  font-family: inherit;
}
```

## CSS Custom Properties

Custom Property | Description | Default
----------------|-------------|--------
`--dile-list-item-bg` | Background color | `transparent`
`--dile-list-item-bg-hover` | Background color on hover | `--dile-surface-hover-color` or `#f5f5f5`
`--dile-list-item-bg-active` | Background color on active | `--dile-surface-active-color` or `#ebebeb`
`--dile-list-item-bg-selected` | Background color when selected | `#e0f2fe`
`--dile-list-item-color` | Text color | `inherit`
`--dile-list-item-selected-text-color` | Text color when selected | `--dile-primary-dark-color` or `#0369a1`
`--dile-list-item-text-align` | Body text alignment (`left`, `center`, `right`) | `left`
`--dile-list-item-padding-y` | Vertical padding | `0.75rem` *(varies by density)*
`--dile-list-item-padding-x` | Horizontal padding | `1rem` *(varies by density)*
`--dile-list-item-gap` | Gap between slots and content | `0.75rem` *(varies by density)*
`--dile-list-item-border-radius` | Border radius | `4px`
`--dile-list-item-divider-color` | Divider border color | `#e5e7eb`
`--dile-list-item-divider-width` | Divider border width | `1px`
`--dile-list-item-divider-style` | Divider border style | `solid`
`--dile-list-item-icon-size` | Size for dile-iconlib icons | `1.25rem`
`--dile-list-item-icon-color` | Color for dile-iconlib icons | `currentColor`
`--dile-list-item-selected-icon-color` | Color for dile-iconlib icons when selected | `--dile-list-item-selected-text-color` or `currentColor`
`--dile-list-item-prefix-align` | Vertical alignment (`align-self`) of the prefix, overriding `align` | *value of `align`*
`--dile-list-item-suffix-align` | Vertical alignment (`align-self`) of the suffix, overriding `align` | *value of `align`*
`--dile-list-item-transition-duration` | Duration of background and color transitions | `0.15s`
`--dile-list-item-disabled-opacity` | Opacity when disabled | `0.5`
`--dile-list-item-focus-ring-color` | Focus ring outline color | `#0284c7`
`--dile-list-item-focus-ring-width` | Focus ring outline width | `2px`
`--dile-list-item-focus-ring-offset` | Focus ring outline offset | `-2px`
