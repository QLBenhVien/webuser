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
import BacSi from "./Pages/BacSi/Bacsi";
import ChiTietLichKham from "./Pages/DatKham/ChiTietLichKham";
import LichHenKham from "./Pages/DatKham/LichHenKham";

import LienHe from "./Pages/LienHe/LienHe";
import PhieuKham from "./Pages/DatKham/PhieuKhamBenh";
import TinTuc from "./Pages/TinTuc/Tintuc";
import BenhAn from "./Pages/BenhAn/BenhAn";

import ResetPassword from "./Pages/Login/ResetPassword";
import PhieuKhamBenh from "./Pages/DatKham/PhieuKhamBenh";
// Trong phần Routes

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Hoso from "./Pages/HoSoBA/Hoso";
import TaiKhoanUpdate from "./Pages/TaiKhoan/TaiKhoanUpdate";
import Nav from "./components/Nav";
import { NotificationProvider } from "./context/NotificationContext";

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
          <Route path="/ketqua" element={<BenhAn />} />
          <Route path="/phieukham" element={<PhieuKham />} />
          <Route path="/chitietlichkham" element={<ChiTietLichKham />} />
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
    location.pathname === "/thongbao" ||
    location.pathname === "/phieukham" ||
    location.pathname === "/chitietlichkham";
  return (
    <div>
      {!isAuthPage && <Navigation />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioithieu" element={<Gioithieu />} />
        <Route path="/bacsi" element={<BacSi />} />
        <Route path="/lienhe" element={<LienHe />} />
        <Route path="/tintuc" element={<TinTuc />} />
        <Route path="/datkham" element={<DatKham />} />
      </Routes>
      {isUser && <HoSoCaNhan />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Router>
  );
}
