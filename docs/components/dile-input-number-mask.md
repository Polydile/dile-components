---
title: Input Number Mask
tags: forms
---

# dile-input-number-mask

A web component that creates a customized numeric input field with automatic formatting applied via a mask pattern. The component separates the user-editable value (clean numbers) from the displayed value (formatted with mask characters).

```html
<dile-input-number-mask 
  label="Phone" 
  placeholder="Type your telephone" 
  mask="00 000-00-00"
></dile-input-number-mask>
```

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/input/input-number-mask.js';
```

Use it in your HTML:

```html
<dile-input-number-mask
  name="phone"
  label="Phone Number"
  placeholder="Enter your number"
  mask="00 000-00-00"
></dile-input-number-mask>
```

## Properties

- **mask** (String): Defines the input format. Use `0` to represent positions where users can enter digits. Other characters define the fixed mask pattern.
  - Example: `"00 000-00-00"` requires 10 digits total
  - Example: `"0000 0000 0000 0000"` for card numbers (16 digits)
  - Example: `"000-00-0000"` for SSN format

- **value** (String): The actual numeric data **without mask formatting**. This is what gets sent to your backend or form submission. Updates automatically as the user types.
  - Example: User types `121234567` → `value = "121234567"`

- **maskedValue** (String, read-only): The value **with mask formatting applied**. This is the visual representation shown in the input field.
  - Example: User types `121234567` with mask `"00 000-00-00"` → `maskedValue = "12 123-45-67"`

- **label** (String): Text displayed above the input field
- **placeholder** (String): Hint text shown inside the empty input
- **disabled** (Boolean): Disables the input field
- **readonly** (Boolean): Makes the input read-only
- **errored** (Boolean): Applies error styling to the input
- **message** (String): Error or informational message displayed below the input
- **hideErrorOnInput** (Boolean): Automatically clears the error state when the user starts typing

## Inherited Properties

This component extends `dile-input`, so it inherits many useful properties:

- **name** (String): The form field name attribute
- **focusOnStart** (Boolean): Automatically focus the input when the component initializes
- **selectOnFocus** (Boolean): Automatically select all text when the input receives focus
- **disableAutocomplete** (Boolean): Disable browser autocomplete
- **labelRight** (String): Text displayed to the right of the input
- All CSS custom properties from `dile-input` (see [dile-input component](/components/dile-input))

## Events

- **enter-pressed**: Fired when the user presses the Enter key
- **input**: Standard HTML input event (fires as the user types)
- **change**: Fired when the value changes (inherited from dile-input)

```javascript
const input = document.querySelector('dile-input-number-mask');

input.addEventListener('enter-pressed', () => {
  console.log('User pressed Enter');
  console.log('Value (without mask):', input.value);
});

input.addEventListener('input', (e) => {
  console.log('Current masked display:', input.maskedValue);
  console.log('Current raw value:', input.value);
});
```

## Behavior & Features

### Smart Cursor Positioning

The component automatically maintains intuitive cursor positioning:
- Cursor stays aligned with digit positions when formatting is applied
- Users can edit at any cursor position, not just at the end
- Text selection and replacement work naturally
- Copy/paste operations are supported (non-numeric characters are automatically filtered)

### Input Validation

Only numeric characters (0-9) are allowed:
- Non-numeric keypresses are prevented
- Paste operations containing non-numeric characters are cleaned automatically
- The component respects the maximum number of digits defined by the mask

### Mask Examples

| Mask | Input | maskedValue | value | Use Case |
|------|-------|-------------|-------|----------|
| `00 000-00-00` | 121234567 | 12 123-45-67 | 121234567 | Phone (10 digits) |
| `0000 0000 0000 0000` | 1111222233334444 | 1111 2222 3333 4444 | 1111222233334444 | Credit card |
| `000-00-0000` | 1234567890 | 123-45-6789 | 1234567890 | US SSN format |
| `+00 (000) 000-00-00` | 121234567890 | +12 (123) 456-78-90 | 121234567890 | International phone |

## Common Use Cases

### Basic Phone Input with Validation

```html:preview
<script type="module">
import '@dile/ui/components/input/input-number-mask.js';
</script>
<dile-input-number-mask 
  name="phone"
  label="Phone Number" 
  placeholder="Enter your 10-digit phone number" 
  mask="00 000-00-00"
></dile-input-number-mask>
```

### Credit Card with Error Handling

```html:preview
<dile-input-number-mask 
  name="card"
  label="Credit Card Number"
  placeholder="16-digit card number"
  mask="0000 0000 0000 0000"
  message="Enter a valid 16-digit card number"
></dile-input-number-mask>
```

### Pre-filled Value

```html:preview
<dile-input-number-mask 
  label="Account Number" 
  value="1234567890"
  mask="00 000-00-00"
></dile-input-number-mask>
```

### Disabled State

```html:preview
<dile-input-number-mask 
  label="Read-only Account" 
  value="121234567"
  mask="00 000-00-00"
  disabled
></dile-input-number-mask>
```

### With Form Submission

```javascript
const form = document.querySelector('form');
const phoneInput = form.querySelector('dile-input-number-mask');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the clean numeric value for your backend
  const phoneNumber = phoneInput.value;
  console.log('Sending to backend:', phoneNumber); // e.g., "121234567"
  
  // The maskedValue is only for display
  console.log('User sees:', phoneInput.maskedValue); // e.g., "12 123-45-67"
});
```

## CSS Customization

Inherit all CSS custom properties from `dile-input`:

```css
dile-input-number-mask {
  --dile-input-label-color: #333;
  --dile-input-border-color: #ccc;
  --dile-input-border-width: 2px;
  --dile-input-focus-ring-color: rgba(102, 170, 255, 0.5);
  --dile-input-error-border-color: #c00;
  --dile-input-padding: 8px;
  --dile-input-font-size: 1.1em;
}
```

## Methods

- **focus()**: Programmatically focus the input field
- **clearError()**: Clear any error state and message

```javascript
const input = document.querySelector('dile-input-number-mask');

// Focus the input
input.focus();

// Clear error after validation
input.errored = false;
input.message = '';
// Or use the helper method
input.clearError();
```
