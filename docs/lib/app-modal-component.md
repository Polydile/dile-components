---
layout: layout.html
title: App Modal Component
---

# App Modal Component

In **@dile/lib** you will find a modal component that integrates seamlessly with the Redux store, allowing it to receive feedback message requests emitted by [FeedbackMixin](/lib/feedback-mixin/).

## Usage

To use this component you need:

- Install **@dile/lib**.  
- To have configured the store, as explained in the [Redux implementation guide](/lib/redux-implementation/).

### Component factory

Actually, the App Modal Component is a **component factory function**, not a component itself. Therefore, you must invoke the factory to create the component class.

You need to pass the store you want the component to connect with to the factory.

Here's an example:

```javascript
import { DileAppModalFeedback } from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-modal', DileAppModalFeedback(store));
```

- **DileAppModalFeedback** is the component factory.  
- The **store import** should point to the store implemented in your own application.  
- The **customElements.define()** method registers the component.  
  - The first parameter `'dile-app-modal'` sets the component tag name. You can customize it as desired since this code resides within your application.  
  - The second parameter `DileAppModalFeedback(store)` runs the factory function, linking it to your application’s store.

### Implementing your registered component

Once the component is registered, you just need to include it in your application, typically inside the root component.

First, import your component from the location where you defined it:

```javascript
import './feedback/dile-app-modal.js';
```

Then, use it by adding its tag — in this case `'dile-app-modal'` — to your HTML:

```html
<dile-app-modal></dile-app-modal>
```

That’s all! The component will be active, waiting for modal feedback messages to appear.

> Since the component is linked with the Redux store, there’s no need for additional bindings to receive data from other components in the app. You can trigger it using the methods provided by the [Feedback Mixin](/lib/feedback-mixin/) (such as `modalFeedback()` and `closeModalFeedback()`).