# @dile/dile-slide-down-mixin

Mixin to create slidedown / slideup effects in Web Components, useful to easily hide or show elements with a smooth animation.

Extending it, provides two methods to your component:

- **slideShow(elem, targetHeight = '0px')**: slideShow creates a slide-down animation in the element passed in by the first parameter.
- **slideHide(elem, targetHeight='0px')**: slideHide creates a slide-up animation in the element passed in by the first parameter.

The second argument is useful when you don't want to hide completely the element. In that cases you can pass targetHeight value with the pixel unit to leave this portion of the element visible.

## Requirements

To obtain a smooth animation you need to configure the transition on the animated element. Also the required ```overflow: hidden;``` to make the element not visible when the ```height``` attibute changes. This mixin does not do this for you!

```css
#element {
  transition: height 0.3s ease-in;
  overflow: hidden;
}
```

## Usage

Install

```
npm install @dile/dile-slide-down-mixin
```

Use the mixin

```
import { LitElement, html, css } from 'lit-element';
import { DileSlideDownMixin } from '@dile/dile-slide-down-mixin';

class NewComponent  extends DileSlideDownMixin(LitElement) {

}
```
