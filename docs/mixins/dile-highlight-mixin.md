---
title: Highlight
tags: effects
element: DileHighlightMixin
package: '@dile/ui'
summary: Adds a soft glow effect to an element and optionally scrolls it into view to bring attention to a field or component.
---

# DileHighlightMixin

Use this mixin when you need to draw attention to a specific component or nested element after a validation error, a navigation jump, or another user action.

It highlights the target with a temporary glow and can scroll it into view with smooth motion, while respecting the browser's reduced-motion preference. The glow is added on top of any `box-shadow` the target already has, so existing shadows are preserved.

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

`highlight()` waits for the component's `updateComplete` before reading `highlightTarget`, so you can call it right after changing a property that renders the target:

```javascript
async requestUpload() {
  this.showUploader = true;
  await this.highlight();
}
```

## Methods

- **highlight({ scroll = true } = {})**: Scrolls the target into view and animates a glow around it. Returns a `Promise<Animation | null>` that resolves with the created `Animation`, or `null` if there is no target or the browser doesn't support `animate()`. Await `animation.finished` to know when the highlight ends.
  - `scroll: true` (default): equivalent to `{ behavior: 'smooth', block: 'center' }`.
  - `scroll: false`: no scrolling.
  - `scroll: ScrollIntoViewOptions`: merged with the defaults, e.g. `{ block: 'start' }`.

When scrolling smoothly to a target that is not fully visible, the animation starts once scrolling ends (`scrollend` event, or after about 800 ms in browsers without it). Calling `highlight()` again restarts the animation instead of stacking it, and the animation is cancelled when the component is removed from the page.

```javascript
const animation = await this.highlight({ scroll: { block: 'start' } });
await animation?.finished;
```

## Reduced motion

When the user has `prefers-reduced-motion: reduce` enabled, scrolling is always instant (`behavior: 'auto'`), even if you pass `behavior: 'smooth'`. The highlight is still shown, because it is a color change rather than motion, but as a static glow that appears, stays and disappears without pulsing.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-highlight-color | Color used by the glow. | currentColor
--dile-highlight-size | Thickness of the glow. | 4px
--dile-highlight-duration | Duration of the animation. Accepts `1200`, `1200ms` or `1.2s`. Invalid or non-positive values fall back to the default. | 1200

These properties are read from the highlighted element, which inherits them from the component, so you can set them on the host or directly on the target.

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

### Element with an existing shadow

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { DileHighlightMixin } from '@dile/ui/mixins/highlight/index.js';

  class HighlightShadowDemo extends DileHighlightMixin(LitElement) {
    static styles = css`
      :host {
        display: block;
        padding: 1.25rem;
        border-radius: 14px;
        background: white;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.15);
        --dile-highlight-color: #2f6fed;
        --dile-highlight-size: 3px;
        --dile-highlight-duration: 1.4s;
      }
    `;

    render() {
      return html`
        <p>This card keeps its own shadow while the glow is shown.</p>
        <button type="button" @click=${() => this.highlight({ scroll: false })}>
          Highlight card
        </button>
      `;
    }
  }

  customElements.define('dile-highlight-shadow-demo', HighlightShadowDemo);
</script>
<dile-highlight-shadow-demo></dile-highlight-shadow-demo>
```

### Target rendered just before highlighting

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { DileHighlightMixin } from '@dile/ui/mixins/highlight/index.js';

  class HighlightLateTargetDemo extends DileHighlightMixin(LitElement) {
    static properties = {
      showPanel: { type: Boolean },
    };

    static styles = css`
      :host {
        display: block;
        --dile-highlight-color: #e5484d;
      }

      .panel {
        margin-top: 1rem;
        padding: 0.8rem 1rem;
        border: 1px solid #f3b4b6;
        border-radius: 10px;
        background: #fff7f7;
      }
    `;

    constructor() {
      super();
      this.showPanel = false;
    }

    get highlightTarget() {
      return this.shadowRoot.querySelector('.panel');
    }

    async reveal() {
      this.showPanel = true;
      // highlight() waits for the render, so the panel already exists here.
      const animation = await this.highlight();
      await animation?.finished;
    }

    render() {
      return html`
        <button type="button" @click=${this.reveal}>Show and highlight panel</button>
        ${this.showPanel ? html`<div class="panel">I was rendered right before the highlight.</div>` : ''}
      `;
    }
  }

  customElements.define('dile-highlight-late-target-demo', HighlightLateTargetDemo);
</script>
<dile-highlight-late-target-demo></dile-highlight-late-target-demo>
```
