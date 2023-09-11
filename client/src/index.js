import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import "./styles/index.css";
import { developmentExit } from "../src/components/cursor";

import Cursor from "./components/cursor";
import ErrorPage from "./components/error-page";
import Header from "./pages/components/Header";
import DevelopmentHeader from "./pages/components/DevelopmentHeader";
import PhotographyHeader from "./pages/components/PhotographyHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Photography from "./pages/Photography";
import Development from "./pages/Development";
import Project from "./pages/components/Project";
import DeveloperAdd from "./pages/components/DeveloperAdd";
import DeveloperEdit from "./pages/components/DeveloperEdit";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    developmentExit();
  }, [pathname]);
  if (pathname === "/development") {
    return (
      <>
        <DevelopmentHeader />
        <Cursor />
        <Outlet />
      </>
    );
  }
  if (pathname === "/photography") {
    return (
      <>
        <PhotographyHeader />
        <Cursor />
        <Outlet />
      </>
    );
  }
  return (
    <>
      <Header />
      <Cursor />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/photography", element: <Photography /> },
      { path: "/development", element: <Development /> },
      { path: "/project/:id", element: <Project /> },
      { path: "/addDeveloperProject", element: <DeveloperAdd /> },
      { path: "/updateDeveloperProject/:id", element: <DeveloperEdit /> },

      /*
       * IMPORTANT NOTE
       * Get Values
       * Create new path, based on database records.
       * Import Values to the path component.
       * Process: get Values from DB, then create new path. Open project component pass the values with the correct values.
       */
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
