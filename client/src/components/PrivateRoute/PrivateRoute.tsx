import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Role } from "../../problemdomain/Interface/Interface"; // Change this to your correct path

/**
 * The PrivateRoute component is a React functional component that checks if the user's role is
 * authorized and redirects to the home page if not.
 * @param  - - `roles`: an array of `Role` values that are authorized to access the route.
 * @returns The PrivateRoute component returns the children components if the user's role is included
 * in the roles array. If the user's role is not included in the roles array, it returns a Navigate
 * component that redirects the user to the "/projectlistpage" route.
 */
type PrivateRouteProps = {
  roles: Role[];
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, children }) => {
  const userRole = localStorage.getItem("userRole") as Role;

  if (!roles.includes(userRole)) {
    // role not authorized so redirect to home page
    return <Navigate to="/projectlistpage" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
