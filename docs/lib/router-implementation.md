---
layout: layout.html
title: Route library implementation 
---

# Route Library Implementation

The **@dile/lib** package provides a procedure to implement the **@[lit-labs/router](https://www.npmjs.com/package/@lit-labs/router)** routing library. This is a basic routing system that uses the browser’s [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) feature.

> **URLPattern** is a modern feature available in all current browsers. It may not work in older browsers, where you’d need a [urlpattern polyfill](https://github.com/kenchris/urlpattern-polyfill).

## Getting Started

To manage the routing system in an SPA application, you'll need to follow these steps:

### Implement the DileAppRouter Mixin

In your application's root component, implement the `DileAppRouter` mixin, which allows you to quickly apply the routes your application will manage. You'll need to declare the routes in an array and then pass them to the mixin's `createRoutes()` method.

Additionally, this mixin defines navigation event handlers in your root component, which are important for programmatic navigation components to work properly.

You can find complete information on the [DileAppRouter documentation page](/lib/router-mixin/).

### Use the Programmatic Navigation Mixin

If you need to perform programmatic navigation in any component, you can rely on the `goToUrl()` method provided by the `DileAppNavigate` mixin.

All the information is available on the [DileAppNavigate mixin documentation page](/lib/navigate-mixin/).

### Use the DileRouterLink Component

A more direct alternative to implement navigation through the routing system is to use the `DileRouterLink` component from the `@dile/lib` package.

You can find all the implementation information in the [DileRouterLink documentation](/lib/router-link-component/).

## When traditional links are detected by the Routing System

All links you place in your app root component will be detected by the routing system, to prevent the default behavior and produce navigation without reloading the entire page. This is the desired behavior for a single-page application, as we don't want the whole page to reload when clicking a navigation link.

Additionally, any links in components rendered within the router outlet will also be captured by the routing system to enable navigation without a full page reload.

However, if your root component contains other components with their own shadow DOM, the links might not navigate as desired and could instead cause a full page reload.

In such cases, we recommend using the [programmatic navigation mixin](/lib/navigate-mixin/) or the [DileRouterLink component](/lib/router-link-component/).