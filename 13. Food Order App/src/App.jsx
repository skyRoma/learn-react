import { Header } from './components/Header';
import { Meals } from './components/Meals';
import { CartContextProvider } from './store/CartContext';

export const App = () => {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
};
