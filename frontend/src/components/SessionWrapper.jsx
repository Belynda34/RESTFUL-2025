import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SessionWrapper = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    return <Outlet />;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

export default SessionWrapper;
