import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoanSummary from "./pages/loanSummary";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import PersistentDrawerLeft from "./components/BaseLayout";
import { Apptable } from "./pages/user";
import axios from "axios";
import { useAuthenticationStore } from "./zustard";
import { AdminGuard } from "./Protected Route/admin.guard";
import { AuthGuard } from "./Protected Route/auth.guard";
import Logout from "./pages/Logout";

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
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/logout"
          element={<AuthGuard component={Logout} />}
        ></Route>

        <Route
          path="/loansummary"
          element={<AuthGuard component={LoanSummary} />}
        ></Route>
      </Routes>
    </>
  );
}
