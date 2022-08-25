import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PersistentDrawerLeft from "./components/BaseLayout";
import { Apptable } from "./pages/user";

export function App() {
  const [count, setCount] = useState(0);

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
