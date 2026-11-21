---
title: Scroll Reveal
package: '@dile/ui'
element: '&lt;dile-scroll-reveal&gt;'
status: experimental
summary: Page-level orchestrator that progressively reveals elements marked with data-reveal attributes while scrolling, with groups, stagger and reduced-motion support.
tags: utils
---

# dile-scroll-reveal

Web Component that reveals the elements of the page progressively as the user scrolls. Mark the elements with `data-reveal` attributes and place **one** `<dile-scroll-reveal>` anywhere in the page: it orchestrates every `[data-reveal]` and `[data-reveal-group]` element of the document.

It renders nothing visible and adds the base reveal styles to the page by itself (through `document.adoptedStyleSheets`), so you don't need to copy any CSS. It is built on top of [DileScrollRevealMixin](/mixins/dile-scroll-reveal-mixin/), which you can use instead to reveal elements inside your own component's shadow DOM.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/scroll-reveal/scroll-reveal.js';
```

Place one instance in the page and mark the elements to reveal.

```html
<dile-scroll-reveal></dile-scroll-reveal>

<h2 data-reveal>Fades in moving up</h2>
<div data-reveal="from-right">Enters from the right</div>

<ol data-reveal-group data-reveal-stagger="300">
  <li data-reveal>First</li>
  <li data-reveal>Second</li>
  <li data-reveal>Third</li>
</ol>
```

> **Note:** One component per page is the intended usage. Several instances would manage the same elements. Elements inside the shadow DOM of other components are not reached from the document; use [DileScrollRevealMixin](/mixins/dile-scroll-reveal-mixin/) in those components.

## Markup API

Attribute | Description
----------|------------
`data-reveal` | The element fades in moving up.
`data-reveal="from-right"` / `data-reveal="from-left"` | The element enters from the right / left.
`data-reveal="trigger"` | The element is never hidden; it only gets the revealed state so your CSS can animate whatever you want (e.g. drawing a line).
`data-reveal-offset="0.6"` | Overrides `offset` for this element or group (from `0` to less than `1`).
`data-reveal-group` | On a container: it decides when its sequence starts (using its own offset). Its descendant `[data-reveal]` elements are then revealed one after another in time, in document order, without waiting for more scroll.
`data-reveal-stagger="300"` | On a group: milliseconds between its children. Defaults to `groupStagger`.
`data-reveal-media="all"` | Overrides the enabling `media` query for this element or group, e.g. `"all"` to animate on mobile too.

Elements inside a group are driven by the group: they are not observed individually and their `data-reveal-offset` / `data-reveal-media` are ignored. Loose elements entering the viewport at the same time are staggered by `stagger` ms in document order. Each element is revealed only once.

Elements already past their offset line when the component starts (e.g. arriving through an anchor link) are shown immediately, without animation and before anything is hidden, so nothing flickers.

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `media` | `String` | `"(min-width: 1024px)"` | Media query that enables the effect. When it doesn't match, elements are simply visible. Elements can override it with `data-reveal-media`. |
| `offset` | `Number` | `0.15` | Fraction of the viewport height, from the bottom, an element must have entered before it is revealed. |
| `stagger` | `Number` | `140` | Milliseconds between loose elements revealed in the same batch. |
| `groupStagger` | `Number` | `220` | Default milliseconds between the children of a group. Exposed via `group-stagger`. |
| `watch` | `Boolean` | `false` | Watches the document with a `MutationObserver` to pick up elements added later (AJAX content, re-renders, tab switches). Without it, call `refreshReveal()` after adding content. |

## Methods

- **refreshReveal()**: Rescans the page to prepare new `[data-reveal]` elements and re-evaluates pending ones against their media queries.
- **revealAll()**: Shows every managed element immediately and stops observing.

## States and CSS

The component sets these on each managed element:

- `data-reveal-state="pending"`: the element is hidden, waiting to be revealed. It is only set when the effect is enabled for that element. Without JavaScript, or when the media query doesn't match, no state is set and the element is just visible.
- `data-reveal-state="revealed"`: the element is visible.
- `--dile-reveal-delay`: the delay (ms) computed for the element, to be used as `transition-delay`.

Use them to hook your own transitions, for instance a line drawn when a `trigger` element is revealed:

```css
.timeline::before {
  transform-origin: top;
}
.timeline[data-reveal-state="pending"]::before {
  transform: scaleY(0);
}
.timeline[data-reveal-state="revealed"]::before {
  transform: scaleY(1);
  transition: transform 1.6s ease var(--dile-reveal-delay, 0ms);
}
```

## Reduced motion

When the user has `prefers-reduced-motion: reduce` enabled, nothing is hidden or animated and every element is visible, regardless of `media` or `data-reveal-media`.

## CSS Custom Properties

Set them on the revealed elements or any ancestor.

Custom property | Description | Default
----------------|-------------|---------
--dile-reveal-duration | Duration of the reveal transition | 0.7s
--dile-reveal-easing | Easing of the movement | cubic-bezier(0.22, 1, 0.36, 1)
--dile-reveal-distance | Vertical distance travelled by `data-reveal` elements | 1.75rem
--dile-reveal-distance-x | Horizontal distance travelled by `from-right` / `from-left` elements | 2.5rem
--dile-reveal-delay | Set by the component on each element; used as transition delay | 0ms

## dile-scroll-reveal demos

The effect is enabled at `(min-width: 1024px)` by default, so view these demos on a wide screen (or check the `data-reveal-media="all"` one) and scroll down to see them.

### Loose elements and directions

```html:preview
<script type="module">
  import '@dile/ui/components/scroll-reveal/scroll-reveal.js';
