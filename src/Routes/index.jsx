import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";

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
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "homepage",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
    ],
  },
]);
