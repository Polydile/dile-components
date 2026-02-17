---
layout: layout.html
title: App Toast Component
---

# App Toast Component

In **@dile/lib** you will find a toast component that integrates seamlessly with the Redux store, allowing it to receive feedback message requests emitted by [FeedbackMixin](/lib/feedback-mixin/).

## Usage

To use this component you need:

- Install **@dile/lib**.  
- To have configured the store, as explained in the [Redux implementation guide](/lib/redux-implementation/).

### Component factory

Actually, the App Toast Component is a **component factory function**, not a component itself. Therefore, you must invoke the factory to create the component class.

You need to pass the store you want the component to connect with to the factory.

Here’s an example:

```javascript
import { DileAppFeedback } from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-toast', DileAppFeedback(store));
```

- **DileAppFeedback** is the component factory.  
- The **store import** should point to the store implemented in your own application.  
- The **customElements.define()** method registers the component.  
  - The first parameter `'dile-app-toast'` sets the component tag name. You can customize it as desired since this code resides within your application.  
  - The second parameter `DileAppFeedback(store)` runs the factory function, linking it to your application’s store.

### Implementing your registered component

Once the component is registered, you only need to include it in your application, typically inside the root component.

First, import your component from the location where you defined it:

```javascript
import './feedback/dile-app-toast.js';
```

Then, use it by adding its tag — in this case `'dile-app-toast'` — to your HTML:

```html
<dile-app-toast></dile-app-toast>
```

That’s all! The component will be active, waiting for feedback messages to appear.

> Since the component is linked with the Redux store, there’s no need for additional bindings to receive data from other components in the app. You can trigger it using the methods provided by the [Feedback Mixin](/lib/feedback-mixin/).