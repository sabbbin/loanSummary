import React from "react";
import { useAuthenticationStore } from "../zustard";
import { Navigate, useNavigate } from "react-router-dom";

export function AuthGuard({ component }: any) {
  let { loginstatus } = useAuthenticationStore((state) => state);
  return loginstatus == "IsLoggedIn" ? (
    React.createElement(component)
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
