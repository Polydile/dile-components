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

To obtain a smooth animation you need to configure the transition on the animated element. Also the required ```overflow: hidden;``` to make the element not visible when the ```height``` attibute changes. 

```css
#element {
  transition: height 0.3s ease-in;
  overflow: hidden;
}
```

> This mixin does not add ```overflow: hidden;``` and ```height``` CSS properties for you!

> It is important to not use an animation with more than 0.5s of duration.

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

## Implementations of DileSlideDownMixin

Example implementations of this mixin:

- [dile-slide-show](/components/dile-slide-show)