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
import Events from "./routes/admins/Events.js";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component



const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  // Routes that do not require authentication
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  // Protected routes that require authentication and roles
  {
    path: "",
    element: <ProtectedRoute allowedRoles={["User", "Admin"]} />, // Allow both User and Admin roles
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "services",
            element: <ProtectedRoute allowedRoles={["Admin"]} />, 
            children: [
              { path: "", element: <Services /> },  // path: "" = default component sa url
            ]
          },

          {
            path: "appointments",
            element: <ProtectedRoute allowedRoles={["User"]} />, 
            children: [
              { path: "", element: <Appointments /> },
            ]
          },
          {
            path: "schedules",
            element: <ProtectedRoute allowedRoles={["Admin"]} />, 
            children: [
              { path: "", element: <Schedules /> },
            ]
          },
          {
            path: "transactionhistory",
            element: <ProtectedRoute allowedRoles={["User"]} />,
            children: [
              { path: "", element: <TransacHistory /> },
            ]
          },
          {
            path: "pendingappointment",
            element: <ProtectedRoute allowedRoles={["Admin"]} />, 
            children: [
              { path: "", element: <PendingAppointment /> },
            ]
          },
          {
            path: "completeappointment",
            element: <ProtectedRoute allowedRoles={["Admin"]} />, 
            children: [
              { path: "", element: <CompleteAppointment /> },
            ]
          },
          {
            path: "events",
            element: <ProtectedRoute allowedRoles={["Admin"]} />, 
            children: [
              { path: "", element: <Events /> },
            ]
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);