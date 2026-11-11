---
title: Actions
tags: operations
element: dile-crud-actions
package: '@dile/crud'
summary: Displays and processes the batch actions available for a CRUD list.
---

# dile-crud-actions

The `dile-crud-actions` component is responsible for displaying and processing batch actions that can be performed on CRUD elements.

Normally, you don't need to use this component on its own, as it is used internally by the `dile-crud` component to handle batch actions. However, we document it because you might want to listen to the custom events it dispatches, in order to display corresponding feedback messages to the user.

### Properties

- **fullWidth**: Boolean, reflected as the `full-width` attribute. When `true`, the "Actions" button that opens the batch actions menu takes the full available width and always shows its label (also on small screens, where the icon-only version is used otherwise). `dile-crud-single` enables it automatically in the `sidebar` layout. Default: `false`.

### Custom Events

- **crud-action-requested**: This custom event is dispatched when the user requests to open an action form. It fires when clicking on the "Run action" button. The event detail includes the following data:

```json
{
    action, // The name of the action that was requested to be opened.
}
```

- **crud-action-success**: This custom event is dispatched after receiving a positive response from the server when processing an action. The event detail includes the following data:

```json
{
    msg, // The message returned by the server.
    action, // The name of the action that was processed, useful as certain actions may require response behaviors like interface refreshes or redirections.
    data: // Additional data that may be returned by the server.
}
```

- **crud-action-error**: This custom event is dispatched when there is an error in processing the action by the server. The event detail includes the following data:

```json
{
    msg, // The message returned by the server.
}
```