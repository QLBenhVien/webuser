import "./App.css";
import Login from "./Pages/Login/Login";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Register from "./Pages/Login/Register";
import TrangChu from "./Pages/TrangChu/TrangChu";
import Navigation from "./components/Navigation";
import DatKham from "./Pages/DatKham/DatLichKham";
import Gioithieu from "./Pages/GioiThieu/Gioithieu";
import Bacsi from "./Pages/BacSi/Bacsi";
import ChiTietLichKham from "./Pages/DatKham/ChiTietLichKham";
import LichHenKham from "./Pages/DatKham/LichHenKham";
import ResetPassword from "./Pages/Login/ResetPassword";
import Tintuc from "./Pages/TinTuc/Tintuc";
import LienHe from "./Pages/LienHe/LienHe";

// Trong phần Routes

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Hoso from "./Pages/HoSoBA/Hoso";
import TaiKhoanUpdate from "./Pages/TaiKhoan/TaiKhoanUpdate";
import Nav from "./components/Nav";

// // icon flag
// import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import ListIcon from "@mui/icons-material/List";
// import MailIcon from "@mui/icons-material/Mail";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// const actions = [
//   {
//     icon: <PersonOutlineIcon />,
//     name: "Thông tin cá nhân",
//     path: "thongtincanhan",
//   },
//   { icon: <MailIcon />, name: "Kết quả khám bệnh", path: "ketqua" },
//   { icon: <ListIcon />, name: "Lịch khám của tôi", path: "lichkham" },
//   { icon: <NotificationsIcon />, name: "Thông báo", path: "thongbao" },
//   { icon: <LibraryBooksIcon />, name: "Hồ sơ bệnh án", path: "hoso" },
// ];

const HoSoCaNhan = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flex: "3" }}>
        <Nav />
      </div>

      <div style={{ flex: "7" }}>
        <Routes>
          <Route path="/hoso" element={<Hoso />} />
          <Route path="/thongtincanhan" element={<TaiKhoanUpdate />} />
          <Route path="/lichkham" element={<LichHenKham />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/resetpassword";
  const isUser =
    location.pathname === "/hoso" ||
    location.pathname === "/thongtincanhan" ||
    location.pathname === "/ketqua" ||
    location.pathname === "/lichkham" ||
    location.pathname === "/thongbao";
  return (
    <div>
      {!isAuthPage && <Navigation />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioithieu" element={<Gioithieu />} />
        <Route path="/bacsi" element={<Bacsi />} />
        <Route path="/lienhe" element={<LienHe />} />
        <Route path="/tintuc" element={<Tintuc />} />
        <Route path="/datkham" element={<DatKham />} />
        <Route path="/chitietlichkham" element={<ChiTietLichKham />} />
      </Routes>
      {isUser && <HoSoCaNhan />}
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
