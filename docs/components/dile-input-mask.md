---
title: Input Mask
tags: forms
---

# dile-input-mask

A generic web component for creating customizable input fields with mask patterns that support both letters and numbers. The component automatically formats user input according to the mask pattern while keeping the raw value clean (without formatting characters) for backend submission.

```html
<dile-input-mask 
  label="IBAN" 
  placeholder="ES9121 2345 6789 0123 4567" 
  mask="AA00 0000 0000 0000 0000"
></dile-input-mask>
```

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/input/input-mask.js';
```

Use it in your HTML:

```html
<dile-input-mask
  name="iban"
  label="IBAN"
  placeholder="Enter your IBAN"
  mask="AA00 0000 0000 0000 0000"
></dile-input-mask>
```

## Mask Syntax

The mask pattern defines which characters are expected at each position:

- **`A`** (uppercase letter): Accepts any letter (a-z, A-Z) and transforms to UPPERCASE
- **`a`** (lowercase letter): Accepts any letter (a-z, A-Z) and transforms to lowercase  
- **`0`** (digit): Accepts any digit (0-9)
- **Other characters**: Fixed literal characters that appear automatically in the formatted display (spaces, hyphens, etc.)

### Case Transformation

The component automatically transforms letters to the case specified by the mask pattern:

```html
<!-- Will transform all letters to uppercase -->
<dile-input-mask mask="AA00 0000"></dile-input-mask>

<!-- Will transform all letters to lowercase -->
<dile-input-mask mask="aa00 0000"></dile-input-mask>

<!-- Mixed case: first two uppercase, next two lowercase -->
<dile-input-mask mask="AA-aa-00"></dile-input-mask>
```

When a user types "ab12cd" with mask "AA-aa-00", the component:
1. Validates that each position receives the correct type (letter or digit)
2. Transforms the case: "AB-cd-12"
3. Stores the transformed value: "ABcd12"

### Mask Examples

| Mask | Format | Use Case | Max Input |
|------|--------|----------|-----------|
| `AA00 0000 0000 0000 0000` | ES91 0000 0000 0000 0000 | IBAN (Spain) | 26 chars |
| `AA0 0AA` | SW1 1AA | UK Postcode | 6 chars |
| `(000) 000-0000` | (555) 123-4567 | US Phone | 10 chars |
| `AA-0000-AA` | AB-1234-XY | Product Code | 8 chars |
| `0000-AA-AA` | 2024-EX-PI | License Plate | 8 chars |

## Properties

### Core Properties

- **mask** (String, required): The mask pattern defining the format
  - Example: `"AA00 0000 0000 0000 0000"` for IBAN
  - Must contain at least one `A` (letter) or `0` (digit)

- **value** (String): The raw input value **without formatting characters**. This is what gets sent to your backend.
  - Example: User types `ES9121` with mask `"AA00 0000..."` → `value = "ES9121"`

- **maskedValue** (String, read-only): The formatted value **with mask characters applied**. This is the visual display.
  - Example: User types `ES9121` → `maskedValue = "ES91 21..."`

- **language** (String, default `"en"`): Sets the language for error messages
  - Supported languages: `"en"` (English), `"es"` (Spanish), `"fr"` (French), `"de"` (German), `"cat"` (Catalan)
  - Error messages adapt automatically based on this setting

### Standard Input Properties

- **label** (String): Text displayed above the input field
- **placeholder** (String): Hint text shown inside the empty input
- **disabled** (Boolean): Disables the input field
- **readonly** (Boolean): Makes the input read-only
- **name** (String): The form field name attribute
- **errored** (Boolean): Applies error styling
- **message** (String): Error or informational message displayed below the input
- **hideErrorOnInput** (Boolean): Automatically clears error state when user starts typing
- **labelRight** (String): Text displayed to the right of the input
- **focusOnStart** (Boolean): Automatically focus on initialization
- **selectOnFocus** (Boolean): Select all text when focused
- **disableAutocomplete** (Boolean): Disable browser autocomplete

All standard `dile-input` properties are inherited. See [dile-input](/components/dile-input) for more details and CSS customization options.

## Events

- **enter-pressed**: Fired when user presses Enter
- **input**: Standard HTML input event (fires as user types)
- **change**: Fired when value changes
- **blur**: Fired when input loses focus (validation occurs here)

```javascript
const input = document.querySelector('dile-input-mask');

input.addEventListener('enter-pressed', () => {
  console.log('User pressed Enter');
});

input.addEventListener('blur', () => {
  // Validation happens on blur - check errored state
  if (input.errored) {
    console.log('Invalid format:', input.message);
  } else {
    console.log('Valid input:', input.value);
  }
});
```

## Validation Behavior

The component uses intelligent validation that only alerts when something is definitively wrong:

### ✅ No Error Shown While Typing
- User starts with correct format (e.g., `ES`) - no error
- User types `ES91` - no error (incomplete but valid so far)
- No premature error messages while the user is still typing

### ❌ Error Shown When Invalid
- User types `9ES...` - error immediately (starts with digit instead of letter for IBAN)
- User types `ES9X...` - error on blur (X is not a valid digit)
- Error message indicates what went wrong and what format is expected

```javascript
const input = document.querySelector('dile-input-mask');

