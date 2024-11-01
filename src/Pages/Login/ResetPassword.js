import React, { useState } from "react";
import "./Login.css";
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleResetPassword = async () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/user/resetpassword",
        {
          email: email,
          matkhau: password,
        }
      );

      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response.data.errorMessage);
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  return (
    <div
      className="AppContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
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
            onClick={() => {
              navigate("/trangchu");
            }}
          />
        </div>
        <h2 className="WelcomeText"></h2>
        <div className="LoginBox">
          <h2>Lấy lại mật khẩu</h2>
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
            placeholder="Nhập password muốn reset"
            className="input"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value));
            }}
            value={password}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}

          <div className="boxbutton">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                className="linkButton"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Trở lại đăng nhập?
              </button>
            </div>
            <button onClick={handleResetPassword} className="button">
              Lấy lại mật khẩu
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
