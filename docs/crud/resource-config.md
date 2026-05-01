---
title: Resource config
tags: configuration
order: 4
---

# Resource Configuration Object

The more advanced components in the CRUD library require a configuration object that provides various properties and methods necessary for customizing their functionality.

This configuration object is typically used for each API resource you want to manage with the CRUD system.

## Generating CRUD Resource Config

Using the Dile CLI, you can quickly generate the configuration object for CRUD system components.

1. [Install the CLI as indicated on this page](/cli/)
2. Run the command `dile g-resource-config <resource>`

Example:

```bash
dile g-resource-config country --endpoint https://example.com/api/countries
```

Find more information on `g-resource-config` configurations using the following help command:

```bash
dile g-resource-config --help
```

## Default Configuration

There are default definitions for the configuration object, which can be found in the `lib/defaultConfig.js` file. See the [default config file on GitHub](https://github.com/Polydile/dile-components/blob/master/packages/crud/lib/defaultConfig.js).

It is entirely possible to follow the format defined in that file to create a custom configuration object. However, the library offers a class called `CrudConfigBuilder` that simplifies this task.

## CrudConfigBuilder Class

This class allows you to build a configuration object more easily. By invoking the class constructor, you can define specific configuration values for a resource. The constructor accepts two arguments:

- The URL of the resource's API endpoint
- The custom configuration object

```javascript
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
const countryConfig = new CrudConfigBuilder('https://example.com/api/countries', {});
```

These two argument values will be merged with the default configurations, so if you do not specify any value in the second argument, the default values will always be set.

Additionally, any value in the configuration object provided as the second argument will override the values in the default configuration object.

Once the `CrudConfigBuilder` instance is created, you can call the `getConfig()` method to obtain the configuration object.

```javascript
countryConfig.getConfig();
```


## Creating a Configuration Module for Each Resource

Since the configuration object is usually the same for each resource, it may be useful to create an independent module for each resource. This same configuration object can be used across different components, such as the listing component, the item detail component, or a complete CRUD component.

Here is an example of creating a configuration module that exports the object to access the configuration of a resource:

```javascript
import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';

export const countryConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/countries', {
  templates: {
    item: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
    insertForm: () => html`<demo-country-form id="insertform"></demo-country-form>`,
    updateForm: () => html`<demo-country-form id="updateform"></demo-country-form>`,
  },
  customization: {
    disablePagination: true,
  },
  sort: {
    options: [
      {
        name: 'name',
        label: 'Name',
        direction: 'desc'
      },
    ],
    initialSortField: 'name',
  },
  availableFilters: [
    {
      name: 'essential',
      label: 'Is essential',
      active: false,
      value: false,
      type: 'boolean',
    },
    {
      name: 'continent',
      label: 'Continent',
      active: false,
      value: false,
      type: 'select',
      options: [
        {
          value: 'Europe',
          label: 'Europe'
        },
        {
          value: 'Africa',
          label: 'Africa'
        },
        {
          value: 'Asia',
          label: 'Asia'
        },
      ]
    },
  ],
});
```

This module can be used to define configurations specific to the `countries` resource, including templates for items and forms, pagination settings, sorting options, and filters.

## Adapting to API Responses

The `responseAdapter` property in the configuration object is an object that defines how the CRUD system will extract data from the REST API responses.

The default configuration object for the resource provides a `responseAdapter` that works with typical REST API responses. However, you can create a custom version of this object by extending the base `ResponseApiAdapter` class.

For more information, refer to the page dedicated to the [`responseAdapter` object](/crud/response-adapter/).



## Configuration properties

Here is a complete list of the configuration object properties that can be supplied for the resource.




### Property `availableFilters`

This property is used to define the filters that the `dile-crud` component will offer.

Filter configuration allows two types of filters that generate different query interfaces, either with checkboxes or select boxes. In the following example, you can see a filter configuration:

```json
availableFilters: [
  {
    type: 'boolean',
    name: 'column',
    label: 'Column',
    active: false,
    value: false,
  },
  {
    type: 'select',
    name: 'column2',
    label: 'Column 2',
    active: false,
    value: false,
    options: [
      {
        value: '1',
        label: 'Value 1'
      },
      {
        value: '2',
        label: 'Value 2'
      },
    ]
  },
],
```

> When filters are enabled in the CRUD component, requests are made to the API sending the filter state through the query string.

#### Default `availableFilters` value

By default, `availableFilters` is an empty array.

```javascript
availableFilters: []
```


### Property `insertOperation`

This property defines how the insert button behaves in the `dile-crud` component. By default, when the insert button is clicked, a modal opens with the form for inserting the entity being managed. However, you can define any other behavior you wish, such as navigating to another page where the insert content is displayed.

To do this, `insertOperation` accepts an object with a property called `type`. By setting the `type` value to `handler`, you can define a handler to execute custom code when the Insert button is pressed. Here’s an example:

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


### Property `maxBatchActionItems`

This property sets the maximum number of items that can be selected for batch actions in the CRUD component.

It is used to show or hide the component that allows users to select all items in the current page or all items in a resource.

Note: The component itself does not check the number of items the user selects. This validation must be performed on the backend before processing the batch actions.

This is useful to prevent users from performing batch operations on an excessive number of items at once, which could impact performance.

#### Default value

By default, `maxBatchActionItems` is set to `100`.

```javascript
maxBatchActionItems: 100
```

You can override this value in your resource configuration object if you need a different limit for your use case.



### Property `requestAdapter`

This property allows adapting the requests sent from the CRUD system to the API endpoints, so that it can communicate with the web service in the required way.

There is a detailed page with explanations about the [request adapter](/crud/request-adapter/).

#### Default `requestAdapter` value

The default configuration creates a generic request adapter using an instance of the `RequestApiAdapter` class.

```javascript
new RequestApiAdapter()
```

### Property `responseAdapter`

This property allows adapting the API responses that the CRUD system communicates with. Thanks to this object, the components can work with any API, regardless of how its responses are structured.

On this site you can find a detailed page explaining [how to create the response adapter](/crud/response-adapter/).

#### Default `responseAdapter` value

The default configuration creates a generic response adapter using an instance of the `ResponseApiAdapter` class.

```javascript
new ResponseApiAdapter()
```






### Documentation in progress

This documentation is a work in progress.