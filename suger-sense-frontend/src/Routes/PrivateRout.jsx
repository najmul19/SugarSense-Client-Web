import React from "react";
import useAuth from "../api/Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRout = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <p>.......loading</p>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRout;
