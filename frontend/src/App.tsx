import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';
import { ShoppingCartPage } from './app/Shopping_cart/pages/ShoppingCartPage/index';

const router = createBrowserRouter([
  {
    path: "/client/home",
    Component: HomePage,
  },
  {
    path: "/shopping_cart",
    Component: ShoppingCartPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
