---
title: Password
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

Type your password inherits all the properties, events and styles from @dile/dile-input component. So the docs are the same in both components.

The only diferece between [dile-input](/components/dile-input) and dile-password is that dile-passsword acts as a password form field.

## dile-password demo

### Default input password

```html:preview
<dile-password
  name="password_name"
  label="Password"
  placeholder="Write your password"
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