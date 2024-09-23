import React, { useState } from 'react';
import './TaiKhoan.css'; // Add this to style the page

function TaiKhoan() {
  const [user, setUser] = useState({
    name: 'Ngô Bảo',
    email: 'baongo@gmail.com',
    gender: '',
    address: '',
    phone: '',
  });

  const handleEdit = () => {
    // Logic for editing user information
    alert('Edit user info');
  };

  return (
    <div className="profile-container">
      {/* Sidebar as a simple list in the top-right corner */}
      <ul className="sidebar-small">
        <li>Thông tin cá nhân</li>
        <li>Kết quả khám bệnh</li>
        <li>Lịch khám của tôi</li>
        <li>Thông báo</li>
        <li>Hồ sơ bệnh án</li>
        <li>Đăng xuất</li>
      </ul>

      {/* Right Content */}
      <div className="content">
        <h2 className="account-title">THÔNG TIN TÀI KHOẢN</h2>

        <div className="personal-info">
          <div className="header">
            <div className="avatar-section">
              {/* Avatar with Blue Background */}
              <div className="avatar-circle"></div>
              <h3>{user.name}</h3>
            </div>
            <button className="edit-button" onClick={handleEdit}>Chỉnh sửa</button>
          </div>

          <div className="info">
            <div className="info-item">
              <span className="label">Họ và tên</span>
              <span className="value">{user.name}</span>
            </div>
            <hr/>
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
            <hr/>
            <div className="info-item">
              <span className="label">Giới tính</span>
              <span className="value">{user.gender || '--'}</span>
            </div>
            <hr/>
            <div className="info-item">
              <span className="label">Địa chỉ</span>
              <span className="value">{user.address || '--'}</span>
            </div>
            <hr/>
            <div className="info-item">
              <span className="label">Số điện thoại</span>
              <span className="value">{user.phone || '--'}</span>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaiKhoan;
