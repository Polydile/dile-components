---
layout: layout.html
title: Redux user slice
---

# Redux user slice

Using @dile/lib, you can manage the logged-in user state in a page or application.

## User slice implementation

The implementation of the user slice is detailed on the [Redux utilities implementation](/lib/redux-implementation) page of @dile/lib.

## State managed by the user slice

This slice manages the `user` object within the Redux store.

In this object, you’ll find several properties that identify not just the user data, but also their current authentication state.

The initial data structure of this `user` object is as follows:

```json
{
  userData: null,
  token: '',
  isLoggedIn: false,
  isInitialized: false
}
```

- `userData`: stores an object with user data, which may vary depending on your application needs or backend response.  
- `token`: a field where you can store the session token.  
- `isLoggedIn`: indicates whether the user is currently logged in.  
- `isInitialized`: shows whether the user state has already been determined or whether it’s still initializing (waiting to confirm if the session is active or not).

## Using the slice with Redux actions

To update the user state, several actions are already available in the slice. Typically, your authentication service will need to call them after performing backend operations for login, verification, or logout.

## storeUser(user)

This action stores the user data in the store. It expects an object containing the logged-in user’s data.

```javascript
import { store } from '../redux/store';
import { storeUser } from '@dile/lib';

store.dispatch(storeUser(user));
```

## removeUser()

This action removes the user data from the store and marks the user as logged out. It also clears any stored token.

```javascript
import { store } from '../redux/store';
import { removeUser } from '@dile/lib';

store.dispatch(removeUser());
```

## storeToken(token)

This action stores the authentication token in the store. It expects the token as a parameter.

```javascript
import { store } from '../redux/store';
import { storeToken } from '@dile/lib';

store.dispatch(storeToken(token));
```

## setInitialized()

This action marks the user state as initialized. It’s useful to indicate that the initial authentication status check has been completed.

```javascript
import { store } from '../redux/store';
import { setInitialized } from '@dile/lib';

store.dispatch(setInitialized());
```