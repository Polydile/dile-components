---
title: CloseOnEscPressed
tags: effects
---

# DileCloseOnEscPressed

Mixin function to create components that close themselves pressing the Esc key

Extending it the component creates keyboard listeners to react when the user press the Esc key. When that key is detected, the component closes by call a close() method on this component.

## Requirements

To properly close the element, the component which extends from this mixin needs to have a close() method, to implement it's closing behaviour.

## Installation

```bash
npm install @dile/ui
```

## Usage

Use the mixin.

```javascript
import { LitElement, html, css } from 'lit';
import { DileCloseOnEscPressed } from '@dile/ui/mixins/close-on-esc-pressed';

class NewComponent  extends DileCloseOnEscPressed(LitElement) {

}
```



