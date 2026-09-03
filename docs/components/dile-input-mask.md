---
title: Input Mask
tags: input
excerpt: "Input with customizable mask patterns"
familyIcon: "lucide.book-type"
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

- **`A`** (uppercase letter): Accepts only letters (a-z, A-Z) and transforms to UPPERCASE
- **`a`** (lowercase letter): Accepts only letters (a-z, A-Z) and transforms to lowercase
- **`X`** (uppercase alphanumeric): Accepts letters or digits; letters transform to UPPERCASE
- **`x`** (lowercase alphanumeric): Accepts letters or digits; letters transform to lowercase
- **`0`** (digit): Accepts only digits (0-9)
- **Other characters**: Fixed literal characters (separators like spaces, hyphens) added "lazily" - only when the next block is being filled

### Lazy Separator Behavior

Separators (like `-`, `/`, or spaces) are only added when the user begins typing the next block, not immediately. This is especially useful for **variable-length formats** like IBANs:

```html
<!-- Pattern with lazy separators -->
<dile-input-mask mask="AA-XXXX-0000"></dile-input-mask>
```

Typing behavior:
- User types `ES` → Displays: `ES` (no separator yet)
- User types `ESW` → Displays: `ES-W` (separator added when next block starts)
- User types `ESWSWQ` → Displays: `ES-WSWQ`
- User types `ESWSWQ0` → Displays: `ES-WSWQ-0` (second separator added)

This prevents confusing separators when the user is done entering data, since they control the length.

### Case Transformation Examples

```html
<!-- Uppercase letters only -->
<dile-input-mask mask="AA00 0000"></dile-input-mask>
<!-- User types: ab12cd56 → Display: AB12 CD56, Value: AB12CD56 -->

<!-- Lowercase letters only -->
<dile-input-mask mask="aa00 aa"></dile-input-mask>
<!-- User types: AB12CD → Display: ab12 cd, Value: ab12cd -->

<!-- Flexible alphanumeric with lazy separators -->
<dile-input-mask mask="AA-XXXX-0000"></dile-input-mask>
<!-- User types: ES1234AB5678 → Display: ES-1234-AB78, Value: ES1234AB5678 -->
<!-- User types: ESWSWQ0000 → Display: ES-WSWQ-0000, Value: ESWSWQ0000 -->
```

### Mask Examples

| Mask | Format | Use Case | Max Input |
|------|--------|----------|-----------|
| `AA00 0000 0000 0000 0000` | ES91 0000 0000 0000 0000 | IBAN (Spain) | 26 chars |
| `AA-XXXX-0000-0000` | ES-AB12-0000-0000 | IBAN (Variable) with lazy separators | 14 chars |
| `AA0 0AA` | SW1 1AA | UK Postcode | 6 chars |
| `(000) 000-0000` | (555) 123-4567 | US Phone | 10 chars |
| `AA-0000-AA` | AB-1234-XY | Product Code (letters only) | 8 chars |
| `Xx-0000-Xx` | Ab-1234-Xy | Product Code (flexible alphanumeric) | 8 chars |
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

- **lazySeparators** (Boolean, default `false`): Controls when separators are displayed
  - When `false` (default): Separators appear immediately as the mask structure fills
    - Example: Type `ES` with mask `"AA-XXXX-0000"` → displays `"ES-"`
  - When `true`: Separators only appear when the next input block starts filling
    - Example: Type `ES` with mask `"AA-XXXX-0000"` → displays `"ES"` (no separator yet)
    - Type `ESW` → displays `"ES-W"` (separator added when next block starts)
  - Useful for variable-length input formats where trailing separators can be confusing

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
  placeholder="e.g., ES91 2221 2345 6789 0123 4567"
  mask="AA00 0000 0000 0000 0000 0000"
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

### Variable-Length Input with Lazy Separators

For inputs where users may enter variable amounts of data, use `lazySeparators` to avoid showing trailing separators:

```html:preview
<dile-input-mask 
  name="flexible-code"
  label="Flexible Product Code (with lazy separators)"
  placeholder="e.g., ES-WSWQ-0000 or ES-W"
  mask="AA-XXXX-0000"
  lazySeparators
  message="Format: 2 letters - up to 4 alphanumeric - up to 4 digits"
></dile-input-mask>
```

With `lazySeparators`, the separators only appear when the next block starts:
- Type `ES` → displays `ES`
- Type `ESW` → displays `ES-W` (separator appears)
- Type `ESWSWQ0000` → displays `ES-WSWQ-0000`

Compare this to the default behavior where separators appear immediately (`ES-` when typing just `ES`).

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