input.addEventListener('input', (e) => {
  // Check validity as user types
  const validation = input.maskController.validate(input.value);
  if (!validation.valid && input.maskController.isComplete(input.value)) {
    console.log('Format error:', validation.error);
  }
});

input.addEventListener('blur', () => {
  // Final validation on blur
  if (input.errored) {
    console.log('Please correct the format');
  }
});
```

## Common Use Cases

### IBAN Input

```html:preview
<script type="module">
import '@dile/ui/components/input/input-mask.js';
</script>
<dile-input-mask 
  name="iban"
  label="International Bank Account Number (IBAN)"
  placeholder="e.g., ES9121 2345 6789 0123 4567"
  mask="AA00 0000 0000 0000 0000"
  message="Country code (2 letters) + Check digits (2) + IBAN (22 digits)"
></dile-input-mask>
```

### IBAN with Spanish Error Messages

```html:preview
<dile-input-mask 
  name="iban-es"
  label="IBAN (con mensajes en español)"
  placeholder="e.g., ES9121 2345 6789 0123 4567"
  mask="AA00 0000 0000 0000 0000"
  language="es"
  message="Código de país (2 letras) + Dígitos de control (2) + IBAN (22 dígitos)"
></dile-input-mask>
```

### UK Postcode

```html:preview
<dile-input-mask 
  name="postcode"
  label="UK Postcode"
  placeholder="e.g., SW1A 1AA"
  mask="AA0 0AA"
></dile-input-mask>
```

### Product Code with Validation

```html:preview
<dile-input-mask 
  name="product"
  label="Product Code"
  placeholder="e.g., AB-1234-XY"
  mask="AA-0000-AA"
  message="Format: 2 letters - 4 digits - 2 letters"
></dile-input-mask>
```

### License Plate

```html:preview
<dile-input-mask 
  name="plate"
  label="License Plate"
  placeholder="e.g., 2024-EX-PI"
  mask="0000-AA-AA"
></dile-input-mask>
```

## Form Submission Example

```html
<form id="myForm">
  <dile-input-mask 
    name="iban"
    label="IBAN"
    mask="AA00 0000 0000 0000 0000"
  ></dile-input-mask>
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const ibanInput = document.querySelector('dile-input-mask');
  
  // Get clean value for backend (no formatting characters)
  const cleanIBAN = ibanInput.value;
  console.log('Sending to backend:', cleanIBAN);
  // Output: "ES9121234567890123456" (no spaces)
  
  // Get formatted version for display
  console.log('User sees:', ibanInput.maskedValue);
  // Output: "ES91 2123 4567 8901 2345 6" (with spaces)
  
  // Submit the clean value
  fetch('/api/account', {
    method: 'POST',
    body: JSON.stringify({ iban: cleanIBAN })
  });
});
</script>
```

## Internationalization

The component supports multiple languages for validation error messages:

| Language | Code | Example Error Message |
|----------|------|----------------------|
| English (default) | `en` | Position 1: expected a letter but got "9" |
| Spanish | `es` | Posición 1: se esperaba una letra pero recibió "9" |
| French | `fr` | Position 1 : lettre attendue mais reçu "9" |
| German | `de` | Position 1: Buchstabe erwartet, aber "9" erhalten |
| Catalan | `cat` | Posició 1: s'esperava una lletra però va rebre "9" |

### Language Switching Example

```javascript
const input = document.querySelector('dile-input-mask');

// Change language dynamically
input.language = 'es'; // Switch to Spanish error messages
input.language = 'fr'; // Switch to French error messages
```

The language property affects:
- Format validation error messages
- Position-specific error descriptions (e.g., "expected a letter" vs. "se esperaba una letra")
- Generic format descriptions displayed when validation fails

All other text (label, placeholder, message) should be managed by your application, as they're HTML attributes.he formatted version
  console.log('User sees:', ibanInput.maskedValue);
  // Output: "ES91 2123 4567 8901 2345 6" (with spaces)
  
  // Submit the clean value
  fetch('/api/account', {
    method: 'POST',
    body: JSON.stringify({ iban: cleanIBAN })
  });
});
</script>
```

## CSS Customization

Inherit all CSS custom properties from `dile-input`:

```css
dile-input-mask {
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

- **focus()**: Programmatically focus the input
- **clearError()**: Clear error state and message

```javascript
const input = document.querySelector('dile-input-mask');

// Focus the input
input.focus();

// Clear error
input.clearError();
```

## Differences from dile-input-number-mask

| Feature | dile-input-mask | dile-input-number-mask |
|---------|-----------------|------------------------|
| Letter support | ✅ Yes | ❌ No |
| Number-only masks | ✅ Yes | ✅ Yes |
| Mixed alphanumeric | ✅ Yes | ❌ No |
| Generic patterns | ✅ Yes | ❌ Number-focused |
| Use case | IBAN, postcodes, codes | Phone, card numbers |
