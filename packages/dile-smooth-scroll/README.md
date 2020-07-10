# @dile/dile-smooth-scroll

Web Component to create smooth scrolls on the page document or in a element scrolling section.

This package also provides a mixin to implement scrollin API functions to any component you create.

## Installation

```bash
npm i @dile/dile-smooth-scroll
```

## Usage

Import the component.

```javascript
import '@dile/dile-smooth-scroll/dile-smooth-scroll.js';
```

Use the component

```html
<dile-smooth-scroll id="scrollComponent"></dile-smooth-scroll>
```

This component is not representational, actually provides a simple scroll API. So, you can call it's methods to create smooth scrolls in various ways. 

For example:

```javascript
// This method do a smooth scroll to the bottom of the document.
document.getElementById('scrollComponent').smoothScrollToBottom();

// This method do a smooth scroll to the top of the document.
document.getElementById('scrollComponent').smoothScrollToTop();
```

It is important to note that the component uses the Javascript native scroll API. If you need to run this component in browsers that do not support it, you will need to use a polyfill. You can find the information about [compatibility of the scroll API in Caniuse](https://caniuse.com/#feat=element-scroll-methods).

## API methods

- **smoothScrollToTop()**: Scrolls the entire document to the top.
- **smoothScrollToBottom()**: Scrolls the entire document to the bottom.
- **smoothScroll(top, left)**: Scrolls the entire document to top & left position.
- **smoothScrollBy(top, left)**: Scrolls the entire document by top & left values.
- **smoothScrollElementIntoView(element)**: Scrolls the entire document to the position of the element passed by argument.
- **smoothElementScrollTop(element)**: Scrolls a section with it's own scrolling area to the top.
- **smoothElementScrollBottom(element)**: Scrolls a section with it's own scrolling area to the bottom.
- **smoothElementScroll(element, top, left)**: Scrolls a section with it's own scrolling area to the top & left position.
- **smoothElementScrollBy(element, top, left)**: Scrolls a section with it's own scrolling area by top & left values.

## properties

- **scrollToElementOnInit**: when the scrollToElementOnInit property is set with an element ID, during the initialization progress of the component the page will scroll to the position of the element ID configured.
 
# Mixins

In this package you will find two mixins to implement the scrolling API into any component. We separate the scrolling API into two mixins because usually you only need one or other.

## DileSmoothScrollMixin

This Mixin includes all methods related to scroll the entire document area. These are:

- smoothScrollToTop
- smoothScrollToBottom
- smoothScroll
- smoothScrollBy
- smoothScrollElementIntoView

To use the mixin in a Web Component you need to extend your component with the mixin:

```javascript
import { DileSmoothScrollMixin } from '@dile/dile-smooth-scroll/DileSmoothScrollMixin';

class MyOwnComponent extends DileSmoothScrollMixin(LitElement) {
  // code of your own component
}
```

## DileSmoothScrollElementMixin

This mixin implements the methods to scroll the content of a element with it's own scrolling section.

The methods included in it are:

- smoothElementScrollTop
- smoothElementScrollBottom
- smoothElementScroll
- smoothElementScrollBy
