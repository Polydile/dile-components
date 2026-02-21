---
layout: layout.html
title: Redux implementation to use Lib Components
---

# Redux Implementation in @dile/lib

The **@dile/lib** package requires Redux and Redux Toolkit to unlock its full potential, as components use this library to propagate state for elements like:

- User feedback dialogs  
- Logged-in user storage  

> Redux is sometimes called overly complex for what it offers, but since Redux Toolkit appeared, things have simplified greatly. We don’t consider it problematic and value its benefits.

## Redux slices

To simplify Redux integration in applications, we now have [Redux Toolkit](https://redux-toolkit.js.org/), which eliminates most boilerplate code.

**@dile/lib** provides utilities to create Redux slices for dialog components and user management even more easily.

### feedbackSlice

This Redux Toolkit slice offers utilities for managing dialog components.

Import it like this:

```javascript
import { feedbackSlice } from '@dile/lib';
```

To interact with feedback actions in your application components, implement the [DileFeedback mixin](/lib/feedback-mixin/), which provides methods to manage various dialog types and loading states.

For more information about this slice, see the [**Redux Feedback Slice**](/lib/redux-feedback-slice/) page.

### userSlice

This slice enables the typical state needed to store the application user.

Import it like this:

```javascript
import { userSlice } from '@dile/lib';
```

For more information about this slice, see the [**Redux User Slice**](/lib/redux-feedback-slice/) page.


## Store implementation

To use these slices and their actions, create a store in your project. Place it in a suitable file, typically at `src/js/redux/store.js`.

Here’s the code to configure the store using Redux Toolkit and **@dile/lib** slices:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from '@dile/lib';
import { userSlice } from '@dile/lib';

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer,
    user: userSlice.reducer,
  }
});
```

You can add any other slices you need for managing your application’s global state.

## State Mixin

To make it easier for your components to subscribe to Redux store changes, you can use **DileState**. This mixin can be implemented in any component where you need to read the state on demand or automatically receive state updates when it changes.

You can find the complete documentation for this utility on the [**DileState** documentation](/lib/state-mixin/) page.