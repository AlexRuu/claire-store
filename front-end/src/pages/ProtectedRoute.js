import React from "react";
import { useAuthContext } from "../context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
