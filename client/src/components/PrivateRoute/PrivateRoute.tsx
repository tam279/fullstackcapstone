import React from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../../problemdomain/Interface/Interface";

type PrivateRouteProps = {
  roles: Role[];
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, children }) => {
  const userRole = localStorage.getItem("userRole") as Role;
  const isAuthenticated = !!localStorage.getItem("jwtToken"); // Using !! to convert truthy or falsy value to boolean

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    // User doesn't have the required role, redirect to project list page
    return <Navigate to="/projectlistpage" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
