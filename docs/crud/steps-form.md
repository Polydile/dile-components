---
title: Steps Form
tags: ajax
element: dile-steps-form
package: '@dile/crud'
summary: Multi-step form (wizard) that loads a resource and saves every step via Ajax.
---

# dile-steps-form

The `dile-steps-form` component builds a multi-step form, also known as a wizard. It loads the data of a resource from the server, distributes it among the forms of every step, and saves each step via Ajax when the user moves forward.

The family has two public components:

- **dile-steps-form**: the container. It loads the resource, displays the [dile-steps](/components/dile-steps/) indicator and the current step, manages the navigation and shows inline feedback messages.
- **dile-step-form**: every step. It wraps a form component and saves its data to its own endpoint.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the components.

```javascript
import '@dile/crud/components/steps-form/steps-form.js';
import '@dile/crud/components/steps-form/step-form.js';
```

Place the `dile-step-form` elements as direct children of `dile-steps-form`. Every step contains a form component in its `form` slot.

```html
<dile-steps-form title="New order" endpoint="/api/orders/1">
  <dile-step-form label="Customer" endpoint="/api/orders/1/customer">
    <order-customer-form slot="form"></order-customer-form>
  </dile-step-form>
  <dile-step-form
    label="Shipping"
    endpoint="/api/orders/1/shipping"
    alternativeExit
    alternativeExitLabel="Save as draft"
  >
    <order-shipping-form slot="form"></order-shipping-form>
  </dile-step-form>
  <dile-step-form label="Summary" endpoint="/api/orders/1/summary" endLabel="Place order">
    <order-summary-form slot="form"></order-summary-form>
  </dile-step-form>
</dile-steps-form>
```

This is how it works:

1. When `endpoint` is set, `dile-steps-form` loads the resource with a GET request and calls `setData()` on the form of every step.
2. When the user presses the next button, the step sends the result of the form `getData()` to its own endpoint (PATCH by default).
3. If the step is saved, the container moves to the next step. Validation errors are displayed in the form with `showErrors()`.
4. When the last step is saved, the container dispatches `dile-steps-form-complete`. The component does not navigate anywhere: listen to this event to decide what to do next.

### Form requirements

The form inside every step must implement `getData()`, `setData(data)` and `showErrors(errors)`, the same contract used by [dile-ajax-form](/crud/ajax-form/). You can get all of them applying the [DileForm mixin](/mixins/dile-form-mixin/) of `@dile/ui`.

Every form receives the whole resource in `setData()`, so each one picks the fields it needs.

### Alternative exit

A step can show a secondary action with the `alternativeExit` and `alternativeExitLabel` properties, for example "Save as draft". It saves the step and finishes the wizard, dispatching `dile-steps-form-complete` with `alternativeExit: true`, even if it is not the last step.

When the alternative exit is used, the step adds the field `alternativeExit: true` to the data sent to the server. You can change the name of that field with `alternativeExitField`, or set it to an empty string to not send it.

### Sharing data between steps

By default the forms only receive data when the resource is loaded. If a step needs the data returned by the server when another step is saved, set the `refreshOnSave` attribute on it.

```html
<dile-step-form label="Lines" endpoint="/api/invoices/1/lines" refreshOnSave>
  <invoice-lines-form slot="form"></invoice-lines-form>
</dile-step-form>
```

> Only use `refreshOnSave` when the server returns the data that the form needs. Otherwise the form could lose the values it was displaying.

You can also call the `reload()` and `setData()` methods of the container.

## dile-steps-form

### Properties

- **endpoint**: String, URL of the resource loaded with a GET request to fill the forms.
- **title**: String, title displayed in the header, before the label of the current step.
- **steps**: Array, labels of the steps. Optional: by default the `label` of every `dile-step-form` is used.
- **current**: Number, zero-based index of the current step.
- **reached**: Number, highest step index reached.
- **freeNavigation**: Boolean, every step can be selected in the steps indicator, regardless of `reached`.
- **vertical**: Boolean, displays the steps indicator in a vertical layout.
- **prevLabel**, **nextLabel**, **endLabel**: String, default labels for the navigation buttons of every step.
- **responseAdapter**: Object, a [response adapter](/crud/response-adapter/) for the load request. If set, it is also used by every step.
- **hideFeedback**: Boolean, hides the inline feedback messages.
- **language**: String, language of the default texts (`en` or `es`). It is passed to every step.

