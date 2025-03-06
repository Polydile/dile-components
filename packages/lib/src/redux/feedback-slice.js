import { createSlice } from '@reduxjs/toolkit';

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    message: null,
    loading: false,
  },
  reducers: {
    positiveFeedback(state, action) {
      state.message = {
        status: 'success',
        msg: action.payload,
      }
    },
    negativeFeedback(state, action) {
      state.message = {
        status: 'error',
        msg: action.payload,
      }
    },
    neutralFeedback(state, action) {
      state.message = {
        status: 'neutral',
        msg: action.payload,
      }
    },
    startLoading(state)  {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  negativeFeedback,
  positiveFeedback,
  neutralFeedback,
  startLoading,
  stopLoading,
} = feedbackSlice.actions;