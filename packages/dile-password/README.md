# @dile/dile-password

Input password form field web component.

```
<dile-password label="The label" placeholder="Type your password"></dile-password>
```

## Install

```
npm install @dile/dile-password
```

## Usage

### Import the component

Into your HTML page

```
<script src="./node_modules/@dile/dile-password/dile-password.js" type="module"></script>

```

...Or into your module script

```
import '@dile/dile-password/dile-password';
```

## Use the component

```
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

The only diferece between dile-input and dile-password is that dile-passsword acts as a password form field.