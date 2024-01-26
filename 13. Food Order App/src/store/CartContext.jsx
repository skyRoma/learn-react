import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD', item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE', id });
  };

  const cartContextValue = {
    items: cartState.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
