This property is a function that determines the identifier value for each resource element in the CRUD system.

The function receives the resource element as a parameter and should return the value that uniquely identifies that element. While the default implementation returns the `id` property, you can customize this to use other identifiers such as `uuid`, `slug`, or any other unique property your API provides.

**Type:** `Function`

**Parameters:**
- `element` (Object): The resource element object

**Returns:** The unique identifier value for the element

**Default Value:**
```javascript
computeItemId(element) {
  return element.id;
}
```

**Example:**

Using a UUID identifier:

```javascript
const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {
  computeItemId(country) {
    return country.uuid;
  },
});
```

Using a slug identifier:

```javascript
const articleConfig = new CrudConfigBuilder('https://example.com/api/articles', {
  computeItemId(article) {
    return article.slug;
  },
});
```

This function is crucial for the CRUD system to properly track and manage individual resource items throughout operations like fetching details, updating, and deleting.
