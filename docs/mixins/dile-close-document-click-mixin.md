---
title: CloseDocumentClick
tags: effects
---

# DileCloseDocumentClick

Mixin to close custom elements when user do a click in any area of the document.

This mixin, that you may apply to any Custom Element, offers a way to close elements when the user clicks in any area of the document.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import and extend your class.

To use it you only need to extend your custom element class with the mixin.

```javascript
import { DileCloseDocumentClick } from '@dile/ui/mixins/close-document-click';

class MyElement extends DileCloseDocumentClick(HTMLElement) {
  // your custom element code...
}
```

### Requirements

To do it's work, the mixin depends on a close() method created in your custom element class.

You need to implement the close() method on your own custom element to do the specific work to close your element.

## Available methods

The mixin also provides two utility methods implemented in your custom elements:

- **closeAll()**: Close all the elements of this type
- **closeOthers()**: Close the other items of this type (distinct to this)

## Implementatios of DileCloseDocumentClickMixin

Some components that implements DileCloseDocumentClickMixin:

- [dile-menu-overlay](/components/dile-menu-overlay)