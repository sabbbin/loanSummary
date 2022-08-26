import React from "react";
import { useAuthenticationStore } from "../zustard";
import { Navigate, useNavigate } from "react-router-dom";

export function UserGuard({ component }: any) {
  let { user, loginstatus } = useAuthenticationStore((state) => state);
  return loginstatus == "IsLoggedIn" && user && user.role == "User" ? (
    React.createElement(component)
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
