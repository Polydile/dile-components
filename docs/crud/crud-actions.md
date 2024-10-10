---
title: Actions
tags: operations
---

# dile-crud-actions

The `dile-crud-actions` component is responsible for displaying and processing batch actions that can be performed on CRUD elements.

Normally, you don't need to use this component on its own, as it is used internally by the `dile-crud` component to handle batch actions. However, we document it because you might want to listen to the custom events it dispatches, in order to display corresponding feedback messages to the user.

### Custom Events

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