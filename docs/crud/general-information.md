---
title: General information
tags: introduction
order: 0
---

# Crud Components

@dile/crud is a package that contains components for easily creating dynamic CRUD systems with a rich user experience.

It is a collection of components designed generically so that adaptable CRUD systems can be created for most web services based on REST APIs.

## How to use the Crud Components

Using the CRUD components provided by this library is as simple as using web components, where you declaratively specify the functionalities you want to implement, directly in the HTML code.

There are components for making simple Ajax connections, forms that automatically submit via Ajax, components for performing insertions, updates, deletions or listings, and even complete CRUD systems. Each component is thoroughly detailed on its documentation page. Additionally, you will find various usage examples for each component to help you better understand how to implement them.

### Based on Axios library

The CRUD components in this package are based on a well-known frontend library for making asynchronous connections to web services, called [Axios](https://axios-http.com/).

> You don't need to be familiar with the Axios library, as the CRUD components, especially the `dile-ajax` component, wrap that library.

Each project may require different Axios configurations, so this package is open to various setups to adapt to the needs of each application and web services.

## CRUD CLI

To use CRUD components in a more comfortable and agile way, you can rely on the CLI that allows generating the *scaffolding* for each of the pieces of the CRUD system.

You can find summarized information on how to install this tool on the dedicated [CRUD CLI](/cli/) page.

### Generating Components for Entity Management

There is a command that allows you to create the scaffolding for all the components needed to manage a CRUD entity at once—from the list component, the single component with item details, to the forms for inserting and editing the entity.

For example, if you want to create the components for managing the users entity CRUD, you can run this command:

```bash
dile g-entity user --endpoint=https://example.com/api/users
```

In addition to the necessary components, this command creates the [resource configuration module](https://dile-components.com/crud/resource-config/) with default settings that you can quickly edit.

## CRUD Configuration

Due to the complexity of operations and the need to adapt to different types of projects, it is important to consider some configuration aspects.

- On the [Axios Configuration page](/crud/axios-configuration/), you will find detailed information on how to configure this library to tailor requests to the requirements of your project or API.
- On the [response adapter page](/crud/response-adapter/), you will find detailed information on how to process JSON responses of your API REST, so that the CRUD components can find the data they need to function properly.
- On the [request adapter page](/crud/request-adapter/), you will find detailed information on how to adapt to the request data objects of your API REST.
- On the [resource configuration object page](/crud/resource-config/), you will find information on how to configure the more complex components to adapt to the specific characteristics of the resources exposed by the API.
- On the [actions configuration page](/crud/actions-configuration/), you will find information on how to configure batch actions.

## CRUD Components

Once you have configured the CRUD system, you gain access to a complete set of components for performing all kinds of operations, without having to repeat the same code for every entity you need to manage.

The more complex components, which can give you a clearer idea of what you can achieve, are the [main component](/crud/crud-component/) (which groups all CRUD operations) and the [single component](/crud/crud-single/), which allows you to view a specific resource item and access its various management actions.

In addition to these complex components, there are elements capable of performing each of the typical operations needed in an admin page individually—from core components like [dile-ajax](/crud/ajax/) to more specialized ones like [dile-image-uploader](/crud/image-uploader/), to name just two examples.