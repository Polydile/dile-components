---
title: Input Tags
package: '@dile/ui'
element: '&lt;dile-input-tags&gt;'
status: stable
summary: Tags editor with suggestions. Shows the assigned tags as chips and emits events to add or remove them (controlled component).
tags: forms
---

# dile-input-tags

Tags editor: the assigned tags are shown as [dile-chip](/components/dile-chip/) above a text field with suggestions. Typing adds a new tag, choosing a suggestion or writing it by hand.

It is a **controlled** component: it never changes its `tags` property by itself. It emits `dile-input-tags-add` and `dile-input-tags-remove`, and you update `tags` (for instance, after saving the change on the server).

It extends [dile-input-suggestions](/components/dile-input-suggestions/), so it accepts the same suggestion properties. There is an Ajax variant, [dile-ajax-input-tags](/crud/ajax-input-tags/), in `@dile/crud`.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/input-tags/input-tags.js';
```

Use the component and update `tags` when it asks to add or remove one.

```html
<dile-input-tags
  name="tags"
  label="Tags"
  .tags=${this.tags}
  .suggestions=${this.knownTags}
  @dile-input-tags-add=${(e) => this.tags = [...this.tags, e.detail.item ?? { name: e.detail.text }]}
  @dile-input-tags-remove=${(e) => this.tags = this.tags.filter((tag) => tag !== e.detail.item)}
></dile-input-tags>
```

```html:preview
<script type="module">
  import '@dile/ui/components/input-tags/input-tags.js';
  const field = document.getElementById('tagsDemo');
  field.suggestions = [{ name: 'Madrid' }, { name: 'Málaga' }, { name: 'VIP', color: '#fde68a' }, { name: 'Wholesale' }];
  field.tags = [{ name: 'VIP', color: '#fde68a' }];
  field.addEventListener('dile-input-tags-add', (e) => {
    field.tags = [...field.tags, e.detail.item ?? { name: e.detail.text }];
  });
  field.addEventListener('dile-input-tags-remove', (e) => {
    field.tags = field.tags.filter((tag) => tag !== e.detail.item);
  });
</script>
<dile-input-tags id="tagsDemo" name="tags" label="Tags" colorProperty="color" delay="100" placeholder="Type a tag and press Enter"></dile-input-tags>
```

## Adding and removing

- Choosing a suggestion (click, or arrows + Enter) emits `dile-input-tags-add` with the object in `item`.
- **Enter** with no highlighted suggestion, or the **+** button, emits `dile-input-tags-add` with the typed `text` and `item: null`.
- Nothing is emitted if the text is empty or an equal tag is already assigned (ignoring case and accents). Already assigned tags are not suggested.
- The remove button of each chip (click, or Enter / Space / Delete / Backspace while focused) emits `dile-input-tags-remove`. Its accessible name is `removeLabel` + the tag text ("Remove Madrid"), and the focus goes back to the field.
- **Backspace** with an empty field asks to remove the last tag.

## Properties

- **tags**: Array of objects, the assigned tags. Their text comes from `getOptionText` or `displayProperty`, like the suggestions.
- **colorProperty**: String, name of the property of each tag with its color (e.g. `"color"`). When a tag has it, its chip uses it as background, with dark text. Empty by default.
- **removeLabel**: String (default `"Remove"`), text of each chip remove button, before the tag text.
- **addLabel**: String (default `"Add tag"`), accessible name of the + button.
- **tagsLabel**: String (default `"Assigned tags"`), accessible name of the tags list.
- **addedAnnouncement** / **removedAnnouncement**: Functions `(text) => string`, texts announced to screen readers when `tags` changes.
- Plus every [dile-input-suggestions](/components/dile-input-suggestions/) property. `minLength` defaults to `1`.

To color the chips with other rules, extend the component and override `tagChipStyle(tag)`, which returns the inline style of each chip.

## Events

- **dile-input-tags-add**: `detail: { name, text, item }`. `item` is the chosen suggestion, or `null` when typed by hand.
- **dile-input-tags-remove**: `detail: { name, item }`.

It does not emit `dile-input-suggestions-selected`.

## Styling

Custom property | Description | Default
----------------|-------------|---------
--dile-input-tags-gap | Space between tags | 0.4rem
--dile-input-tags-margin-bottom | Space between the tags and the field | 0.5rem
--dile-input-tags-add-color | Color of the + icon | var(--dile-input-color, #303030)
--dile-input-tags-add-size | Size of the + icon | 20px
--dile-input-tags-colored-text-color | Text and icon color of the chips with their own color | #1f2937

The chips use the [dile-chip](/components/dile-chip/) custom properties (`--dile-chip-*`), and each one is exposed as the `tag` part.
