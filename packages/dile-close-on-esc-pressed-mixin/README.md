# @dile/dile-close-on-esc-pressed-mixin

Mixin function to create components that close themselves pressing the Esc key

Extending it the component creates keyboard listeners to react when the user press the Esc key. When that key is detected, the component closes by call a close() method on this component.

## Requirements

To properly close the element, the component which extends from this mixin needs to have a close() method, to implement it's closing behaviour.

## Usage

Install

```
npm install @dile/dile-close-on-esc-pressed-mixin
```

Use the mixin

```
import { LitElement, html, css } from 'lit-element';
import { DileCloseOnEscPressed } from '@dile/dile-close-on-esc-pressed-mixin';

class NewComponent  extends DileCloseOnEscPressed(LitElement) {

}
```
