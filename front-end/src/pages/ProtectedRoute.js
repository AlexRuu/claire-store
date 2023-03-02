import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
