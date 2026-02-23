---
layout: layout.html
title: Feedback Slice
tags: 'state management'
order: 2
---

# Redux Feedback Slice

The feedback slice is used to centralize and globally provide the necessary mechanisms to display feedback messages to the user.

## Feedback slice implementation

The implementation of the slice is detailed on the [Redux utilities implementation](/lib/redux-implementation/) page of @dile/lib.

## Using the slice from the mixin

To use the feedback slice, you usually don't need to manually trigger the actions. Instead, we recommend using the [feedback mixin](/lib/feedback-mixin/), which automatically adds feedback message presentation capabilities to a component.

> Don’t forget to integrate the necessary feedback components into your webpage so messages can be displayed to users, as explained on the [Toast component](/lib/app-toast-component/), [Modal component](/lib/app-modal-component/), and [Global spinner component](/lib/app-loading-component/) pages.

## Using the slice through actions

Although you can use the [feedback mixin](/lib/feedback-mixin/) as mentioned before, you can also trigger the actions directly using the store itself. This allows you to manage feedback messages, loading states, and modals within a page or app.

Feedback actions are already available to help modify the state.

## positiveFeedback(message)

This action allows you to show a positive (success) feedback message in the store. It expects the message as a parameter.

```javascript
import { store } from '../redux/store';
import { positiveFeedback } from '@dile/lib';

store.dispatch(positiveFeedback('Record saved successfully'));
```

## negativeFeedback(message)

This action allows you to show a negative (error) feedback message in the store. It expects the message as a parameter.

```javascript
import { store } from '../redux/store';
import { negativeFeedback } from '@dile/lib';

store.dispatch(negativeFeedback('An error occurred while saving'));
```

## neutralFeedback(message)

This action allows you to show a neutral (informational) feedback message in the store. It expects the message as a parameter.

```javascript
import { store } from '../redux/store';
import { neutralFeedback } from '@dile/lib';

store.dispatch(neutralFeedback('Please wait while processing'));
```

## startLoading()

This action activates the loading state. Useful for indicating that an operation is in progress.

```javascript
import { store } from '../redux/store';
import { startLoading } from '@dile/lib';

store.dispatch(startLoading());
```

## stopLoading()

This action deactivates the loading state. It should be executed when the operation is complete.

```javascript
import { store } from '../redux/store';
import { stopLoading } from '@dile/lib';

store.dispatch(stopLoading());
```

## modalMessage(payload)

This action displays a modal message with customization options. It expects an object with the following properties:

- `message` (string): The message to display  
- `label` (string, optional): The button text (defaults to "Close")  
- `icon` (string, optional): The icon name ('info', 'warning', 'success', 'error')  
- `iconClass` (string, optional): Custom CSS class for the icon  

```javascript
import { store } from '../redux/store';
import { modalMessage } from '@dile/lib';

store.dispatch(modalMessage({
  message: 'Operation completed successfully',
  label: 'Accept',
  icon: 'success'
}));
```

## modalClose()

This action closes the feedback modal.

```javascript
import { store } from '../redux/store';
import { modalClose } from '@dile/lib';

store.dispatch(modalClose());
```