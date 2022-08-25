import { Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./components/BaseLayout";
import Navbar from "./components/Navbar";
import { Apptable } from "./pages/user";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/PersistentDrawerLeft" element={<PersistentDrawerLeft />}>
          <Route path="user" element={<Apptable />} />
        </Route>
      </Routes>
    </>
  );
}
