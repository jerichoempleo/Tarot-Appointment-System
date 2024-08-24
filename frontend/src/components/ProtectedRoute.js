import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = sessionStorage.getItem("jwttoken");
    const roles = sessionStorage.getItem("roles").split(','); // split = converts into array para kung marami man syang role edi visible pa rin sa account nya.

    if (!token) {
        // If no token is found, redirect to the login page
        return <Navigate to="/" replace />;
    }

    // Check if the user has one of the allowed roles
    const hasAccess = roles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
        // If the user doesn't have the appropriate role, redirect to a "Not Authorized" page or home
        return <Navigate to="/home" replace />;
    }

    // If token is present and user has the right role, render the child components (protected content)
    return <Outlet />;
};

export default ProtectedRoute;
