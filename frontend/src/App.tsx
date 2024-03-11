import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantRegistrationPage from "./app/restaurant_registration/pages/restaurant_registration";
import RestaurantProfilePage from "./app/restaurant_registration/pages/restaurant_profile";
import { HomePage } from "./app/Shopping_cart/pages/HomePage/index";
import { InitialPage } from './app/Login/pages/InitialPage/index';
import { LoginClientPage } from "./app/Login/pages/LoginClient/index";
import { LoginRestaurantPage } from "./app/Login/pages/LoginRestaurant/index";
import { OrdersPage } from './app/OrderCancellation/pages/index';
import { Client_RegistrationPage } from './app/Client_Registration/pages/client_registration/index';
import client_profile from "./app/Client_Registration/pages/client_profile";

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
    path: "/restaurants/registration",
    Component: RestaurantRegistrationPage,
  },
  {
    path: "/restaurant/profile",
    Component: RestaurantProfilePage,
  },
  {
    path: "/order",
    Component: OrdersPage,
  },
  {
    path: "/clients/registration",
    Component: Client_RegistrationPage,
  },
  {
    path: "/clients/profile",
    Component: client_profile,
  }

]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}