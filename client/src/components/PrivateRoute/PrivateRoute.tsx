/**
 * The PrivateRoute component is a React functional component that checks if a user is authenticated
 * and has the required role to access a certain route, and redirects them accordingly.
 * @param  - - `React` is the default import from the "react" package, which is used to create React
 * components.
 * @returns The PrivateRoute component is returning the children components if the user is
 * authenticated and has the required role. If the user is not authenticated, it returns a redirect to
 * the login page. If the user is authenticated but doesn't have the required role, it returns a
 * redirect to the project list page.
 */
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
