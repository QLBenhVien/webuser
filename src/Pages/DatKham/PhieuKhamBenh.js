import React, { useState } from "react";
import "./PhieuKhamBenh.css"; // Import file CSS

const PhieuKham = () => {
  // Tạo các state cho thông tin phiếu khám
  const [tenBenhNhan, setTenBenhNhan] = useState("Nguyễn Văn A");
  const [gioiTinh, setGioiTinh] = useState("Nam");
  const [tuoi, setTuoi] = useState(24);
  const [soDienThoai, setSoDienThoai] = useState("0923444444");
  const [diaChi, setDiaChi] = useState("Ấp 2, Tắc Vân, TP. Cà Mau");
  const [tenBacSi, setTenBacSi] = useState("Lê Thị Hồng");
  const [ngayKham, setNgayKham] = useState("24/09/2024");
  const [caKham, setCaKham] = useState(2);
  const [sttKham, setSttKham] = useState("012");

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
            <h2>STT KHÁM: {sttKham}</h2>
        </div>
        
        <div className="barcode">
          {/* Chèn mã vạch ở đây nếu có */}
          <div className="barcode-placeholder">||||||||||||||||||||||</div>
        </div>

        <table className="phieu-kham-info">
          <tbody>
            <tr>
              <td><strong>Tên bệnh nhân</strong></td>
              <td>{tenBenhNhan}</td>
              <td><strong>Giới tính</strong></td>
              <td>{gioiTinh}</td>
            </tr>
            <tr>
              <td><strong>Tuổi</strong></td>
              <td>{tuoi}</td>
              <td><strong>SĐT</strong></td>
              <td>{soDienThoai}</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ</strong></td>
              <td colSpan="3">{diaChi}</td>
            </tr>
            <tr>
              <td><strong>Tên bác sĩ</strong></td>
              <td colSpan="3">{tenBacSi}</td>
            </tr>
            <tr>
              <td><strong>Ngày khám</strong></td>
              <td>{ngayKham}</td>
              <td><strong>Ca khám</strong></td>
              <td>{caKham}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhieuKham;
