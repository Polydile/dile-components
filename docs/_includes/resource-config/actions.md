The `actions` property defines the operations that can be performed on resources through the CRUD system. This object contains two types of actions:

- **`actions.list`**: An array of batch actions that can be executed on multiple selected items in list views.
- **`actions.single`**: An array of individual actions that can be executed on a single item in detail views.

#### Basic Structure

```javascript
{
  actions: {
    list: [
      // Batch actions configuration
    ],
    single: [
      // Individual actions configuration
    ]
  }
}
```

Each action object must include a `name` (identifier) and a `label` (display text). Individual actions also support conditional display through the `shouldAppear` function.

For complete information about configuring actions, including all available properties and examples, see the [Actions Configuration](/crud/actions-configuration/) page.
