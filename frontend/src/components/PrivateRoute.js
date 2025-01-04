import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        // If no token, redirect to signIn page
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    // Optionally: You can decode the token to check the user's role if needed
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (!allowedRoles.includes(userRole)) {
        // If the user doesn't have permission, you can redirect to a forbidden page
        return <Navigate to="/forbidden" replace />;
    }

    return children;
}

export default PrivateRoute;
