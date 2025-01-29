import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) 
{
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated&& document.cookie) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}