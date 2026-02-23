---
layout: layout.html
title: Router link
tags: 'app components'
order: 4
---

# Router Link Component

The **DileRouterLink** component is a lightweight link element that integrates with the routing system provided by **@dile/lib**. It allows you to perform programmatic navigation using the [**DileAppNavigate** mixin](/lib/navigate-mixin/) instead of relying on the browser’s default link behavior.

## Usage

To use this component you need:

- A routing system implemented with the [route library implementation](/lib/router-implementation/).  
- The [**DileAppRouter** mixin](/lib/router-mixin/) installed in your application’s root component to handle navigation events.

First, import and register the component in your application:

```javascript
import { DileRouterLink } from '@dile/lib';

customElements.define('dile-router-link', DileRouterLink);
```

Then you can use it in your templates as a replacement for a standard anchor element:

```html
<dile-router-link href="/games" title="Games section">
  Go to games
</dile-router-link>
```

When the user clicks the link, the component prevents the default browser navigation and dispatches a programmatic navigation request through the routing system.

## Properties

The **DileRouterLink** component exposes the following public properties:

- `href` (String): Target URL or path to navigate to when the link is clicked.  
- `title` (String): Optional title or label for the navigation. It is forwarded to the navigation method and can be used by your routing system (for example, to set the document title).
- `name` (String): Optional name or identifier for the link. This value is included in the `dile-router-link-clicked` event detail.

Example with both properties:

```html:preview
<dile-router-link href="/videos/123" title="Video details">
  View video
</dile-router-link>
```

## Events

The **DileRouterLink** component dispatches the following custom event:

- `dile-router-link-clicked`: Fired when the user clicks the link, before navigation occurs. This event has the following characteristics:
  - `composed: true` - The event can propagate through the shadow DOM boundary.
  - `bubbles: true` - The event bubbles up through the DOM tree.
  - `detail` - Contains an object with the following properties:
    - `href`: The target URL or path.
    - `title`: The navigation title.
    - `name`: The link's identifier.

Example listener:

```javascript
document.addEventListener('dile-router-link-clicked', (e) => {
  console.log('Navigation requested:', e.detail);
});
```

## Styling

The component renders a native `<a>` element inside its shadow DOM. You can customize its appearance using CSS custom properties:

- `--dile-router-link-color`: Text color of the anchor.  
- `--dile-router-link-text-decoration`: Text decoration of the anchor (for example: `underline`, `none`).

Example:

```html:preview
<dile-router-link
  href="/games"
  style="--dile-router-link-color: var(--primary-color); --dile-router-link-text-decoration: underline;"
>
  Games
</dile-router-link>
```

## How it works

**DileRouterLink** extends the [**DileAppNavigate** mixin](/lib/navigate-mixin/), which provides the `goToUrl()` method to trigger navigation through the application’s routing system. On click, the component:

1. Prevents the default browser navigation.  
2. Calls `this.goToUrl(this.href, this.title)` to dispatch a navigation request (for example, by firing a `dile-lib-navigate` event handled by the root router).

This makes **DileRouterLink** an ideal building block for navigation in SPA applications using the routing utilities from **@dile/lib**.