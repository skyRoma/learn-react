import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { Modal } from './UI/Modal';
import { currencyFormatter } from '../util/formatting';
import { UserProgressContext } from '../store/UserProgressContext';
import { Input } from './UI/Input';
import { Button } from './UI/Button';

export const Checkout = () => {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { items } = useContext(CartContext);

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: { items, customer: data } }),
    });

    event.target.reset();
    hideCheckout();
  };

  return (
    <Modal open={progress === 'checkout'} onClose={hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={hideCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};
