import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './app/Shopping_cart/pages/HomePage/index';

const router = createBrowserRouter([
  {
    path: "*",
    Component: HomePage,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
