---
title: Steps
package: '@dile/ui'
element: '&lt;dile-steps&gt;'
status: stable
summary: Step indicator for wizards and multi-step processes. Horizontal or vertical layout, navigable or read-only.
tags: menu
---

# dile-steps

Web Component that displays the progress of a process divided into steps, like a checkout, an onboarding or a multi-step form.

It shows a numbered bubble and a label for every step, marks the current one, and lets the user go back to the steps already reached. It can also be used as a read-only status indicator, for example to display the stage of an order.

> If you need a multi-step form that saves every step through Ajax, take a look at [dile-steps-form](/crud/steps-form/) in `@dile/crud`, which uses this component.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/steps/steps.js';
```

Use the component. The `steps` property is an array with the label of every step, so it is usually set with a property binding.

```html
<dile-steps current="1" reached="2"></dile-steps>
<script>
  document.querySelector('dile-steps').steps = ['Cart', 'Shipping', 'Payment'];
</script>
```

The component does not change the current step by itself: listen to `dile-steps-select` and update `current` (and `reached`, if needed).

```javascript
steps.addEventListener('dile-steps-select', (e) => {
  steps.current = e.detail.index;
});
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `steps` | `Array` | `[]` | Labels of the steps. |
| `current` | `Number` | `0` | Zero-based index of the current step. |
| `reached` | `Number` | `0` | Highest step index reached. Steps up to this index are highlighted and can be selected. |
| `freeNavigation` | `Boolean` | `false` | Every step can be selected, regardless of `reached`. |
| `vertical` | `Boolean` | `false` | Displays the steps in a vertical layout. |
| `readonly` | `Boolean` | `false` | Display-only mode. The bubbles are not buttons and no event is dispatched. |

## Custom Events

- **dile-steps-select**: Dispatched when the user clicks on a step that can be selected. The detail has the `index` of the step and its `label`. The event bubbles and is composed.

## Accessibility

- The steps are rendered as a list, and the current step has `aria-current="step"`.
- In navigable mode each bubble is a native button, labelled with the step label and disabled while the step can not be selected.

## CSS Custom Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `--dile-step-size` | Size of the step bubbles | `1.5rem` |
| `--dile-step-font-size` | Font size of the number in the bubbles | `0.8rem` |
| `--dile-step-border-width` | Border width of the bubbles | `2px` |
| `--dile-step-border-color` | Border color of the bubbles not reached | `#ddd` |
| `--dile-step-background-color` | Background color of the bubbles not reached | `--dile-background-color` or `#fff` |
| `--dile-step-text-color` | Number color of the bubbles not reached | `--dile-on-background-color` or `#303030` |
| `--dile-step-reached-background-color` | Background and border color of the reached bubbles | `--dile-primary-color` or `#2962ff` |
| `--dile-step-reached-text-color` | Number color of the reached bubbles | `--dile-on-primary-color` or `#fff` |
| `--dile-step-active-border-color` | Border color of the current bubble, and focus outline | `--dile-primary-dark-color` or `#0039cb` |
| `--dile-step-label-font-size` | Font size of the labels | `0.7rem` (horizontal), `0.85rem` (vertical) |
| `--dile-step-label-color` | Color of the labels | `#606060` |
| `--dile-step-active-label-color` | Color of the current step label | `--dile-step-active-border-color` |
| `--dile-steps-line-color` | Color of the line that joins the steps | `--dile-primary-color` or `#2962ff` |
| `--dile-steps-line-width` | Thickness of the horizontal line | `0.5rem` |
| `--dile-steps-connector-width` | Width of the vertical connectors | `0.35rem` |
| `--dile-steps-connector-height` | Height of the vertical connectors | `1rem` |

## dile-steps demos

### Navigable steps

```html:preview
<script type="module">
import '@dile/ui/components/steps/steps.js';
</script>
<dile-steps id="demosteps"></dile-steps>
<script>
  const demoSteps = document.getElementById('demosteps');
  demoSteps.steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];
  demoSteps.reached = 2;
  demoSteps.addEventListener('dile-steps-select', (e) => {
    demoSteps.current = e.detail.index;
  });
</script>
```

### Vertical layout

```html:preview
<dile-steps id="demovertical" vertical current="1" reached="1"></dile-steps>
<script>
  const demoVertical = document.getElementById('demovertical');
  demoVertical.steps = ['Account', 'Profile', 'Preferences'];
  demoVertical.addEventListener('dile-steps-select', (e) => {
    demoVertical.current = e.detail.index;
  });
</script>
```

### Read-only status

```html:preview
<dile-steps id="demoreadonly" readonly current="2" reached="2"></dile-steps>
<script>
  document.getElementById('demoreadonly').steps = ['Received', 'Preparing', 'Shipped', 'Delivered'];
</script>
```
