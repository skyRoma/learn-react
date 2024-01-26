import { useContext } from 'react';
import { Button } from './UI/button';
import { CartContext } from '../store/CartContext';

export const Header = () => {
  const { items } = useContext(CartContext);

  const totalItemsAmount = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button>Cart ({totalItemsAmount})</Button>
      </nav>
    </header>
  );
};
