import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

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

export default App;
