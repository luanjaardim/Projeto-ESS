import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';
import { InitialPage } from './app/Login/pages/InitialPage/index';
import { LoginClientPage } from "./app/Login/pages/LoginClient/index";
import { LoginRestaurantPage } from "./app/Login/pages/LoginRestaurant/index";
import { OrdersPage } from './app/OrderCancellation/pages/index';

const router = createBrowserRouter([
  {
    path: "/*",
    Component: InitialPage,
  },
  {
    path: "/clients/login",
    Component: LoginClientPage,
  },
  {
    path: "/restaurants/login",
    Component: LoginRestaurantPage,
  },
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
