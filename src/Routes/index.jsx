import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import Connections from "../pages/Connections";
import Jobs from "../pages/Jobs";

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
        path: "profile/:userEmail",
        element: <UserProfile />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
    ],
  },
]);
