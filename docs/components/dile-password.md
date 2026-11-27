---
title: Password
package: '@dile/ui'
element: '&lt;dile-password&gt;'
status: stable
summary: Password input component extending dile-input. Includes optional show/hide password toggle for improved user experience.
tags: forms
---

# dile-password

Input password form field web component.

## Install

```bash
npm install @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/password/password.js';
```

Use the component

```html
<dile-password
  name="password_name"
  label="Text to the label"
  value="Text to the password"
  placeholder="Some text"
  disabled
  errored
></dile-password>
```

`dile-password` inherits all the properties, events and styles from [dile-input](/components/dile-input) (`readonly`, `accessibleLabel`, `labelRight`, `selectOnFocus`, form integration...). The only difference is that it acts as a password form field.

Use `autocomplete` to help password managers: `current-password` in login forms, `new-password` in sign up or change password forms.

```html
<dile-password name="password" label="New password" autocomplete="new-password"></dile-password>
```

## Show/Hide Password Toggle

The `dile-password` component includes an optional feature to toggle password visibility. Enable it with the `showPasswordToggle` property.

### Properties

- **showPasswordToggle** (Boolean): Enable the show/hide password toggle button. Defaults to `false`.
- **passwordVisible** (Boolean): Current state of password visibility. Defaults to `false`.

### Example with toggle

```html
<dile-password
  name="password_name"
  label="Password"
  placeholder="Write your password"
  showPasswordToggle
></dile-password>
```

### Events

- **password-visibility-changed**: Dispatched when the user clicks the toggle button. Includes detail with `visible` property indicating the current state.

```javascript
const passwordInput = document.querySelector('dile-password');
passwordInput.addEventListener('password-visibility-changed', (e) => {
  console.log('Password visible:', e.detail.visible);
});
```

### CSS Custom Properties

The toggle button can be customized using CSS custom properties:

| Property | Description | Default |
|----------|-------------|---------|
| `--dile-password-toggle-padding` | Button padding | Inherits from `--dile-input-padding` |
| `--dile-password-toggle-margin` | Button margin | 0 5px |
| `--dile-password-toggle-color` | Icon color | Inherits from `--dile-input-color` |
| `--dile-password-toggle-width` | Button width | 32px |
| `--dile-password-toggle-height` | Button height | 32px |
| `--dile-password-toggle-border-radius` | Button border radius | Inherits from `--dile-input-border-radius` |
| `--dile-password-toggle-transition` | Button transition | background-color 0.2s |
| `--dile-password-toggle-hover-bg` | Hover background color | rgba(0, 0, 0, 0.05) |
| `--dile-password-toggle-active-bg` | Active background color | rgba(0, 0, 0, 0.1) |
| `--dile-password-toggle-icon-size` | Icon size | 20px |

## dile-password demo

### Default input password

```html:preview
<dile-password
  name="password_name"
  label="Password"
  placeholder="Write your password"
></dile-password>
```

### Password with show/hide toggle

```html:preview
<dile-password
  name="password_name"
  label="Password"
  placeholder="Write your password"
  showPasswordToggle
></dile-password>
```

### Errored input password

```html:preview
<dile-password
  name="password_name"
  label="Password"
  placeholder="Write your password"
  value="123456"
  errored
  message="The password does not match"
></dile-password>
```

### Password with toggle and error

```html:preview
<dile-password
  name="password_name"
  label="Confirm password"
  placeholder="Write your password"
  showPasswordToggle
  errored
  message="Passwords do not match"
></dile-password>
```