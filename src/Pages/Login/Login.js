import React, { useEffect, useState } from "react";
import "./Login.css"; // Import CSS file
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ShowPassword from "../../components/ShowPassword";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const handleClose = () => setOpen(false);
  const handleRegister = () => navigate("/register");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email không được để trống.";
    if (!regex.test(value)) return "Email không hợp lệ.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Mật khẩu không được để trống.";
    if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    return "";
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
    const isRegisterSuccess = localStorage.getItem("registerSuccess");
    const token = localStorage.getItem("token-hethan");
    if (isRegisterSuccess === "true") {
      setSnackbarMessage("Tạo tài khoản thành công !");
      setSnackbarSeverity("success");
      setOpen(true);
      localStorage.removeItem("registerSuccess");
    }
    if (token) {
      setSnackbarMessage("Phiên kết thúc, yêu cầu đăng nhập lại !");
      setSnackbarSeverity("error");
      setOpen(true);
      localStorage.removeItem("token-hethan");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", { email, password });
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("loginSuccess", "true");
      navigate("/");
    } catch (error) {
      setSnackbarMessage(error.response.data.errorMessage);
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  return (
    <div
      className="AppContainer"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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

      <div className="LeftContainer">
        <div className="Header">
          <img
            src={logo}
            alt="Logo"
            className="Logo"
            onClick={() => navigate("/trangchu")}
          />
        </div>
        <h2 className="WelcomeText">Vui lòng đăng nhập</h2>
        <div className="LoginBox">
          <h2>Đăng Nhập</h2>

          <div className="input-container">
            <input
              type="text"
              placeholder="Nhập email"
              className="input"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value));
              }}
              value={email}
              tabIndex={1}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="password-input-container">
  <input
    type={passwordVisible ? "text" : "password"}
    placeholder="Nhập mật khẩu"
    className="input password-input"
    onChange={(e) => {
      setPassword(e.target.value);
      setPasswordError(validatePassword(e.target.value));
    }}
    value={password}
    tabIndex={2}
  />
  <ShowPassword
    visible={passwordVisible}
    onClick={() => setPasswordVisible(!passwordVisible)}
    className="password-input-icon"
  />
</div>


          {passwordError && <div className="error-message">{passwordError}</div>}

          <div className="boxbutton">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="linkButton" onClick={handleRegister}>
                Đăng ký?
              </button>
              <button
                className="linkButton"
                onClick={() => navigate("/resetpassword")}
              >
                Quên mật khẩu?
              </button>
            </div>
            <button onClick={handleLogin} className="button">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      <div className="RightContainer">
        <img src={doctor} alt="Doctor" className="DoctorImage" />
      </div>
    </div>
  );
};

export default Login;
