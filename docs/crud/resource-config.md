---
title: Resource config
tags: configuration
order: 4
---

# Resource Configuration Object

The more advanced components in the CRUD library require a configuration object that provides various properties and methods necessary for customizing their functionality.

This configuration object is typically used for each API resource you want to manage with the CRUD system.

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

## Available configuration options




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