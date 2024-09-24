import React, { useState } from 'react';
import './TaiKhoanUpdate.css'; // Add this to style the page
import { useNavigate } from "react-router-dom";

function TaiKhoanUpdate() {
  const [user, setUser] = useState({
    name: 'Ngô Bảo',
    email: 'baongo@gmail.com',
    gender: '',
    address: '',
    phone: '',
  });

  const handleCancel = () => {
    // Chuyển hướng đến trang khác
    alert('Không biết làm') // Thay đổi '/another-page' thành đường dẫn bạn muốn
  };

  const handleSave = () => {
    // Logic cho nút Lưu thay đổi
    alert('Không biết làm')
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
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
          </div>

          <div className="info">
            <div className="info-item">
              <label className="label">Họ và tên</label>
              <input type="text" className="value" value={user.name} onChange={(e) => updateUser({ ...user, name: e.target.value })} />
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Email</label>
              <input type="email" className="value" value={user.email} onChange={(e) => updateUser({ ...user, email: e.target.value })} />
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Giới tính</label>
              <input type="text" className="value" value={user.gender || ''} onChange={(e) => updateUser({ ...user, gender: e.target.value })} />
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Địa chỉ</label>
              <input type="text" className="value" value={user.address || ''} onChange={(e) => updateUser({ ...user, address: e.target.value })} />
            </div>
            <hr />
            <div className="info-item">
              <label className="label">Số điện thoại</label>
              <input type="tel" className="value" value={user.phone || ''} onChange={(e) => updateUser({ ...user, phone: e.target.value })} />
            </div>
            <hr />
          </div>
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>Hủy</button>
          <button className="save-button" onClick={handleSave}>Lưu thay đổi</button>
        </div>

      </div>
    </div>
  );
}

export default TaiKhoanUpdate;