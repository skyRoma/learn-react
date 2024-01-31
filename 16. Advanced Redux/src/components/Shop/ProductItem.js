import { useDispatch } from 'react-redux';
import { Card } from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

export const ProductItem = ({ id, name, price, description }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(cartActions.addItemToCart({ id, name, price, description }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};
