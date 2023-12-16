import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({children}) => {
  const [isLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  return isLoggedIn ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
