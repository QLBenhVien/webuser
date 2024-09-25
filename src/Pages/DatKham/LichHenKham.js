import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LichHenKham.css";

const LichHenKham = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Dữ liệu giả lịch hẹn với các thông tin bổ sung
  const appointments = [
    {
      id: 186,
      patientName: "Phùng Bảo Khang",
      date: "03/09/2024",
      status: "Chưa duyệt",
      shift: "Buổi sáng", // Ca khám
      doctor: "Bác sĩ Nguyễn Văn A", // Bác sĩ
      symptoms: "Đau đầu, sốt nhẹ" // Triệu chứng
    },
  ];

  return (
    <div className="App">
      <div className="layout">
        <div className="sidebar">
          <ul>
            <li>Thông tin cá nhân</li>
            <li>Kết quả khám bệnh</li>
            <li style={{ fontWeight: "bold" }}>Lịch khám của tôi</li>
            <li>Thông báo</li>
            <li>Hồ sơ bệnh án</li>
            <li>Đăng xuất</li>
          </ul>
        </div>

        <div className="main-content">
          <h2 style={{ fontWeight: "bold" }}>Lịch khám của tôi</h2>

          <div className="appointment-list">
            {appointments.length > 0 ? (
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
                        <button
                          onClick={() => {
                            // Điều hướng đến trang chi tiết và truyền dữ liệu
                            navigate("/chitietlichkham", { state: { appointment } });
                          }}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có lịch hẹn sắp đến</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichHenKham;
