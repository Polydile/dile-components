---
title: Floating Feedback
---

# dile-floating-feedback

Web Component that displays a floating feedback message above the component with optional icon support.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/floating-feedback/floating-feedback.js';
```

Use the component

```html
<dile-floating-feedback
  id="my-feedback"
  feedback="Success!"
  duration="1000"
>
  <button>Click me</button>
</dile-floating-feedback>

<script>
  const feedback = document.getElementById('my-feedback');
  document.querySelector('button').addEventListener('click', () => {
    feedback.show();
  });
</script>
```

## Slots

This component has one slot.

- **main slot** (unnamed slot): The element you want to anchor the floating feedback to. This element's position will be used to calculate where the feedback message appears.

## Properties

- **feedback**: Text message to display, string (optional).
- **duration**: Duration of the feedback message in milliseconds, number. Default: `1000`.
- **icon**: Icon object to display alongside the text, object (optional). Can be set via property binding `.icon`.
- **hideIcon**: Hide the icon in the feedback message even if one is defined, boolean. Default: `false`.

## Methods

- **show(text)**: Display the floating feedback. If text is provided, it overrides the feedback property.

```javascript
const feedback = document.getElementById('my-feedback');
feedback.show('Custom message');
// or
feedback.show();
```

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-floating-feedback-background-color | Background color | rgba(0, 0, 0, 0.8)
--dile-floating-feedback-text-color | Text color | #fff
--dile-floating-feedback-font-size | Font size | 0.875rem
--dile-floating-feedback-font-weight | Font weight | 500
--dile-floating-feedback-padding | Padding | 0.5rem 0.75rem
--dile-floating-feedback-border-radius | Border radius | 4px
--dile-floating-feedback-icon-size | Icon size | 1.2em
--dile-floating-feedback-duration | Animation duration | 1000ms

## dile-floating-feedback demos

### Basic feedback

```html:preview
<script type="module">
  import '@dile/ui/components/floating-feedback/floating-feedback.js';
</script>
<div>
  <dile-floating-feedback id="feedback1" feedback="Operation successful!">
    <dile-button onclick="document.getElementById('feedback1').show()">Show Feedback</dile-button>
  </dile-floating-feedback>
</div>
```

### With custom duration

```html:preview
<div>
  <dile-floating-feedback id="feedback2" feedback="Slow message!" duration="2000">
    <dile-button onclick="document.getElementById('feedback2').show()">Show (2000ms)</dile-button>
  </dile-floating-feedback>
</div>
```

### Styled feedback + icon

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import { doneIcon } from '@dile/icons';

export class StyledIconFeedback extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .styled-feedback {
        --dile-floating-feedback-background-color: #28a745;
        --dile-floating-feedback-text-color: #fff;
        --dile-floating-feedback-border-radius: 20px;
        --dile-floating-feedback-padding: 0.75rem 1rem;
      }
    `
  ];

  render() {
    return html`
      <dile-floating-feedback 
        id="feedback3" 
        feedback="Success!" 
        class="styled-feedback"
        .icon=${doneIcon}
      >
        <dile-button @click=${this.showFeedback}>Show Styled</dile-button>
      </dile-floating-feedback>
    `;
  }

  showFeedback() {
    this.shadowRoot.querySelector('#feedback3').show();
  }
}
customElements.define('styled-icon-feedback', StyledIconFeedback);
</script>
<div>
  <styled-icon-feedback></styled-icon-feedback>
</div>
```
