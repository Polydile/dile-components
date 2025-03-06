import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    token: '',
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {
    storeUser(state, action) {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.isInitialized = true;
    },
    removeUser(state) {
      state.userData = null;
      state.isLoggedIn = false;
      state.token = '';
    },
    storeToken(state, action) {
      state.token = action.payload;
    },
    setInitialized(state) {
      state.isInitialized = true;
    }
  }
})

export const { storeUser, removeUser, storeToken, setInitialized } = userSlice.actions;
