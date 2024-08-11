---
title: Crud component
tags: main
---

# dile-crud

The `dile-crud` component is the primary tool for building the CRUD system, combining various components from this library to implement the full functionality of a create, read, update, and delete (CRUD) system.

Additionally, `dile-crud` also offers batch operation management through the definition of action components.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the dile-crud component.

```javascript
import '@dile/crud/components/crud/crud.js';
```
Use the component.

```html
<dile-crud
  .config=${this.config}
></dile-crud>
```

### Properties

Aquí tienes la descripción de las propiedades:

- **config**: Object, the configuration object that customizes the behavior and functionality of the CRUD system.
- **actionIds**: Array, the list of IDs for the items selected for batch operations.
- **keyword**: String, the search keyword used to filter the items in the CRUD system.
- **hasHelp**: Boolean, indicates whether help or additional guidance is provided within the CRUD system.
- **editUrl**: Boolean, determines if the CRUD system should use an edit URL for navigating to the item editing page.
- **loading**: Boolean, indicates whether the CRUD system is currently loading data or performing an operation.