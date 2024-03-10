import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client_RegistrationPage } from './app/Client_Registration/pages/client_registration/index';
import { client_profile } from "./app/Client_Registration/pages/client_profile";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Client_RegistrationPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
