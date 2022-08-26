import React from "react";
import { useAuthenticationStore } from "../zustard";
import { useNavigate } from "react-router-dom";

let navigate = useNavigate();
export function AuthGuard({ component }: any) {
  let { loginstatus } = useAuthenticationStore((state) => state);
  return loginstatus == "IsLoggedIn"
    ? React.createElement(component)
    : navigate("/login");
}
