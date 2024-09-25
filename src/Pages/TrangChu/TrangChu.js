import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const TrangChu = () => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Kiểm tra nếu có thông báo đăng nhập thành công
    const isLoginSuccess = localStorage.getItem("loginSuccess");

    if (isLoginSuccess === "true") {
      setSnackbarMessage("Đăng nhập thành công!");
      setSnackbarSeverity("success");
      setOpen(true);

      // Xóa cờ đăng nhập thành công sau khi hiển thị thông báo
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Trang chủ</h1>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default TrangChu;
