import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Apptable } from "./pages/user";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/user" element={<Apptable />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </>
  );
}
