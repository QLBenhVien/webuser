import React, { useEffect, useState } from "react";
import "./TaiKhoanUpdate.css"; // Add this to style the page
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import axiosInstance from "../../Axios/axios";
// Import Notifications component
import Notifications from "../../components/Notification"; // Đường dẫn tới file Notifications của bạn

function TaiKhoanUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [statusChinhsua, setStatusChinhSua] = useState(false);

  // Thông báo
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Logic cho nút Lưu thay đổi
    try {
      const res = await axios.put(
        "https://backend-datkhambenh.onrender.com/user/updateMyAccountInfo",
        {
          username: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage(res.data.data.message);
      setSnackbarSeverity("success");
      setOpen(true);
      setStatusChinhSua(false);
    } catch (error) {
      setSnackbarMessage(error.response.data.message); // Sửa lỗi chỗ này nếu có
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const token = localStorage.getItem("token");

  const fecthdata = async () => {
    try {
      const res = await axiosInstance.get("/user/me");

      setUser({
        name: res.data.data.myTK.username,
        email: res.data.data.myTK.email,
      });
    } catch (error) {
      setSnackbarMessage(error.response.data.message); // Sửa lỗi chỗ này nếu có
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  useEffect(() => {
    fecthdata();
  }, [token]);

  return (
    <div className="profile-container">
      {/* Sidebar as a simple list in the top-right corner */}
      <Notifications
        isOpen={open}
        message={snackbarMessage}
        status={snackbarSeverity}
        handleClose={handleClose}
      />
      {/* Right Content */}
      <div className="content">
        <h2 className="account-title">THÔNG TIN TÀI KHOẢN</h2>

        <div className="personal-info">
          <div className="header">
            <div className="avatar-section">
              <div className="avatar-circle"></div>
              <h3>{user.name}</h3>
            </div>
            <div className="chinhsua">
              <h5
                className="lb_chinhsua"
                onClick={() => setStatusChinhSua(true)}
              >
                Chỉnh sửa
              </h5>
              <CreateIcon />
            </div>
          </div>
          <div className="info">
            {/* Họ và tên */}
            <div className="info-item">
              <label className="label">Họ và tên</label>
              {statusChinhsua ? (
                <input
                  type="text"
                  className="value"
                  value={user.name}
                  onChange={(e) =>
                    updateUser({ ...user, name: e.target.value })
                  }
                />
              ) : (
                <p>{user.name ? user.name : "Chưa có"}</p>
              )}
            </div>
            <hr />
            {/* Email */}
            <div className="info-item">
              <label className="label">Email</label>
              {statusChinhsua ? (
                <input
                  type="email"
                  className="value"
                  value={user.email}
                  onChange={(e) =>
                    updateUser({ ...user, email: e.target.value })
                  }
                />
              ) : (
                <p>{user.email ? user.email : "Chưa có"}</p>
              )}
            </div>
            <hr />
          </div>
        </div>
        {statusChinhsua && (
          <div className="button-container">
            <button
              className="cancel-button"
              onClick={() => setStatusChinhSua(false)}
            >
              Hủy
            </button>
            <button className="save-button" onClick={handleSave}>
              Lưu thay đổi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaiKhoanUpdate;
