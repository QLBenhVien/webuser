import React from "react";
import "./Login.css"; // Import CSS file
import logo from "../../images/logo.png";
import doctor from "../../images/doctor.png";
import backgroundImage from "../../images/background_img.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleNextLogin = () => {
    navigate("/login");
  };
  return (
    <div
      className="AppContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
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
        <h2 className="WelcomeText">Vui lòng đăng ký</h2>
        <div className="LoginBox">
          <h2>Đăng Ký</h2>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="input"
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="input"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="input"
          />
          <div className="boxbutton">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button className="linkButton" onClick={handleNextLogin}>
                Trở lại đăng nhập?
              </button>

              <button className="linkButton">Quên mật khẩu?</button>
            </div>

            <button onClick={handleNextLogin} className="button">
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
