import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LichHenKham.css";

const LichHenKham = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Khai báo location

  // Khởi tạo state cho danh sách lịch hẹn
  const [appointments, setAppointments] = useState([]);

  // Nhận thông tin lịch hẹn mới từ state và cập nhật danh sách
  useEffect(() => {
    const newAppointment = location.state?.appointment;
    if (newAppointment) {
      setAppointments((prev) => {
        const existingIds = prev.map(app => app.id);
        if (!existingIds.includes(newAppointment.id)) {
          return [...prev, newAppointment]; // Thêm lịch hẹn mới
        }
        return prev; // Không thêm nếu ID đã tồn tại
      });
    }
  }, [location.state]);
  

  const handleCancelAppointment = (id) => {
    // Xóa lịch hẹn khỏi danh sách
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    alert(`Lịch hẹn với ID: ${id} đã bị hủy.`);
  };

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
                    <th>Hủy lịch khám</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <td>{index + 1}</td> {/* Hiển thị STT */}
                      <td>{appointment.patientName}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          onClick={() => {
                            // Điều hướng đến trang chi tiết và truyền dữ liệu
                            navigate("/chitietlichkham", { state: { appointment, index } });
                          }}
                        >
                          Xem
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Hủy
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
