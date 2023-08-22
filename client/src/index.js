import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import "./styles/index.css";
import { developmentEnter, developmentExit } from "../src/components/cursor";

import Cursor from "./components/cursor";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Photography from "./pages/Photography";
import Development from "./pages/Development";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    developmentExit();
  }, [pathname]);
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
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/photography", element: <Photography /> },
      { path: "/development", element: <Development /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
