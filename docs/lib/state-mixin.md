---
layout: layout.html
title: State Mixin
---

# State Mixin

This mixin enables any application component to subscribe to Redux store state changes. By implementing the mixin, components automatically receive state updates and can respond to any changes in the store.

## Usage

To use this mixin, you must have **@dile/lib** installed as described on the [@dile/lib homepage](/lib/).

It works through Redux, so you need to implement the Redux store provided by **@dile/lib**, as explained in the [Redux implementation guide](/lib/redux-implementation/).

Once you have the store in your application, import it into the component where you want to use **DileState** and apply the mixin by providing your application's store.

Here's an example:

```javascript
import { store } from '../redux/store.js';
import { DileState } from '@dile/lib';

export class DileApp extends DileState(store)(LitElement) {
   stateChanged(state) {
      // Handle state changes here
   }
}
```

## How it works

The **DileState** mixin automatically subscribes to the Redux store when the component is connected to the DOM and unsubscribes when disconnected. Every time the store state changes, the `stateChanged()` method is called with the current state.

## Available methods

The **DileState** mixin adds methods to the component for managing state subscriptions. Below are the methods, their signatures, descriptions, and usage examples.

### stateChanged(state)

- **Description**: Lifecycle method called whenever the store state changes. Override this method in your component to respond to state updates.  
- **Parameters**:  
  - `state` (Object): The current Redux store state.  

**Example**:

```javascript
stateChanged(state) {
  this.userData = state.user.userData;
  this.isLoading = state.feedback.loading;
}
```

### getState()

- **Description**: Returns the current Redux store state. Can be called at any time to retrieve the latest state without waiting for changes.  
- **Parameters**: None.  
- **Returns**: (Object): The current Redux store state.  

**Example**:

```javascript
const currentState = this.getState();
console.log(currentState.user.isLoggedIn);
```

## Lifecycle

The **DileState** mixin manages the Redux subscription through the component's lifecycle:

- **connectedCallback()**: When the component is added to the DOM, it subscribes to store changes and calls `stateChanged()` with the initial state.
- **disconnectedCallback()**: When the component is removed from the DOM, it automatically unsubscribes from the store to prevent memory leaks.

This ensures efficient state management and proper cleanup of subscriptions.

## Best practices

- Override `stateChanged()` to extract only the state properties your component needs.
- Use `getState()` sparingly; prefer listening to changes through `stateChanged()`.
- Remember that `stateChanged()` is called every time the store updates, even if the specific state your component uses hasn't changed. Consider optimizing by comparing previous and current state values if needed.
