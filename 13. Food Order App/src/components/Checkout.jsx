import { useContext, useActionState } from 'react';
import { CartContext } from '../store/CartContext';
import { Modal } from './UI/Modal';
import { currencyFormatter } from '../util/formatting';
import { UserProgressContext } from '../store/UserProgressContext';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import { useHttp } from '../hooks/useHttp';
import { Error } from './Error';

// declared outside of component to avoid the infinite loop in the useHttp hook
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const Checkout = () => {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(CartContext);

  const { sendRequest, error, data, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  );

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const checkoutAction = async (prevState, formData) => {
    const data = Object.fromEntries(formData.entries());

    await sendRequest({ order: { items, customer: data } });
  };

  const [formState, formAction, isLoading] = useActionState(checkoutAction, null);

  const handleFinish = () => {
    hideCheckout();
    clearCart();
    clearData();
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={hideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data) {
    return (
      <Modal open={progress === 'checkout'} onClose={hideCheckout}>
        <h2>Order submitted!</h2>
        <p>Your order was submitted successfully</p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={hideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};