### Methods

- **navigateTo(index)**: Shows the step at the given index.
- **next()** / **prev()**: Shows the next or the previous step, without saving.
- **reload()**: Loads the resource again from `endpoint`.
- **setData(data)**: Sets the same data in the form of every step.

### Custom Events

- **dile-steps-form-loading**: Dispatched when the load request starts and ends. The detail has a `loading` boolean.
- **dile-steps-form-loaded**: Dispatched when the resource has been loaded and set in the forms. The detail has the loaded `data`.
- **dile-steps-form-error**: Dispatched when the resource could not be loaded. The detail has `message`, `data`, `errors` and the HTTP `status`, so you can tell a 404 apart from other errors.
- **dile-steps-form-complete**: Dispatched when the last step is saved, or when a step is saved with the alternative exit. The detail has the `data` returned by the server and the `alternativeExit` boolean.

## dile-step-form

### Properties

- **label**: String, label of the step in the steps indicator and in the header.
- **endpoint**: String, URL where the data of the step is saved.
- **method**: String, HTTP method used to save the step. Default `patch`.
- **alternativeExit**: Boolean, shows the alternative exit action.
- **alternativeExitLabel**: String, text of the alternative exit action. The action is only displayed when it has a label.
- **alternativeExitField**: String, name of the field added to the data when the alternative exit is used. Default `alternativeExit`. Empty to not send it.
- **prevLabel**, **nextLabel**, **endLabel**: String, labels of the navigation buttons of this step. `endLabel` is used in the last step.
- **refreshOnSave**: Boolean, the form of this step receives the data returned when another step is saved.
- **sendDataAsFormData**: Boolean, sends the data as `FormData` (for file uploads).
- **responseAdapter**: Object, a [response adapter](/crud/response-adapter/) for the save request.

The container sets `active`, `step`, `steps` and `language` on every step, so you don't need to set them.

### Methods

- **next()**: Saves the step and, if it is saved, moves forward.
- **alternativeNext()**: Saves the step with the alternative exit.

### Custom Events

- **dile-step-form-loading**: Dispatched when the save request starts and ends. The detail has a `loading` boolean.
- **dile-step-form-success**: Dispatched when the step is saved. The detail has the `message` and the `data` returned by the server.
- **dile-step-form-error**: Dispatched when the step could not be saved. The detail has `message`, the validation `errors` and the HTTP `status`.

All these events bubble and are composed, so you can listen to them on `dile-steps-form` or on any ancestor.

## Labels and translations

The labels of the buttons are resolved in this order: the label of the step, the label defined in the container and the translation of the current `language` ("Previous", "Next" and "Finish" in English). The feedback messages use the message of the server or, if there is none, a translated default text.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-steps-form-header-font-size | Font size of the header | 1rem
--dile-steps-form-header-color | Color of the header | --dile-on-background-color or #303030
--dile-steps-form-title-font-weight | Font weight of the title in the header | 600
--dile-steps-form-feedback-margin-top | Margin top of the inline feedback | 1rem
--dile-step-next-prev-margin-top | Margin top of the navigation buttons | 1.5rem
--dile-step-alternative-exit-color | Color of the alternative exit action | --dile-link-color

The navigation buttons are placed in a row when the step is wider than 420px, and in a column otherwise (container query).

The steps indicator can be customized with the [dile-steps CSS custom properties](/components/dile-steps/).

### Attributes for Styling

- **hidefeedback**: When this attribute is set, the container does not display feedback messages.

## Configuration

`dile-steps-form` and `dile-step-form` use [dile-ajax](/crud/ajax/) to make the requests, so they work with the [Axios configuration](/crud/axios-configuration/) of the rest of the CRUD components.

## dile-steps-form demo

The repository includes a [complete demo](https://github.com/Polydile/dile-components/blob/master/demos/crud/dile-steps-form.html) that uses an in-memory API, with validation errors, the alternative exit and a summary step with `refreshOnSave`.
