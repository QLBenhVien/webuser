import React, { useState } from "react";
import "./Login.css"; // Import CSS file
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    console.log(`email: ${email} | password: ${password}`);
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });

      console.log(response);
      // Hiển thị thông báo thành công
      toast(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: { Bounce },
      });

      // luu data
      // const data = JSON.stringify(response.data.data);
      // console.log(data);

      // localStorage.setItem("dataUser", data);
      localStorage.setItem("token", response.data.data.accessToken);
      // Điều hướng sau khi đăng nhập thành công
      navigate("/trangchu");
    } catch (error) {
      console.log(error);

      // Hiển thị thông báo lỗi
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div
      className="AppContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="LeftContainer">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        ></ToastContainer>
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
        <h2 className="WelcomeText">Vui lòng đăng nhập</h2>
        <div className="LoginBox">
          <h2>Đăng Nhập</h2>
          <input
            type="text"
            placeholder="Nhập email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className="boxbutton">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button className="linkButton" onClick={handleRegister}>
                Đăng ký?
              </button>

              <button className="linkButton">Quên mật khẩu?</button>
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
