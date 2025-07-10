import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../Layouts/HomeLayout";
import HomeLayout from "../Layouts/HomeLayout";
export const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homepage",
    element: <HomeLayout />,
  },
]);
