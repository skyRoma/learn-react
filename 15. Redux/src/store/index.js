import { createStore } from 'redux';

const initialState = { counter: 0, isVisible: true };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'INCREASE':
      return { ...state, counter: state.counter + action.amount };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'TOGGLE':
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};

export const store = createStore(counterReducer);
