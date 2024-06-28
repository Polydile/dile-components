---
title: SmoothScroll
tags: scroll
---

## DileSmoothScroll

This Mixin includes all methods related to scroll the entire document area. These are:

- smoothScrollToTop
- smoothScrollToBottom
- smoothScroll
- smoothScrollBy
- smoothScrollElementIntoView

## Installation

```bash
npm install @dile/utils
```

## Usage

To use the mixin in a Web Component you need to extend your component with the mixin:

```javascript
import { DileSmoothScroll } from '@dile/utils/mixins/smooth-scroll';

class MyOwnComponent extends DileSmoothScroll(LitElement) {
  // code of your own component
}
```
