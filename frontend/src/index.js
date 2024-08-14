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

//If changing source files then change here
import Home from "./routes/Home";
import Reports from "./routes/users/Reports";
import Navbar from "./components/Navbar.js";
import Appointments from "./routes/users/Appointments";
import TransacHistory from "./routes/users/TransacHistory";
import Schedules from "./routes/admins/Schedules.js";
import Services from "./routes/admins/Services.js";
import Login from "./routes/Login";
import Register from "./routes/Register";
import PendingAppointment from "./routes/admins/PendingAppointment.js";
import CompleteAppointment from "./routes/admins/CompleteAppointment.js";
import "./App.css";


const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

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
      {
        path: "transactionhistory",
        element: <TransacHistory />,
      },
      {
        path: "pendingappointment",
        element: <PendingAppointment />,
      },
      {
        path: "completeappointment",
        element: <CompleteAppointment />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);