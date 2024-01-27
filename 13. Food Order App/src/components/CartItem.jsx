import { currencyFormatter } from '../util/formatting';

export const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onRemove(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onAdd(item)}>+</button>
      </p>
    </li>
  );
};
