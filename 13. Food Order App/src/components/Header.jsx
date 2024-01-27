import { useContext } from 'react';
import { Button } from './UI/Button';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

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
        <Button onClick={showCart}>Cart ({totalItemsAmount})</Button>
      </nav>
    </header>
  );
};
