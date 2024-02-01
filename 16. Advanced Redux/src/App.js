import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Cart } from './components/Cart/Cart';
import { Layout } from './components/Layout/Layout';
import { Products } from './components/Shop/Products';
import { Notification } from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

export const App = () => {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {isCartVisible && <Cart />} <Products />
      </Layout>
    </>
  );
};
