import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, isVisible: true };

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    decrement(state) {
      state.counter--;
    },
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const counterActions = counterSlice.actions;
