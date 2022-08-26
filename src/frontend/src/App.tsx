import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoanSummary from "./pages/loanSummary";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import PersistentDrawerLeft from "./components/BaseLayout";
import { Apptable } from "./pages/user";
import axios from "axios";
import { useAuthenticationStore } from "./zustard";

export function App() {
  const loginInfoFunction = useAuthenticationStore((state) => state.loginFunc);

  const loginStatus = useAuthenticationStore((state) => state.loginstatus);

  const logoutInfoFunction = useAuthenticationStore(
    (state) => state.logoutFunc
  );

  useEffect(() => {
    const data = async () => {
      await axios
        .get("api/refresh")
        .then((res) => {
          if (res.data) {
            loginInfoFunction(res.data.access_token, res.data.user);
          }
        })
        .catch(() => {
          logoutInfoFunction();
        });
    };
    data();
  }, []);

  if (loginStatus === "Uncertain") return <div>Loading</div>;

  return (
    <>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/PersistentDrawerLeft" element={<PersistentDrawerLeft />}>
          <Route path="user" element={<Apptable />} />
        </Route>
        <Route path="" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}
