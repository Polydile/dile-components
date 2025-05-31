import { configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from '@dile/lib';
import { userSlice } from '@dile/lib';

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer,
    user: userSlice.reducer,
  }
});
