import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import Connections from "../pages/Connections";
import Jobs from "../pages/Jobs";
import About from "../pages/About";
import ComingSoon from "../pages/ComingSoon";
import Settings from "../pages/Settings";

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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "notifications",
        element: <ComingSoon feature="Notifications" />,
      },
      {
        path: "messages",
        element: <ComingSoon feature="Messages" />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
