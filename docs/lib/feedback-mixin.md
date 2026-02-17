---
layout: layout.html
title: Feedback Mixin
---

# Feedback Mixin

This mixin enables any application component to display feedback messages easily. By implementing the mixin, components gain methods to show toast messages, modal dialogs, or loading states.

## Usage

To use this mixin, you must have **@dile/lib** installed as described on the [@dile/lib homepage](/lib/).

It works through Redux, so you need to implement the Redux store and the feedback slice provided by **@dile/lib**, as explained in the [Redux implementation guide](/lib/redux-implementation).

Once you have the store in your application, import it into the component where you want to use **FeedbackMixin** and apply the mixin by providing your application’s store.

Here’s an example:

```javascript
import { store } from '../redux/store.js';
import { DileFeedback } from '@dile/lib';

export class DileApp extends DileFeedback(store)(LitElement) {
   // Component code
}
```

## Available methods

The **DileFeedback** mixin adds methods to the component that dispatch actions to the provided Redux store. Below are the methods, their signatures, descriptions, parameters, and usage examples.

### positiveFeedback(message)

- **Description**: Shows a positive feedback message (success state).  
- **Parameters**:  
  - `message` (String): Message text to display.  

**Example**:

```javascript
this.positiveFeedback('Operation completed successfully');
```

### negativeFeedback(message)

- **Description**: Shows a negative feedback message (error state).  
- **Parameters**:  
  - `message` (String): Message text to display.  

**Example**:

```javascript
this.negativeFeedback('There was an error processing the request');
```

### neutralFeedback(message)

- **Description**: Shows a neutral or informational message.  
- **Parameters**:  
  - `message` (String): Message text to display.  

**Example**:

```javascript
this.neutralFeedback('This is an informational message');
```

### startLoading()

- **Description**: Indicates the start of an async operation or loading (e.g., to show a global spinner).  
- **Parameters**: None.  

**Example**:

```javascript
this.startLoading();
```

### stopLoading()

- **Description**: Indicates the end of the loading operation started with `startLoading()`.  
- **Parameters**: None.  

**Example**:

```javascript
this.stopLoading();
```

### modalFeedback(message, label = "Close", icon = null)

- **Description**: Opens a feedback modal with the provided message. Optionally sets the close button label and a predefined icon.  
- **Parameters**:  
  - `message` (String): Text to display in the modal.  
  - `label` (String, optional): Close button text. Default: `"Close"`.  
  - `icon` (String, optional): Icon name to display. Available icons: `'info'`, `'warning'`, `'success'`, `'error'`. If a valid name is provided, the modal shows the corresponding icon.  

**Example**:

```javascript
// Modal with success icon and custom label
this.modalFeedback('Saved successfully', 'OK', 'success');
```

### closeModalFeedback()

- **Description**: Closes the open feedback modal.  
- **Parameters**: None.  

**Example**:

```javascript
this.closeModalFeedback();
```

## Required components for mixin operation

As mentioned, these methods dispatch actions from the `redux/feedback-slice` provided by **@dile/lib** and require the store and feedback slice to be properly [integrated into the application](/lib/redux-implementation).

To receive state changes and display feedback messages, your application — typically in the root component or before `</body>` in web pages — needs a component correctly linked to the store.

The required components are included in **@dile/lib**. Their documentation pages are listed below:

- [Toast component](/lib/app-toast-component/)  
- [Modal component](/lib/app-modal-component/)  
- [Global spinner component](/lib/app-loading-component/)