import React from 'react';
import { useLocation } from 'react-router-dom';
import './ChiTietLichKham.css'; // Import file CSS

const ChiTietLichKham = () => {
  const location = useLocation();
  const { appointment } = location.state || {}; // Lấy dữ liệu lịch khám từ state

  return (
    <div className="chitiet-container">
      <h2>Chi tiết lịch khám</h2>
      {appointment ? (
        <form className="chitiet-form">
          <div className="form-group">
            <label>Tên bệnh nhân:</label>
            <input type="text" value={appointment.patientName} readOnly />
          </div>
          <div className="form-group">
            <label>Ngày khám:</label>
            <input type="text" value={appointment.date} readOnly />
          </div>
          <div className="form-group">
            <label>Triệu chứng:</label>
            <input type="text" value={appointment.symptoms} readOnly />
          </div>
          <div className="form-group">
            <label>Bác sĩ:</label>
            <input type="text" value={appointment.doctor} readOnly />
          </div>
          <div className="form-group">
            <label>Ca khám:</label>
            <input type="text" value={appointment.shift} readOnly />
          </div>
          <div className="form-group">
            <label>Trạng thái:</label>
            <input type="text" value={appointment.status} readOnly />
          </div>
          <div className="form-group">
            <label>Địa điểm:</label>
            <input type="text" placeholder="Nhập địa điểm" />
          </div>
          <div className="form-group">
            <label>Lưu ý:</label>
            <textarea readOnly>
              Vui lòng đến khám bệnh đúng thời hạn.
            </textarea>
          </div>
        </form>
      ) : (
        <p>Không có dữ liệu lịch khám.</p>
      )}
    </div>
  );
};

export default ChiTietLichKham;
