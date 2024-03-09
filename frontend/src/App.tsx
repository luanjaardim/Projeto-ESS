import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';
import { InitialPage } from './app/Login/pages/InitialPage/index';
import { LoginClientPage } from "./app/Login/pages/LoginClient/index";
import { LoginRestaurantPage } from "./app/Login/pages/LoginRestaurant/index";

const router = createBrowserRouter([
  {
    path: "/client/home",
    Component: HomePage,
  },
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
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
