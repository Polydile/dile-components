---
title: Radio Group Dialog
package: '@dile/ui'
element: '&lt;dile-radio-group-dialog&gt;'
status: stable
summary: A radio button group component displayed in a card dialog format with optional title and description. Extends dile-radio-group with enhanced UI presentation.
tags: forms
---

# dile-radio-group-dialog

A specialized radio button group component that presents options in a card-based dialog format with optional title and description. This component extends `dile-radio-group` to provide a more visually organized interface for selecting a single option.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/radio-group/radio-group-dialog.js';
```

Use the component with `dialogItems` array.

```html
<dile-radio-group-dialog
  name="plan"
  title="Select Your Plan"
  description="Choose the plan that best fits your needs"
  .dialogItems=${[
    { value: 'basic', label: 'Basic Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan' }
  ]}
></dile-radio-group-dialog>
```

## Properties

### Component Properties

- **name**: Element name attribute
- **title**: *(Optional)* Main title displayed at the top of the dialog
- **description**: *(Optional)* Descriptive text displayed below the title
- **value**: *(Optional)* The currently selected radio value
- **dialogItems**: Array of option objects with the following structure:
  ```javascript
  [
    {
      value: 'unique-value',      // Required: value for the form
      label: 'Display Label',     // Required: visible label text
      description: 'Details...'   // Optional: additional description
    }
  ]
  ```
  **Note:** The `label` property is mandatory for each item. It will be displayed aligned with the radio button icon.
- **disabled**: Boolean to disable all radio options
- **message**: Text message to display below the options (typically for validation errors)
- **errored**: Boolean property to indicate error state
- **hideErrorOnInput**: Boolean to automatically clear error message on selection

## Inherited from dile-radio-group

This component inherits all behavior from `dile-radio-group`, including:
- Form association and HTML form element integration
- Custom event dispatching
- Error handling and validation support

## Custom Events

- **dile-radio-group-changed**: Dispatched when the value changes. Detail contains:
  ```javascript
  {
    name: 'element-name',
    value: 'selected-value'
  }
  ```

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-radio-group-dialog-title-color | Title text color | var(--dile-on-background-color, #303030)
--dile-radio-group-dialog-title-font-size | Title font size | 1.25rem
--dile-radio-group-dialog-title-font-weight | Title font weight | 600
--dile-radio-group-dialog-description-color | Description text color | var(--dile-on-background-color, #303030)
--dile-radio-group-dialog-description-font-size | Description font size | 0.95rem
--dile-radio-group-dialog-description-margin-bottom | Description bottom margin | 1.5rem
--dile-radio-group-dialog-item-margin-bottom | Spacing between items | 1rem
--dile-radio-group-dialog-item-gap | Gap between radio icon and text (row, column) | 0.5rem 0.75rem
--dile-radio-group-dialog-item-label-color | Item label text color | var(--dile-on-background-color, #303030)
--dile-radio-group-dialog-item-label-font-size | Item label font size | 1rem
--dile-radio-group-dialog-item-label-font-weight | Item label font weight | 500
--dile-radio-group-dialog-item-description-color | Item description text color | var(--dile-gray-dark-color, #555555)
--dile-radio-group-dialog-item-description-font-size | Item description font size | 0.875rem
--dile-radio-group-dialog-item-description-margin-top | Description top margin | 0.5rem

Card container styles can be customized through `dile-card` custom properties like `--dile-card-background-color`, `--dile-card-border`, etc.

## dile-radio-group-dialog demos

### Basic Dialog

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html } from 'lit';

class BasicDialogExample extends LitElement {
  render() {
    return html`
      <dile-radio-group-dialog
        name="plan"
        title="Select Your Plan"
        description="Choose the plan that best fits your needs"
        .dialogItems=${[
          { value: 'basic', label: 'Basic Plan' },
          { value: 'pro', label: 'Pro Plan' },
          { value: 'enterprise', label: 'Enterprise Plan' }
        ]}
      ></dile-radio-group-dialog>
    `;
  }
}
customElements.define('basic-dialog-example', BasicDialogExample);
</script>
<basic-dialog-example></basic-dialog-example>
```

