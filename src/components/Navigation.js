/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navigation.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="main">
        <div className="box-logo">
          <img src={logo} alt="Logo" className="Logo" />
          <h3 className="title">
            Bệnh Viện <br /> UMC
          </h3>
        </div>
        <div className="navigation">
          <ul>
            <li>
              <a
                onClick={() => {
                  navigate("/trangchu");
                }}
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/gioithieu");
                }}
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/bacsi");
                }}
              >
                Đội ngũ bác sĩ - y tế
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/datkham");
                }}
              >
                Đặt lịch khám
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/lienhe");
                }}
              >
                Liên hệ
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/tintuc");
                }}
              >
                Tin tức
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    localStorage.removeItem("token");
                  }
                  navigate("/login");
                }}
              >
                {localStorage.getItem("token") ? "Đăng xuất" : "Đăng nhập"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
