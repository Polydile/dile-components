---
title: SlideDown
tags: effects
---

# DileSlideDown

Mixin to create slidedown / slideup effects in Web Components, useful to easily hide or show elements with a smooth animation.

Extending it, provides two methods to your component:

- **slideShow(elem, targetHeight = '0px')**: slideShow creates a slide-down animation in the element passed in by the first parameter.
- **slideHide(elem, targetHeight = '0px')**: slideHide creates a slide-up animation in the element passed in by the first parameter.

The second argument is useful when you don't want to hide completely the element. In that cases you can pass targetHeight value with the pixel unit to leave this portion of the element visible.

## Requirements

To obtain a smooth animation you need to configure the transition on the animated element, targeting the `height` property specifically. Also the required ```overflow: hidden;``` to make the element not visible when the ```height``` attribute changes.

```css
.element {
  transition: height 0.3s ease-in;
  overflow: hidden;
}
```

> This mixin does not add ```overflow: hidden;``` and ```height``` CSS properties for you!

> Style the animated element with a class, not an `id`. The mixin toggles the element's inline `height`, but the CSS rule that declares the `transition` must be able to target it reliably — an `id` generated dynamically per instance (e.g. for `aria-controls`) won't match a static `id` selector in `styles`.

> Keep the transition duration to 0.5s or less. The mixin detects the real end of the animation via the `transitionend` event, but falls back to a fixed 650ms safety timer in case that event never fires (e.g. no visible height change) — a longer transition would be cut off by that fallback.

## Installation

```bash
npm install @dile/ui
```

## Usage

Use the mixin

```javascript
import { LitElement, html, css } from 'lit';
import { DileSlideDown } from '@dile/ui/mixins/slide-down';

class NewComponent  extends DileSlideDown(LitElement) {

}
```

In order to close (or show) the element you need to call the mixin methods, sending the layer DOM element.

```javascript
close() {
  let elem = this.shadowRoot.getElementById('element');
  this.slideHide(elem);
}
```

```javascript
open() {
  let elem = this.shadowRoot.getElementById('element');
  this.slideShow(elem);
}
```

## Animation locking

`slideShow` and `slideHide` are safe to call while a previous animation on the same instance is still in progress:

- A call requesting the **same direction** as the one currently animating (e.g. `slideShow` called again while already showing) is treated as redundant and ignored. This is what makes it safe to both call `slideShow`/`slideHide` directly from an `open()`/`close()` method **and** react to a property change in `updated()` — a common pattern in this library's components — without triggering the animation twice.
- A call requesting the **opposite direction** (e.g. the user toggles the component again before the current animation finished) is queued and automatically applied as soon as the current animation ends, so the element always converges to the last requested state without corrupting the in-progress transition.

The mixin exposes `this._slideAnimating` (boolean) so a component can, if desired, ignore user input (e.g. clicks) while an animation is running:

```javascript
toggle() {
  if (this._slideAnimating) return;
  this.opened = !this.opened;
}
```

This is optional — the locking/queueing described above already guarantees a consistent end state even without this guard.

## Implementations of DileSlideDownMixin

Example implementations of this mixin:

- [dile-accordion-item](/components/dile-accordion)
- [dile-card-slide](/components/dile-card-slide)
- [dile-info-box](/components/dile-info-box)
- [dile-inline-feedback](/components/dile-inline-feedback)
- [dile-message](/components/dile-message)
- [dile-slide-menu](/components/dile-slide-menu)
- [dile-slide-show](/components/dile-slide-show)
