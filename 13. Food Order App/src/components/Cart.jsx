import { useContext } from 'react';
import { Modal } from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import { Button } from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';
import { CartItem } from './CartItem';

export const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal
      className="cart"
      open={progress === 'cart'}
      onClose={progress === 'cart' ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAdd={addItem}
            onRemove={removeItem}
          />
        ))}
      </ul>

      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};
