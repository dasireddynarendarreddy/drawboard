import React, { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoute({ user, children }) {
  const toastShownRef = useRef(false);
  
  const len = localStorage.getItem("cookieFallback");

  if (!user && !len) {
    if (!toastShownRef.current) {
      toast.error("You need to log in or register an account!", {
        data: {
          title: "Error toast",
          text: "You have to login or register if you don't have an account!",
        },
      });
      toastShownRef.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
