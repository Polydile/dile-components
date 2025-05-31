import { createSlice } from '@reduxjs/toolkit';

const MODAL_DEFAULT_MESSAGE = {
  message: '',
  icon: null,
  iconClass: null,
  label: 'Close',
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    message: null,
    loading: false,
    modalMessage: null,
    modalOpened: false,
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
    },
    modalMessage(state, action) {
      state.modalMessage = {
        ...MODAL_DEFAULT_MESSAGE,
        ...action.payload,
      }
      state.modalOpened = true;
    },
    modalClose(state) {
      state.modalOpened = false;
    }
  }
});

export const {
  negativeFeedback,
  positiveFeedback,
  neutralFeedback,
  startLoading,
  stopLoading,
  modalMessage,
  modalClose,
} = feedbackSlice.actions;