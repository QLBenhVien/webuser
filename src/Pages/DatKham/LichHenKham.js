import React, { useState } from "react";
import "./DatKham.css"; // Kết nối với file CSS



const DatKham = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // Quản lý tab hiện tại

  // Dữ liệu giả lịch hẹn
  const appointments = [
    {
      id: 186,
      patientName: "Phùng Bảo Khang",
      date: "03/09/2024",
      status: "Đã duyệt",
    },
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
      <img src="/images/logo.png" alt="Logo" style={{ height: '50px', width: '50px' }} />
        <nav className="navbar">
          <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#team">Đội ngũ y - bác sĩ</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#news">Tin tức</a></li>
          </ul>
         
        </nav>
        <div className="header-right">
            <span>Tên người dùng</span>
            <i className="fas fa-user-circle" style={{ marginLeft: '10px', fontSize: '20px' }}></i>

          </div>
      </header>

      {/* Bố cục gồm Sidebar và Main content */}
      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li>Thông tin cá nhân</li>
            <li>Kết quả khám bệnh</li>
            <li>Lịch khám của tôi</li>
            <li>Thông báo</li>
            <li>Hồ sơ bệnh án</li>
            <li>Đăng xuất</li>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="main-content">
          <h2>Lịch khám của tôi</h2>

          {/* Tabs - Các nút lựa chọn */}
          <div className="tabs">
            <button
              className={activeTab === "upcoming" ? "active" : ""}
              onClick={() => setActiveTab("upcoming")}
            >
              Lịch hẹn sắp đến(0)
            </button>
            <button
              className={activeTab === "completed" ? "active" : ""}
              onClick={() => setActiveTab("completed")}
            >
              Hoàn thành(0)
            </button>
            <button
              className={activeTab === "reserved" ? "active" : ""}
              onClick={() => setActiveTab("reserved")}
            >
              Lịch sử đặt chỗ
            </button>
          </div>

          {/* Appointment Table - Nội dung hiển thị tương ứng với tab */}
          <div className="appointment-list">
            {activeTab === "upcoming" ? (
              appointments.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên bệnh nhân</th>
                      <th>Ngày đăng ký</th>
                      <th>Tình trạng</th>
                      <th>Xem chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.status}</td>
                        <td>
                          <button>Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có lịch hẹn sắp đến</p>
              )
            ) : activeTab === "completed" ? (
              <p>Chưa có lịch hẹn hoàn thành</p>
            ) : (
              <p>Lịch sử đặt chỗ trống</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatKham;
