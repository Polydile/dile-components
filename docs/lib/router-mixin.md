---
layout: layout.html
title: App Router Mixin 
tags: routing
order: 2
element: DileAppRouter
package: '@dile/lib'
summary: Registers your application's routes and handles navigation in the root component.
---

# DileAppRouter Mixin

This mixin installs in your application’s root component and separates routing logic, avoiding most boilerplate code for route registration.

## Import DileAppRouter

Import the mixin into the root component:

```javascript
import { DileAppRouter } from '@dile/lib';
```

## Implement the mixin

Extend the root component with the mixin:

```javascript
export class DileApp extends DileAppRouter(LitElement) {
  // Class content
}
```

## Register routes

In the root component, use the `createRoutes()` method provided by this mixin to register routes. Do this in the component’s constructor.

```javascript
constructor() {
  super();
  this.createRoutes(routes);
}
```

Finally, place the router outlet in the `render()` method of your root component where you want routed pages to appear.

```javascript
render() {
  return html`
  <main class="container">
    ${this._routes.outlet()}
  </main>
`;
}
```

### Route declaration

To declare the routes we pass to the mixin’s createRoutes() method, create an array of objects through which each route can be defined.

In the following example, you can see several route declarations that implement the route, introducing parameters in some cases, along with the view to display for each route. Additionally, through the `enter()` callback, you can define actions to perform when entering the route, where you can perform dynamic imports to implement lazy loading of the route components.

Additionally, there are other callbacks and utilities for declaring routes that can be found in the documentation. Refer to the [@lit-labs/router](https://www.npmjs.com/package/@lit-labs/router) library documentation for more information.

```javascript
import { html } from 'lit';

export const routes = [
  {
    path: '/', render: () => {
      return html`<tm-page-home></tm-page-home>`
    }
  },
  {
    path: '/games',
    render: () => html`<mj-board-games></mj-board-games>`,
    enter: async () => {
      await import('../components/board-game/mj-board-games.js');
    },
  },
  {
    path: '/games/:id',
    render: ({id}) => html`<mj-board-game-single slug="${id || 0}"></mj-board-game-single>`,
    enter: async () => {
      await import('../components/board-game/mj-board-game-single.js');
    },
  },
  {
    path: '/videos',
    render: () => html`<mj-videos></mj-videos>`,
    enter: async () => {
      await import('../components/videos/mj-videos.js');
    },
  },
  {
    path: '/video-request',
    render: () => html`<mj-video-requests></mj-video-requests>`,
    enter: async () => {
      await import('../components/video-requests/mj-video-requests.js');
    },
  },
  {
    path: '/videos/:id',
    render: ({id}) => html`<mj-videos-single videoId="${id || 0}"></mj-videos-single>`,
    enter: async () => {
      await import('../components/videos/mj-videos-single.js');
    },
  },
];
```

### dile-lib-navigate events

This mixin also declares two `dile-lib-navigate` event handlers in the component where it’s implemented. These detect programmatic navigation requests from other components.

These handlers are essential so components like [**DileRouterLink**](/lib/router-link-component/) and the [**DileAppNavigate**](/lib/navigate-mixin/) mixin from **@dile/lib** can trigger the routing system and navigate to other pages.

### dile-lib-route-changed event

Every time the active route changes, the mixin dispatches a `dile-lib-route-changed` custom event on `document`. It is fired for any kind of navigation:

- Programmatic navigation with `goToUrl()` (`dile-lib-navigate` events).
- Clicks on regular `<a href>` links, including links inside the shadow DOM of other components (for example, `dile-tab` with `href`).
- The browser's back and forward buttons.
- The initial page load.

The event is dispatched after the route's `enter()` callback has finished, so lazy-loaded components are already imported when it arrives. The event detail contains the full current path:

| Detail property | Type | Description |
|---|---|---|
| `pathname` | `String` | The full path of the new location (`window.location.pathname`). |

```javascript
document.addEventListener('dile-lib-route-changed', (e) => {
  console.log('Route changed to', e.detail.pathname);
});
```

> If an `enter()` callback cancels the navigation by returning `false`, the event is still dispatched with the URL that was requested. If the guard redirects with `goToUrl()`, the redirection fires its own event afterwards with the final URL.
