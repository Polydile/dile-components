---
title: Inline Feedback
tags: feedback
---

# dile-inline-feedback

Web component to show feedback messages to the user. 

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/inline-feedback/inline-feedback.js';
```

Use the component.

```html
<dile-inline-feedback></dile-inline-feedback>
```

## Methods

- **positiveFeedback(msg)**: Send a positive message to the user 
- **negativeFeedback(msg)**: Send a negative message to the user 
- **neutralFeedback(msg)**: Send a neutral message to the user 
- **clear()**: Clear feedback message 
- **positiveFeedbackWithDelay(msg, miliseconds)**: Send a positive message to the user and clear feedback message with a delay
- **negativeFeedbackWithDelay(msg, miliseconds)**: Send a negative message to the user and clear feedback message with a delay
- **neutralFeedbackWithDelay(msg, miliseconds)**: Send a neutral message to the user and clear feedback message with a delay

## dile-inline-feedback demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {

  render() {
    return html`
     
      <p>
        <button id="positive" @click=${this.positive}>Positive feedback</button>
        <button id="negative" @click=${this.negative}>Negative feedback</button>
        <button id="clear" @click=${this.clear}>Clear feedback</button>
      </p>
      <dile-inline-feedback></dile-inline-feedback>
    `
  }
  firstUpdated() {
    this.feedback = this.shadowRoot.querySelector('dile-inline-feedback');
  }

  positive() {
    this.feedback.positiveFeedback('This is a positive feedback');
  }

  negative() {
    this.feedback.negativeFeedback('Oh no!!! this is a negative feedback');
  }

  clear() {
    this.feedback.clear();
  }
    
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```