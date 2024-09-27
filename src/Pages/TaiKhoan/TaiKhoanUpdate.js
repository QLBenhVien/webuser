import React, { useEffect, useState } from "react";
import "./TaiKhoanUpdate.css"; // Add this to style the page
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

// thong bao
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function TaiKhoanUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
  });
  const [statusChinhsua, setStatusChinhSua] = useState(false);

  //thong bao
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleClose = () => {
    setOpen(false);
  };

  //end thong bao

  const handleSave = async () => {
    // Logic cho nút Lưu thay đổi
    try {
      const res = await axios.put(
        "http://localhost:8080/user/updateMyAccountInfo",
        {
          Ten: user.name,
          DiaChi: user.address,
          GioiTinh: user.gender,
          SDT: user.phone,
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
      setSnackbarMessage(error.data.data.message);
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
      const res = await axios.get("http://localhost:8080/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({
        name: res.data.data.benhNhan.Ten,
        email: res.data.data.benhNhan.Email,
        gender: res.data.data.benhNhan.GioiTinh,
        address: res.data.data.benhNhan.DiaChi,
        phone: res.data.data.benhNhan.SDT,
      });

      console.log(res);

      // setSnackbarMessage(res.data.message);
      // setSnackbarSeverity("success");
      // setOpen(true);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");

        localStorage.setItem("token-hethan", "true");
        localStorage.removeItem("token");
      }
      console.log(error.response.status);
    }
  };

  useEffect(() => {
    fecthdata();
    // console.log(user);
  }, [token]);

  return (
    <div className="profile-container">
      {/* Sidebar as a simple list in the top-right corner */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      {/* Right Content */}
      <div className="content">
        <h2 className="account-title">THÔNG TIN TÀI KHOẢN</h2>

        <div className="personal-info">
          <div className="header">
            <div className="avatar-section">
              {/* Avatar with Blue Background */}
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
            <div className="info-item">
              <label className="label">Giới tính</label>
              {statusChinhsua ? (
                <input
                  type="text"
                  className="value"
                  value={user.gender || ""}
                  onChange={(e) =>
                    updateUser({ ...user, gender: e.target.value })
                  }
                />
              ) : (
                <p>{user.gender ? user.gender : "Chưa có"}</p>
              )}
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Địa chỉ</label>
              {statusChinhsua ? (
                <input
                  type="text"
                  className="value"
                  value={user.address || ""}
                  onChange={(e) =>
                    updateUser({ ...user, address: e.target.value })
                  }
                />
              ) : (
                <p>{user.address ? user.address : "Chưa có"}</p>
              )}
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Số điện thoại</label>
              {statusChinhsua ? (
                <input
                  type="tel"
                  className="value"
                  value={user.phone || ""}
                  onChange={(e) =>
                    updateUser({ ...user, phone: e.target.value })
                  }
                />
              ) : (
                <p>{user.phone ? user.phone : "Chưa có"}</p>
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
