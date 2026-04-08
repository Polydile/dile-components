---
layout: layout.html
title: Lib Components and mixins
---

# Lib Components and mixins

@dile/lib is a package that contains components for easily creating apps, integrating common features with minimal effort.

This library contains a collection of tools for frontend application development. Its goal is to cover areas such as feedback message handling, user management, and making it easier to develop routes in the routing system, among others.

## CLI

The dile-components organization provides a [CLI for generating a complete starter kit](/cli/), to build an application that implements all the utilities from the `@dile/lib` package.

With the `dile create-app` command, you can generate the code for an application that includes preconfigured feedback components, components for user registration and login, a routing system implementation, a guard for pages protected for registered users, and much more.

It is the most convenient and fastest way to start taking advantage of the utilities in `@dile/lib`, removing all the boilerplate code so you can begin working on a new application right away.

## What does @dile/lib offer?

This package provides a set of core features for applications, including:

<dile-card class="mb-3">

### 1) Redux slices for managing basic application features:

- `UserSlice`, for user management
- `FeedbackSlice`, for handling feedback messages and loading states

</dile-card>
<dile-card class="mb-3">

### 2) Components that work with the Redux store:

- Components for displaying feedback messages
- Components for showing loading indicators

</dile-card>
<dile-card class="mb-3">

### 3) Components to help with routing system features:

- A route guard that protects components from unauthorized access, redirecting to a configurable route when the user is not authenticated or lacks the required permissions
- Link components that activate the routing system when clicked

</dile-card>
<dile-card class="mb-3">

### 4) Utility mixins:

- For navigation using the routing system
- To remove boilerplate code related to routing
- To easily send feedback messages and loading states
- To sync components with the Redux store

</dile-card>

## Dependencies of @dile/lib

While other components and utilities from Dile Components are designed to work independently, without enforcing a specific technology stack beyond Web Components and Lit, `@dile/lib` does define a couple of extra key dependencies that must be used to unlock its full potential:

- Redux and Redux Toolkit
- Lit Router

In any case, by using this library of modules, components, and mixins, starting a new app will be much faster than building everything from scratch. The benefits clearly justify the additional dependencies added to your project.

## Getting started

To start using `@dile/lib`, you need to install the package:

```bash
npm install @dile/lib
```


### Redux Implementation Guides

Once installed, we recommend beginning with Redux implementation in your application, using the store generation utilities provided by this library.

You can find more information on the [Redux implementation page](/lib/redux-implementation/).

### Routing Guides

If you're developing a frontend SPA application where you'll implement a routing system, **@dile/lib** offers a mixin to register routes conveniently.

You can find the guide to [implement the routing system](/lib/router-implementation/).