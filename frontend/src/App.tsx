import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantRegistrationPage from "./app/restaurant_registration/pages/restaurant_registration";
import RestaurantProfilePage from "./app/restaurant_registration/pages/restaurant_profile";
import { HomePage } from "./app/Shopping_cart/pages/HomePage/index";
import { InitialPage } from './app/Login/pages/InitialPage/index';
import { LoginClientPage } from "./app/Login/pages/LoginClient/index";
import { LoginRestaurantPage } from "./app/Login/pages/LoginRestaurant/index";
import { OrdersPage } from './app/OrderCancellation/pages/index';
import { RecoverPasswordPage } from './app/RecoverPassword/index';
import { CodePage } from "./app/RecoverPassword/Code";
import { NewPasswordPage } from "./app/RecoverPassword/NewPassword";
import { RecoverPasswordClientPage } from './app/RecoverPasswordClient/index';
import { CodeClientPage } from "./app/RecoverPasswordClient/CodeClient";
import { NewPasswordClientPage } from "./app/RecoverPasswordClient/NewPasswordClient";

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
    path: "/restaurants/recover",
    Component: RecoverPasswordPage,
  },
  {
    path: "/restaurants/recover/code",
    Component: CodePage,
  },
  {
    path: "/restaurants/recover/update",
    Component: NewPasswordPage,
  },
  {
    path: "/clients/recover",
    Component: RecoverPasswordClientPage,
  },
  {
    path: "/clients/recover/code",
    Component: CodeClientPage,
  },
  {
    path: "/clients/recover/update",
    Component: NewPasswordClientPage,
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
    path: "/restaurant/registration",
    Component: RestaurantRegistrationPage,
  },
  {
    path: "/restaurant/profile",
    Component: RestaurantProfilePage,
  },
  {
    path: "order",
    Component: OrdersPage,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
