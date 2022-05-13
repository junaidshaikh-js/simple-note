import React from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../../context";

type RequireAuthProps = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { uid } = useAuth();
  const location = useLocation();
  const from = location;

  if (
    (location.pathname === "/login" || location.pathname === "signup") &&
    uid
  ) {
    return <Navigate to="/" />;
  } else if (
    (location.pathname === "/login" || location.pathname === "signup") &&
    !uid
  ) {
    return <>{children}</>;
  }

  return uid ? <>{children}</> : <Navigate to="/login" state={from} replace />;
};
