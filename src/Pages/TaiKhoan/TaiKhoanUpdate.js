import React, { useEffect, useState } from "react";
import "./TaiKhoanUpdate.css"; // Thêm CSS cho trang
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import axiosInstance from "../../Axios/axios";
import Notifications from "../../components/Notification"; // Đường dẫn tới file Notifications của bạn

function TaiKhoanUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [statusChinhsua, setStatusChinhSua] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm state cho loading

  // Thông báo
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Hàm kiểm tra username
  const validateUsername = (username) => {
    const regex = /^[\p{L}\s]+$/u; // Cho phép tất cả các chữ cái (bao gồm tiếng Việt) và khoảng trắng
    return regex.test(username);
  };

  const handleSave = async () => {
    if (!user.name) {
      setSnackbarMessage("Vui lòng nhập Tên người dùng");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    if (!validateUsername(user.name)) {
      setSnackbarMessage("Tên người dùng không được chứa số hoặc ký tự đặc biệt");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    if (user.name.length < 3 || user.name.length > 20) { // Độ dài tên người dùng
      setSnackbarMessage("Tên người dùng phải có độ dài từ 3 đến 20 ký tự");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    if (!user.email) {
      setSnackbarMessage("Vui lòng nhập Email");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    if (!validateEmail(user.email)) {
      setSnackbarMessage("Email không hợp lệ");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    if (user.email.length < 5 || user.email.length > 30) { // Độ dài email
      setSnackbarMessage("Email phải có độ dài từ 5 đến 30 ký tự");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      const token = localStorage.getItem("token"); // Lấy token
      const res = await axios.put(
        "http://localhost:8080/user/updateMyAccountInfo",
        {
          username: user.name,
          email: user.email, // Đảm bảo gửi email
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
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/me");
      setUser({
        name: res.data.data.myTK.username,
        email: res.data.data.myTK.email,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <Notifications
        isOpen={open}
        message={snackbarMessage}
        status={snackbarSeverity}
        handleClose={handleClose}
      />
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
            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={loading} // Vô hiệu hóa nút khi đang lưu
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaiKhoanUpdate;
