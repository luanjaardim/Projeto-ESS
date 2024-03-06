import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client_RegistrationPage } from './app/Client_Registration/pages/client_registration/index';

const router = createBrowserRouter([
  {
    path: "*",
    Component: Client_RegistrationPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
