---
title: Request Adapter
tags: configuration
order: 3
---

# Request Adapter Object

CRUD components typically use standard REST API practices for requests, sending data directly in the body of the HTTP request. However, there are two types of requests that involve sending specific data formats, which may not align with the standard operations of a REST API. These requests might require configuration to adapt them to the needs of your web service.

To ensure this library can work with any web service, a `requestAdapter` object is used to convert the payload of these special requests into the format required by your backend.

## Default requestAdapter Object

A default `requestAdapter` object exists that simply sends the data as it is prepared by the CRUD components.

This object is created through an instance of the `RequestApiAdapter` class. You can [view the `RequestApiAdapter` class on GitHub](https://github.com/Polydile/dile-components/blob/master/packages/crud/lib/RequestApiAdapter.js).

This object does not perform any specific transformations, but it has been created so that when implementing CRUD components, it can be swapped out and adapted to various web services.

## How to Customize the requestAdapter

To customize the `requestAdapter`, you can create an object with the same methods as `RequestApiAdapter`, either from scratch or by extending the class.

The methods of this object are:

- **adaptListRequestData(data)**: This method should return the data sent via QueryString to the server to configure sorting, filtering, or page sizes.
- **adaptIdsRequestData(data)**: This method should return the payload when you need to receive the IDs of the items that require batch operations.

Next, you should instantiate an object of your custom adapter and provide it in the configuration object under the `requestAdapter` property.

```javascript
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { RequestApiAdapter } from '@dile/crud/lib/RequestApiAdapter';

class BoardGameRequestApiAdapter extends RequestApiAdapter {
  // overwrite desired methods
}

export const boardGameConfig = new CrudConfigBuilder('https://timer.escuelait.com/api/board-games', {
  requestAdapter: new BoardGameRequestApiAdapter(),
});
```

### Data Format Prepared by the CRUD System

The methods of the `requestAdapter` object receive data in a specific format and must return the data in the format that your REST API requires.

#### Data Sent to the `adaptListRequestData` Method

When invoking the `adaptListRequestData(data)` method, the data will be sent in an object that can be represented by the following example:

```json
{
    "per_page": 25,
    "keyword": "",
    "filters": [
        {
            "name": "continent",
            "label": "Continent",
            "active": false,
            "value": false,
            "type": "select",
            "options": [
                {
                    "name": "Europe",
                    "label": "Europe"
                },
                {
                    "name": "Africa",
                    "label": "Africa"
                }
            ]
        }
    ],
    "sortField": "name",
    "sortDirection": "desc"
}
```

#### Data Sent to the `adaptIdsRequestData` Method

When invoking the `adaptIdsRequestData(data)` method, the format of the data sent can be represented as follows:

```json
{
    "keyword": "",
    "filters": [
        {
            "name": "essential",
            "label": "Is essential",
            "active": false,
            "value": false,
            "type": "boolean"
        }
    ]
}
```