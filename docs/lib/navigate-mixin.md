---
layout: layout.html
title: DileAppNavigate Mixin
tags: routing
order: 3
---

# DileAppNavigate Mixin

The `DileAppNavigate` mixin from `@dile/lib` provides a method to programmatically trigger navigation events in Dile applications.

## Usage

Import the mixin as follows:

```javascript
import { DileAppNavigate } from '@dile/lib';
```

Apply it to your component class:

```javascript
class MyAppComponent extends DileAppNavigate(LitElement) {
  // Your component code
}
```

## Methods

### `goToUrl(url, title = '')`

Dispatches a custom `dile-lib-navigate` event to handle client-side navigation.

**Parameters:**
- `url` (string): The target URL to navigate to.
- `title` (string, optional): Document title to set after navigation (defaults to empty string).

**Event Details:**
The mixin dispatches a `CustomEvent` with:
- `bubbles: true`
- `composed: true`
- `detail: { url, title }`

This allows parent components or global navigation handlers to listen for and respond to navigation requests.

## Requirements for Programmatic Navigation to Work

For programmatic navigation to occur, there must be a component listening for `dile-lib-navigate` events. That component will typically be the root component of the application.

To immediately apply event handlers in the application's root component, it's recommended to use the `[DileAppRouter](/lib/router-mixin/)` mixin, which already includes this functionality.

## Apply the `goToUrl()` behavior to a link

Below is an example of a link that applies the `goToUrl()` behavior for programmatic navigation, leveraging the functionality provided by this mixin.

```html
<a class="loginoption" href="/login" @click="${e => { e.preventDefault(); this.goToUrl('/login'); }}">Login</a>
```