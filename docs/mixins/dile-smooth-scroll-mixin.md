---
title: SmoothScroll
tags: scroll
---

## DileSmoothScroll

This Mixin includes all methods related to scroll the entire document area. These are:

- smoothScrollToTop()
- smoothScrollToBottom()
- smoothScroll(top, left)
- smoothScrollBy(top, left)
- smoothScrollElementIntoView(element)

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

## Methods

### smoothScrollToTop()

Scrolls the document to the top of the page with a smooth animation.

**Parameters:** None

**Example:**

```javascript
const component = document.querySelector('my-component');
component.smoothScrollToTop();
```

### smoothScrollToBottom()

Scrolls the document to the bottom of the page with a smooth animation.

**Parameters:** None

**Example:**

```javascript
const component = document.querySelector('my-component');
component.smoothScrollToBottom();
```

### smoothScroll(top, left)

Scrolls the document to a specific position with a smooth animation.

**Parameters:**
- `top` (Number): The vertical scroll position in pixels from the top of the document.
- `left` (Number): The horizontal scroll position in pixels from the left of the document.

**Example:**

```javascript
const component = document.querySelector('my-component');
// Scroll to 500px from top and 100px from left
component.smoothScroll(500, 100);
```

### smoothScrollBy(top, left)

Scrolls the document by a relative amount (from the current position) with a smooth animation.

**Parameters:**
- `top` (Number): The number of pixels to scroll down. Use negative values to scroll up.
- `left` (Number): The number of pixels to scroll right. Use negative values to scroll left.

**Example:**

```javascript
const component = document.querySelector('my-component');
// Scroll down 300px
component.smoothScrollBy(300, 0);
// Scroll up 200px
component.smoothScrollBy(-200, 0);
```

### smoothScrollElementIntoView(element)

Scrolls an element into the viewport with a smooth animation.

**Parameters:**
- `element` (HTMLElement): The element to scroll into view.

**Example:**

```javascript
const component = document.querySelector('my-component');
const targetElement = document.getElementById('my-target');
component.smoothScrollElementIntoView(targetElement);
```
