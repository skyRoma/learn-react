import { createContext, useState } from 'react';

export const UserProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
  const [progress, setProgress] = useState('');

  const showCart = () => {
    setProgress('cart');
  };

  const hideCart = () => {
    setProgress('');
  };

  const showCheckout = () => {
    setProgress('checkout');
  };

  const hideCheckout = () => {
    setProgress('');
  };

  const contextValue = {
    progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
};
