import "./App.css";
import Login from "./Pages/Login/Login";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import Register from "./Pages/Login/Register";
import TrangChu from "./Pages/TrangChu/TrangChu";
import Navigation from "./components/Navigation";
import DatKham from "./Pages/DatKham/DatKham";
import Gioithieu from "./Pages/GioiThieu/Gioithieu";
import Bacsi from "./Pages/BacSi/Bacsi";
import LienHe from "./Pages/LienHe/LienHe";
import Tintuc from "./Pages/TinTuc/Tintuc";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HosoAdd from "./Pages/HoSoBA/HosoAdd";
import Hoso from "./Pages/HoSoBA/Hoso";
import TaiKhoan from "./Pages/TaiKhoan/TaiKhoan";
import TaiKhoanUpdate from "./Pages/TaiKhoan/TaiKhoanUpdate";

// icon flag
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <Navigation />}
      {!isAuthPage && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      )}
      <Routes>
        {/* Routes cho login và register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Các Routes khác */}
        <Route path="/trangchu" element={<TrangChu />} />
        <Route path="/thongtincanhan" element={<TaiKhoanUpdate />} />
        <Route path="/gioithieu" element={<Gioithieu />} />
        <Route path="/bacsi" element={<Bacsi />} />
        <Route path="/lienhe" element={<LienHe />} />
        <Route path="/tintuc" element={<Tintuc />} />
        <Route path="/hoso" element={<Hoso />} />
        <Route path="/themhoso" element={<HosoAdd />} />
        <Route path="/taikhoan" element={<TaiKhoan />} />
        <Route path="/datkham" element={<DatKham />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
