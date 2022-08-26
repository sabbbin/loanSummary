import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../zustard";

export default function Logout() {
  let { access_token, logoutFunc } = useAuthenticationStore((state) => state);

  let navigate = useNavigate();
  let { data, isSuccess, mutate } = useMutation(() =>
    axios
      .get("api/logout", {
        headers: {
          Authorization: "bearer " + access_token,
        },
      })
      .then((res) => res.data)
  );
  useEffect(() => {
    mutate();
  }, []);
  if (isSuccess) {
    logoutFunc();
    navigate("/login");
  }
  return <div>Error in logut</div>;
}
