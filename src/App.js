import "./App.css";
import Login from "./Pages/Login/Login";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Register from "./Pages/Login/Register";
import TrangChu from "./Pages/TrangChu/TrangChu";
import Navigation from "./components/Navigation";
import DatKham from "./Pages/DatKham/DatKham";
import Gioithieu from "./Pages/GioiThieu/Gioithieu";
import Bacsi from "./Pages/BacSi/Bacsi";
import LienHe from "./Pages/LienHe/LienHe";
import Tintuc from "./Pages/TinTuc/Tintuc";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Navigation />
        <Routes>
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/datkham" element={<DatKham />} />
          <Route path="/gioithieu" element={<Gioithieu />} />
          <Route path="/bacsi" element={<Bacsi />} />
          <Route path="/lienhe" element={<LienHe />} />
          <Route path="/tintuc" element={<Tintuc />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
