import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { RootLayout } from './pages/Root';
import { Error } from './pages/Error';
import { ProductDetailPage } from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
