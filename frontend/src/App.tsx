import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';
import { InitialPage } from './app/Login/pages/InitialPage/index';

const router = createBrowserRouter([
  {
    path: "/clients/login",
    Component: HomePage,
  },
  {
    path: "*",
    Component: InitialPage,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
