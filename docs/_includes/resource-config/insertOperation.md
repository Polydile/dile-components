This property defines how the insert button behaves in the `dile-crud` component. By default, when the insert button is clicked, a modal opens with the form for inserting the entity being managed. However, you can define any other behavior you wish, such as navigating to another page where the insert content is displayed.

To do this, `insertOperation` accepts an object with a property called `type`. By setting the `type` value to `handler`, you can define a handler to execute custom code when the Insert button is pressed. Here's an example:

```javascript
insertOperation: {
  type: "handler",
  handler: (crudComponent) => {
    navigateService.goToUrl('/create-invoice');
  }
},
```

> Note that the `handler` function receives the `dile-crud` component itself, allowing you to interact with the panel if needed.

#### Default value

The default value of `insertOperation` causes a modal window to open when the insert button is clicked.

```json
insertOperation: {
  type: 'modal'
},
```
