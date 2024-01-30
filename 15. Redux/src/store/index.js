import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counter';
import { authSlice } from './auth';

export const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});
