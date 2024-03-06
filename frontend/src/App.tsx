import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./app/home/pages/Landing";
import RestaurantRegistrationPage from "./app/restaurant_registration/pages/restaurant_registration";
import RestaurantProfilePage from "./app/restaurant_registration/pages/restaurant_profile";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Landing,
  },
  {
    path: "/restaurant/register",
    Component: RestaurantRegistrationPage,
  },
  {
    path: "/restaurant/profile",
    Component: RestaurantProfilePage,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
