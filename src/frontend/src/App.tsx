import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoanSummary from "./pages/loanSummary";

function App() {
  return (
    <Routes>
      <Route path="/loansummary" element={<LoanSummary />}></Route>
    </Routes>
  );
}

export default App;
