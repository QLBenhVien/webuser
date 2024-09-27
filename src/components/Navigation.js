/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navigation.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

//
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//

const Navigation = () => {
  const navigate = useNavigate();

  //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

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
                  navigate("/");
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
              <a>
                {localStorage.getItem("token") ? (
                  <>
                    <Button
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <AccountCircleIcon
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                    </Button>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      style={{ marginTop: "1.7rem" }}
                    >
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          navigate("/thongtincanhan");
                          handleClose();
                        }}
                      >
                        THÔNG TIN CÁ NHÂN
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          navigate("/ketquakhambenh");
                          handleClose();
                        }}
                      >
                        KẾT QUẢ KHÁM BỆNH
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          navigate("/datkham");
                          handleClose();
                        }}
                      >
                        LỊCH KHÁM CỦA TÔI
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          navigate("/thongbao");
                          handleClose();
                        }}
                      >
                        THÔNG BÁO
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          navigate("/hoso");
                          handleClose();
                        }}
                      >
                        HỒ SƠ BỆNH ÁN
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            localStorage.removeItem("token");
                          }
                          navigate("/login");
                        }}
                      >
                        ĐĂNG XUẤT
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <li>
                    <a href="/login">Đăng nhập</a>
                  </li>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
