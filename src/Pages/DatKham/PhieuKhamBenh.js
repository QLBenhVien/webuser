import React from "react";
import "./PhieuKhamBenh.css"; // Import file CSS

const PhieuKham = () => {
  return (
    <div className="phieu-kham-container">
      <h2 className="phieu-kham-title">Phiếu khám bệnh</h2>
      
      <div className="phieu-kham">
        <div className="hospital-info">
            <p>Bệnh viện UCM</p>
            <p>806 QL22, ấp Mỹ Hòa 3, Hóc Môn, Hồ Chí Minh</p>
        </div>
        <div className="hospital-info">
            <h3>PHIẾU KHÁM BỆNH</h3>
            <h2>STT KHÁM: 012</h2>
        </div>
        
        <div className="barcode">
          {/* Chèn mã vạch ở đây nếu có */}
          <div className="barcode-placeholder">||||||||||||||||||||||</div>
        </div>

        <table className="phieu-kham-info">
          <tbody>
            <tr>
              <td><strong>Tên bệnh nhân</strong></td>
              <td>Nguyễn Văn A</td>
              <td><strong>Giới tính</strong></td>
              <td>Nam</td>
            </tr>
            <tr>
              <td><strong>Tuổi</strong></td>
              <td>24</td>
              <td><strong>SĐT</strong></td>
              <td>0923444444</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ</strong></td>
              <td colSpan="3">Ấp 2, Tắc Vân, TP. Cà Mau</td>
            </tr>
            <tr>
              <td><strong>Tên bác sĩ</strong></td>
              <td colSpan="3">Lê Thị Hồng</td>
            </tr>
            <tr>
              <td><strong>Ngày khám</strong></td>
              <td>24/09/2024</td>
              <td><strong>Ca khám</strong></td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhieuKham;
