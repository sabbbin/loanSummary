import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../zustard";

export default function Logout() {
  let { access_token, logoutFunc } = useAuthenticationStore((state) => state);

  let navigate = useNavigate();
  let { isSuccess } = useMutation(() =>
    axios
      .get("api/logout", {
        headers: {
          Authentication: "bearer " + access_token,
        },
      })
      .then((res) => res.data)
  );
  if (isSuccess) {
    logoutFunc();
    navigate("/login");
  }
}