</script>
<dile-scroll-reveal></dile-scroll-reveal>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <dile-card data-reveal>One</dile-card>
  <dile-card data-reveal>Two</dile-card>
  <dile-card data-reveal>Three</dile-card>
</div>
```

### Directions

Narrow elements and a larger `--dile-reveal-distance-x` make the horizontal entrance easy to see.

```html:preview
<div style="display: flex; justify-content: space-between; gap: 1rem; --dile-reveal-distance-x: 8rem;">
  <dile-card data-reveal="from-left" style="width: 100%; max-width: 320px;">From the left</dile-card>
  <dile-card data-reveal="from-right" style="width: 100%; max-width: 320px;">From the right</dile-card>
</div>
```

### Group with stagger and a trigger line

```html:preview
<style>
  .reveal-timeline {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0 0 0 2rem;
  }
  .reveal-timeline::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #2f6fed;
    transform-origin: top;
  }
  .reveal-timeline[data-reveal-state="pending"]::before {
    transform: scaleY(0);
  }
  .reveal-timeline[data-reveal-state="revealed"]::before {
    transform: scaleY(1);
    transition: transform 1.6s cubic-bezier(0.45, 0, 0.25, 1) var(--dile-reveal-delay, 0ms);
  }
  .reveal-timeline li {
    margin-bottom: 1rem;
  }
</style>
<div data-reveal-group data-reveal-offset="0.4" data-reveal-stagger="300">
  <p data-reveal>The group starts at 40% of the viewport; its children follow each other in time.</p>
  <ol class="reveal-timeline" data-reveal="trigger">
    <li data-reveal="from-right"><dile-card>Step 1</dile-card></li>
    <li data-reveal="from-right"><dile-card>Step 2</dile-card></li>
    <li data-reveal="from-right"><dile-card>Step 3</dile-card></li>
  </ol>
</div>
```

### Offset and media per element

```html:preview
<dile-card data-reveal data-reveal-offset="0.6">Needs more scroll before appearing (offset 0.6).</dile-card>
<dile-card data-reveal data-reveal-media="all" style="margin-top: 1rem;">Animated on any screen size.</dile-card>
```

### Styled

Both cards start together: compare the default reveal with a slow one that travels further.

```html:preview
<style>
  .slow-reveal {
    --dile-reveal-duration: 2.5s;
    --dile-reveal-distance: 6rem;
  }
</style>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <dile-card data-reveal>Default: 0.7s, 1.75rem</dile-card>
  <dile-card class="slow-reveal" data-reveal>Slow: 2.5s, 6rem</dile-card>
</div>
```
