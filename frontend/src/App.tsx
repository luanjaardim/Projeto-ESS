import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';
import { OrdersPage } from './app/OrderCancellation/pages/index';

const router = createBrowserRouter([
  {
    path: "/client/home",
    Component: HomePage,
  },
  {
    path: "order",
    Component: OrdersPage,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