### With Item Descriptions

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html } from 'lit';

class DescriptionsExample extends LitElement {
  render() {
    return html`
      <dile-radio-group-dialog
        name="service"
        title="Choose a Service"
        description="Select the service that meets your requirements"
        .dialogItems=${[
          { 
            value: 'standard', 
            label: 'Standard Support',
            description: 'Email support within 48 hours'
          },
          { 
            value: 'priority', 
            label: 'Priority Support',
            description: 'Phone and email support with 4-hour response time'
          },
          { 
            value: 'vip', 
            label: 'VIP Support',
            description: '24/7 dedicated support with guaranteed 1-hour response'
          }
        ]}
      ></dile-radio-group-dialog>
    `;
  }
}
customElements.define('descriptions-example', DescriptionsExample);
</script>
<descriptions-example></descriptions-example>
```

### With Initial Value

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html } from 'lit';

class InitialValueExample extends LitElement {
  render() {
    return html`
      <dile-radio-group-dialog
        name="frequency"
        value="monthly"
        title="Billing Frequency"
        .dialogItems=${[
          { value: 'monthly', label: 'Monthly Billing' },
          { value: 'quarterly', label: 'Quarterly Billing' },
          { value: 'annual', label: 'Annual Billing' }
        ]}
      ></dile-radio-group-dialog>
    `;
  }
}
customElements.define('initial-value-example', InitialValueExample);
</script>
<initial-value-example></initial-value-example>
```

### Disabled State

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html } from 'lit';

class DisabledExample extends LitElement {
  render() {
    return html`
      <dile-radio-group-dialog
        disabled
        name="disabled-demo"
        title="This Dialog is Disabled"
        description="You cannot select any option here"
        .dialogItems=${[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' }
        ]}
      ></dile-radio-group-dialog>
    `;
  }
}
customElements.define('disabled-example', DisabledExample);
</script>
<disabled-example></disabled-example>
```

### With Styling

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html, css } from 'lit';

class StyledExample extends LitElement {
  static styles = css`
    .styled-dialog {
      --dile-radio-group-dialog-title-color: #0c758c;
      --dile-radio-group-dialog-title-font-weight: 700;
      --dile-radio-group-dialog-item-label-color: #288ea5;
      --dile-radio-group-dialog-item-label-font-weight: 600;
      --dile-radio-group-dialog-item-description-color: #555555;
      --dile-card-background-color: #f9f9f9;
      --dile-card-border: 2px solid #0c758c;
      --dile-radio-icon-color: #20e073;
      --dile-radio-selected-icon-color: #0c758c;
    }
  `;

  render() {
    return html`
      <dile-radio-group-dialog
        class="styled-dialog"
        name="theme"
        title="Select Your Theme"
        description="Customize your interface appearance"
        .dialogItems=${[
          { 
            value: 'light', 
            label: 'Light Theme',
            description: 'Bright and clean interface'
          },
          { 
            value: 'dark', 
            label: 'Dark Theme',
            description: 'Easy on the eyes in low-light environments'
          },
          { 
            value: 'auto', 
            label: 'Auto (System Default)',
            description: 'Follows your system preferences'
          }
        ]}
      ></dile-radio-group-dialog>
    `;
  }
}
customElements.define('styled-example', StyledExample);
</script>
<styled-example></styled-example>
```

### Error State

```html:preview
<script type="module">
import '@dile/ui/components/radio-group/radio-group-dialog.js';
import { LitElement, html } from 'lit';

class ErrorStateExample extends LitElement {
  render() {
    return html`
      <dile-radio-group-dialog
        id="group"
        hideErrorOnInput
        name="demo"
        title="Select an Option"
        .dialogItems=${[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' }
        ]}
      ></dile-radio-group-dialog>
      <button @click="${this.validate}">Validate</button>
    `
  }

  validate() {
    const group = this.renderRoot.getElementById('group');
    if (!group.value) {
      group.message = 'Please select an option';
      group.errored = true;
    }
  }
}
customElements.define('error-state-example', ErrorStateExample);
</script>
<error-state-example></error-state-example>
```
