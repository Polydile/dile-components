---
layout: layout.html
title: App Loading Component
---


# App Loading Component

In **@dile/lib** you can find a loading/spinner component that connects easily to the Redux store, allowing it to receive loading start and end requests emitted by the [FeedbackMixin](/lib/feedback-mixin/).

## Usage

To use this component, you need to:

- Install **@dile/lib**.
- Have configured your store following the [Redux implementation](/lib/redux-implementation/) guidelines.


### Component Factory

Actually, the App Loading Component is a component factory function, not a component itself.  
Therefore, you must call the factory to create the component class.

You need to provide the store you want the component to connect to as an argument to the factory.

Here’s an example code snippet:

```javascript
import { DileAppLoading } from "@dile/lib";
import { store } from "../../redux/store.js";


customElements.define('dile-app-loading', DileAppLoading(store));
```

- `DileAppLoading` is the component factory.  
- The `store` import must refer to the `store` implemented in your own application.  
- The `customElements.define()` call registers the component.  
  - The first parameter `'dile-app-loading'` is the component name you are creating. You can customize it as you wish since this code resides in your application.  
  - The second parameter `DileAppLoading(store)` executes the component factory, passing in your application’s store.

### Implementing Your Own Registered Component

Once the component is registered, you simply include it in your application, typically in the root component.

First, import your component from the path where you defined it:

```javascript
import './feedback/dile-app-loading.js';
```

Then, use the element tag you used during registration, in this case `'dile-app-loading'`:

```html
<dile-app-loading></dile-app-loading>
```

That’s it! The component will now be active, ready to handle the start and end loading requests.

> Since the component is connected to the Redux store, you don’t need to create any manual data bindings to receive updates from other components. You can simply trigger it using the methods provided by the [Feedback Mixin](/lib/feedback-mixin/) (such as `startLoading()` and `stopLoading()`).
```  
