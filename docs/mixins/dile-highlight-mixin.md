---
title: Highlight
tags: effects
element: DileHighlightMixin
package: '@dile/ui'
summary: Adds a soft glow effect to an element and optionally scrolls it into view to bring attention to a field or component.
---

# DileHighlightMixin

Use this mixin when you need to draw attention to a specific component or nested element after a validation error, a navigation jump, or another user action.

It highlights the target with a temporary glow and can scroll it into view with smooth motion, while respecting the browser's reduced-motion preference.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import and extend your custom element with the mixin:

```javascript
import { LitElement, html } from 'lit';
import { DileHighlightMixin } from '@dile/ui/mixins/highlight';

class MyAlert extends DileHighlightMixin(LitElement) {
  render() {
    return html`
      <button type="button" @click=${() => this.highlight()}>
        Highlight me
      </button>
    `;
  }
}
```

If you want to highlight a nested element instead of the host, override the `highlightTarget` getter:

```javascript
get highlightTarget() {
  return this.shadowRoot.querySelector('.focus-target');
}
```

## Methods

- **highlight({ scroll = true } = {})**: Animates a highlight around the target and scrolls it into view when `scroll` is true.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-highlight-color | Color used by the glow. | currentColor
--dile-highlight-duration | Duration of the animation in milliseconds. | 1200

## DileHighlightMixin demos

### Basic usage

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { DileHighlightMixin } from '@dile/ui/mixins/highlight/index.js';

  class HighlightDemo extends DileHighlightMixin(LitElement) {
    static styles = css`
      :host {
        display: block;
        --dile-highlight-color: #2f6fed;
        --dile-highlight-duration: 1400;
      }

      .card {
        padding: 1rem 1.25rem;
        border: 1px solid #d0d7de;
        border-radius: 12px;
        background: white;
      }

      .focus-target {
        border: 1px solid #b9d1ff;
        border-radius: 10px;
        padding: 0.8rem 1rem;
        background: #f8fbff;
        font-weight: 600;
      }

      button {
        margin-top: 1rem;
      }
    `;

    get highlightTarget() {
      return this.shadowRoot.querySelector('.focus-target');
    }

    render() {
      return html`
        <div class="card">
          <div class="focus-target">This element receives the glow</div>
          <button type="button" @click=${() => this.highlight()}>
            Highlight target
          </button>
        </div>
      `;
    }
  }

  customElements.define('dile-highlight-demo-card', HighlightDemo);
</script>
<dile-highlight-demo-card></dile-highlight-demo-card>
```

### Without scrolling

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { DileHighlightMixin } from '@dile/ui/mixins/highlight/index.js';

  class HighlightNoScrollDemo extends DileHighlightMixin(LitElement) {
    static styles = css`
      :host {
        display: block;
      }

      .box {
        padding: 1rem;
        border: 1px solid #cdd5df;
        border-radius: 10px;
      }
    `;

    render() {
      return html`
        <div class="box">
          <button type="button" @click=${() => this.highlight({ scroll: false })}>
            Highlight without scrolling
          </button>
        </div>
      `;
    }
  }

  customElements.define('dile-highlight-no-scroll-demo', HighlightNoScrollDemo);
</script>
<dile-highlight-no-scroll-demo></dile-highlight-no-scroll-demo>
```
