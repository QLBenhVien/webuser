import React from "react";
import { useLocation } from "react-router-dom";

import "./Nav.css";
function Nav() {
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="nav-list">
        <ul className="nav-list-ul">
          <li>
            <a
              href="/thongtincanhan"
              style={{
                color:
                  location.pathname === "/thongtincanhan"
                    ? "#22668f"
                    : "#a2a7a9",
              }}
            >
              THÔNG TIN CÁ NHÂN
            </a>
          </li>
          <li>
            <a
              href="/ketqua"
              style={{
                color: location.pathname === "/ketqua" ? "#22668f" : "#a2a7a9",
              }}
            >
              KẾT QUẢ KHÁM BỆNH
            </a>
          </li>
          <li>
            <a
              href="/lichkham"
              style={{
                color:
                  location.pathname === "/lichkham" ? "#22668f" : "#a2a7a9",
              }}
            >
              LỊCH KHÁM CỦA TÔI
            </a>
          </li>
          <li>
            <a
              href="/thongbao"
              style={{
                color:
                  location.pathname === "/thongbao" ? "#22668f" : "#a2a7a9",
              }}
            >
              THÔNG BÁO
            </a>
          </li>
          <li>
            <a
              href="/hoso"
              style={{
                color: location.pathname === "/hoso" ? "#22668f" : "#a2a7a9",
              }}
            >
              HỒ SƠ BỆNH ÁN
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
