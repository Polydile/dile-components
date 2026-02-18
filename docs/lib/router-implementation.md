---
layout: layout.html
title: Route library implementation 
---

# Route Library Implementation

The **@dile/lib** package provides a procedure to implement the **@[lit-labs/router](https://www.npmjs.com/package/@lit-labs/router)** routing library. This is a basic routing system that uses the browser’s [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) feature.

> **URLPattern** is a modern feature available in all current browsers. It may not work in older browsers, where you’d need a [urlpattern polyfill](https://github.com/kenchris/urlpattern-polyfill).

## DileAppRouter Mixin

This mixin installs in your application’s root component and separates routing logic, avoiding most boilerplate code for route registration.

### Import DileAppRouter

Import the mixin into the root component:

```javascript
import { DileAppRouter } from '@dile/lib';
```

### Implement the mixin

Extend the root component with the mixin:

```javascript
export class DileApp extends DileAppRouter(LitElement) {
  // Class content
}
```

### Register routes

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

Additionally, there are other callbacks and utilities for declaring routes that can be found in the documentation. Refer to the @[lit-labs/router](https://www.npmjs.com/package/@lit-labs/router) library documentation for more information.

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

These handlers are essential so components like **DileRouterLink** and the **DileAppNavigate** mixin from **@dile/lib** can trigger the routing system and navigate to other pages.