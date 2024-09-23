import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Đảm bảo đã nhập Link

function TrangChu() {
  return (
    <header className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/lg.png'} alt="Logo" />
        <span>Phòng khám UMC</span>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="#about">Giới thiệu</Link></li>
          <li><Link to="#team">Đội ngũ y - bác sĩ</Link></li>
          <li><Link to="/datlich">Đặt lịch khám</Link></li> 
          <li><Link to="#contact">Liên hệ</Link></li>
          <li><Link to="#news">Tin tức</Link></li>
        </ul>
      </nav>
      <FaUser className="user-icon" />
    </header>
  );
}

export default TrangChu;
