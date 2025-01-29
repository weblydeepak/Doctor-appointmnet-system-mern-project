import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated && document.cookie) {
    return children;
  } else {
   
    return <Navigate to="/login" />;
  }
}