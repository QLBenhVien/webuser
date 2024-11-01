import React, { useState } from "react";
import "./Register.css";
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ShowPassword from "../../components/ShowPassword";
const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => setOpen(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email không được để trống.";
    if (!regex.test(value)) return "Email không hợp lệ.";
    return "";
  };

  const validateUsername = (value) => {
    if (!value) return "Tên người dùng không được để trống.";
    if (value.length < 3) return "Tên người dùng phải có ít nhất 3 ký tự.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Mật khẩu không được để trống.";
    if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    return "";
  };

  const handleRegister = async () => {
    const emailValidationError = validateEmail(email);
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || usernameValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setUsernameError(usernameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/register", {
        email,
        password,
        username,
        role: "KH",
      });

      localStorage.setItem("registerSuccess", "true");
      navigate("/login");
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
        <h2 className="WelcomeText">Vui lòng đăng ký</h2>
        <div className="LoginBox">
          <h2>Đăng Ký</h2>
          <input
            type="text"
            placeholder="Nhập email"
            className="input"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            value={email}
          />
          {emailError && <div className="error-message">{emailError}</div>}

          <input
            type="text"
            placeholder="Nhập username"
            className="input"
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(validateUsername(e.target.value));
            }}
            value={username}
          />
          {usernameError && <div className="error-message">{usernameError}</div>}

          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="input"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
              }}
              value={password}
            />
            <ShowPassword
              visible={passwordVisible}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}

          <div className="boxbutton">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="linkButton" onClick={() => navigate("/login")}>
                Trở lại đăng nhập?
              </button>
            </div>

            <button onClick={handleRegister} className="button">
              Đăng Ký
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

export default Register;
