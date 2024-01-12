import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.productId
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.productId
        );
        updatedItems.push({
          id: action.payload.productId,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    case 'UPDATE_ITEM_QUANTITY': {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity === 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    default:
      return state;
  }
}

export const CartContextProvider = ({ children }) => {
  const [shoppingCartState, dispatchShoppingCart] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItem(productId) {
    dispatchShoppingCart({ type: 'ADD_ITEM', payload: { productId } });
  }

  function handleUpdateItemQuantity(productId, amount) {
    dispatchShoppingCart({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { productId, amount },
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItem: handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
