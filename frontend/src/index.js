import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Products from "./routes/Products";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Navbar from "./components/Navbar.js";
import Appointments from "./routes/Appointments";
import Schedules from "./routes/Schedules";
import Services from "./routes/Services";
import Login from "./routes/Login";
import Register from "./routes/Register";

import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/reports" element={<Reports />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  //Without Sidebar
  {
    path: "/",
    element: <Login />, //Path for the Initial Page (Pag nirun ung program)
  },
  {
    path: "register",
    element: <Register />,
  },

  //This Section is part of the Sidebar
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "reports",
        element: <Reports />,

      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "schedules",
        element: <Schedules />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);