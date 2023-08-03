import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./styles/index.css";

import Cursor from "./components/cursor";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Photography from "./pages/Photography";
import Development from "./pages/Development";

const Layout = () => {
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
