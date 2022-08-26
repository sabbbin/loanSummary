import React from "react";
import { useAuthenticationStore } from "../zustard";
import { useNavigate } from "react-router-dom";

let navigate = useNavigate();
export function AdminGuard({ component }: any) {
  let user = useAuthenticationStore((state) => state.user);
  return user && user.role == "ADMIN"
    ? React.createElement(component)
    : navigate("/login");
}
