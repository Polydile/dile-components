---
title: Media Query
tags: utils
---

# dile-media-query

Web Component to make media queries and receive events when its state changes.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component.

```javascript
  import '@dile/utils/components/media-query/media-query.js';
```

Use the component.

```html
<dile-media-query query="(max-width: 1000px)"></dile-media-query>
```

### Properties

- **query**: Media query to check if is matched.

### Events

- **dile-media-query-changed**: The component dile-media-query dispatches this event when the media query match changes between states. This event is also dispatched when the `query` property is set.

# dile-media-query demos

```html:preview
<script type="module">

import { LitElement, html } from 'lit';
import '@dile/utils/components/media-query/media-query.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-media-query 
        @dile-media-query-changed=${this.mqChanged} 
        query="(min-width: 460px)"
      ></dile-media-query>
      <div id="message"></div>
    `
  }

  mqChanged(e) {
    let message = this.shadowRoot.getElementById("message");
    message.innerHTML = 
      "The media query (min-width: 460px) state is <b>" + (e.detail.value ? 'matched' : 'not matched') + "</b>"
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

## Credits

This component is based on an abandoned project from Victor Bernabé: <https://github.com/Victor-Bernabe/lit-media-query>. We have updated the component to use Lit instead of Lit-Element and a refactoring to take advantage of the component lifecycle methods.
