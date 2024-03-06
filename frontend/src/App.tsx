import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./app/home/pages/Landing";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Landing,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
