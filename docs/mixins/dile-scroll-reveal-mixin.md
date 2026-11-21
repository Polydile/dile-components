---
title: Scroll Reveal
tags: effects
element: DileScrollRevealMixin
package: '@dile/ui'
status: experimental
summary: Reveals elements marked with data-reveal attributes progressively while scrolling, using IntersectionObserver, with groups, stagger and reduced-motion support.
---

# DileScrollRevealMixin

Use this mixin to reveal elements progressively as the user scrolls. It finds the `[data-reveal]` and `[data-reveal-group]` elements inside a root (your component's shadow DOM by default), hides the ones below the fold and reveals them with a transition when they enter the viewport, using `IntersectionObserver`.

If you want to reveal the elements of a whole page, use the [dile-scroll-reveal](/components/dile-scroll-reveal/) component, which applies this mixin to the document.

## Installation

```bash
npm i @dile/ui
```

## Usage

Extend your component with the mixin and include `revealStyles` in its styles:

```javascript
import { LitElement, html } from 'lit';
import { DileScrollRevealMixin, revealStyles } from '@dile/ui/mixins/scroll-reveal';

class MyLanding extends DileScrollRevealMixin(LitElement) {
  static styles = [revealStyles];

  render() {
    return html`
      <h2 data-reveal>Fades in moving up</h2>
      <ul data-reveal-group>
        <li data-reveal="from-right">First</li>
        <li data-reveal="from-right">Second</li>
      </ul>
    `;
  }
}
```

The mixin starts after the first render and disconnects every observer when the component is removed from the page (it starts again if it is reconnected).

To orchestrate another root, override the `revealRoot` getter:

```javascript
get revealRoot() {
  return document;
}
```

## Markup API

Attribute | Description
----------|------------
`data-reveal` | The element fades in moving up.
`data-reveal="from-right"` / `data-reveal="from-left"` | The element enters from the right / left.
`data-reveal="trigger"` | The element is never hidden; it only gets the revealed state so your CSS can animate whatever you want.
`data-reveal-offset="0.6"` | Overrides `offset` for this element or group (from `0` to less than `1`).
`data-reveal-group` | On a container: it decides when its sequence starts (using its own offset). Its descendant `[data-reveal]` elements are then revealed one after another in time, in document order, without waiting for more scroll.
`data-reveal-stagger="300"` | On a group: milliseconds between its children. Defaults to `groupStagger`.
`data-reveal-media="all"` | Overrides the enabling `media` query for this element or group.

Elements inside a group are driven by the group: they are not observed individually and their `data-reveal-offset` / `data-reveal-media` are ignored. Loose elements revealed in the same batch are staggered by `stagger` ms in document order. Each element is revealed only once. One `IntersectionObserver` is created per distinct offset.

Elements already past their offset line when the mixin starts are revealed immediately, without animation and before anything is hidden, so nothing flickers.

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `media` | `String` | `"(min-width: 1024px)"` | Media query that enables the effect. When it doesn't match, elements are simply visible. Changing it re-evaluates the pending elements. |
| `offset` | `Number` | `0.15` | Fraction of the viewport height, from the bottom, an element must have entered before it is revealed. |
| `stagger` | `Number` | `140` | Milliseconds between loose elements revealed in the same batch. |
| `groupStagger` | `Number` | `220` | Default milliseconds between the children of a group. Exposed via `group-stagger`. |
| `watch` | `Boolean` | `false` | Watches the root with a `MutationObserver` to pick up elements added later (AJAX content, Lit re-renders, tab switches). |

## Getters

- **revealRoot**: Node whose descendants are revealed. Defaults to the component's render root (`shadowRoot`, or the host when it renders in light DOM).

## Methods

- **refreshReveal()**: Rescans the root to prepare new elements and re-evaluates pending ones against their media queries. Call it after rendering new `data-reveal` content when `watch` is off.
- **revealAll()**: Shows every managed element immediately and stops observing.

## States and styles

The mixin sets these on each managed element:

- `data-reveal-state="pending"`: hidden, waiting to be revealed. Only set when the effect is enabled for that element.
- `data-reveal-state="revealed"`: visible.
- `--dile-reveal-delay`: computed delay in ms, to be used as `transition-delay`.

`revealStyles` is a Lit `css` result with the base hide/show styles keyed on `[data-reveal-state]`; `trigger` elements are never hidden by it. The state lives on the elements themselves, so it works inside shadow DOM. Add your own rules on `[data-reveal-state="pending"]` / `[data-reveal-state="revealed"]` for project-specific effects.

## Reduced motion

When the user has `prefers-reduced-motion: reduce` enabled, nothing is hidden or animated and every element is visible, regardless of `media` or `data-reveal-media`. The same happens when `IntersectionObserver` is not available.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-reveal-duration | Duration of the reveal transition | 0.7s
--dile-reveal-easing | Easing of the movement | cubic-bezier(0.22, 1, 0.36, 1)
--dile-reveal-distance | Vertical distance travelled by `data-reveal` elements | 1.75rem
--dile-reveal-distance-x | Horizontal distance travelled by `from-right` / `from-left` elements | 2.5rem
--dile-reveal-delay | Set by the mixin on each element; used as transition delay | 0ms

## DileScrollRevealMixin demos

The effect is enabled at `(min-width: 1024px)` by default; this demo sets `media="all"` so it also works on small screens. Scroll down to see it.

### Reveal inside a component

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { DileScrollRevealMixin, revealStyles } from '@dile/ui/mixins/scroll-reveal/index.js';

  class ScrollRevealMixinDemo extends DileScrollRevealMixin(LitElement) {
    static styles = [
      revealStyles,
      css`
        :host {
          display: block;
          --dile-reveal-distance-x: 6rem;
        }
        section article {
          max-width: 320px;
        }
        article {
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: #eef4ff;
        }
      `,
    ];

    render() {
      return html`
        <article data-reveal>Revealed inside the shadow DOM of this component.</article>
        <section data-reveal-group data-reveal-stagger="250">
          <article data-reveal="from-left">Grouped 1</article>
          <article data-reveal="from-left">Grouped 2</article>
          <article data-reveal="from-left">Grouped 3</article>
        </section>
        <button type="button" @click=${() => this.revealAll()}>Reveal all</button>
      `;
    }
  }

  customElements.define('scroll-reveal-mixin-demo', ScrollRevealMixinDemo);
</script>
<scroll-reveal-mixin-demo media="all"></scroll-reveal-mixin-demo>
```
