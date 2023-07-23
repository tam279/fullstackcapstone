import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Role } from "../../problemdomain/Interface/Interface"; // Change this to your correct path

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
