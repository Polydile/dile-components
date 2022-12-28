```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/dile-smooth-scroll-mixin.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'DileSmoothScrollMixin';
```


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