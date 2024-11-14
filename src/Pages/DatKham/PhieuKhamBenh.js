import React, { useEffect, useState } from "react";
import "./PhieuKhamBenh.css"; // Import file CSS
import Axios from "../../Axios/axios";
import QRCodeComponent from "../../components/QRCodeComponent";
const PhieuKham = ({ appointment }) => {
  // console.log(appointment);

  // Nếu không có dữ liệu lịch hẹn, không hiển thị gì
  if (!appointment) return null;
  return (
    <div className="phieu-kham">
      <div className="hospital-info">
        <p>Bệnh viện UCM</p>
        <p>806 QL22, ấp Mỹ Hòa 3, Hóc Môn, Hồ Chí Minh</p>
      </div>
      <div className="hospital-info">
        <h3>PHIẾU KHÁM BỆNH</h3>
        <h2>STT KHÁM: {appointment.sttKham}</h2>
      </div>

      <div className="barcode">
        {/* Chèn mã vạch ở đây nếu có */}
        <div className="barcode-placeholder">
          <QRCodeComponent url={appointment.pdf_url} />
        </div>
      </div>

      <table className="phieu-kham-info">
        <tbody>
          <tr>
            <td>
              <strong>Tên bệnh nhân</strong>
            </td>
            <td>{appointment.TenBN}</td>
            <td>
              <strong>Giới tính</strong>
            </td>
            <td>{appointment.GioiTinh}</td>
          </tr>
          <tr>
            <td>
              <strong>Tuổi</strong>
            </td>
            <td>{appointment.Tuoi}</td>
            <td>
              <strong>SĐT</strong>
            </td>
            <td>{appointment.SoDienThoai}</td>
          </tr>
          <tr>
            <td>
              <strong>Địa chỉ</strong>
            </td>
            <td colSpan="3">{appointment.DiaChi}</td>
          </tr>
          <tr>
            <td>
              <strong>Tên bác sĩ</strong>
            </td>
            <td colSpan="3">{appointment.TenBacSi}</td>
          </tr>
          <tr>
            <td>
              <strong>Ngày khám</strong>
            </td>
            <td>{appointment.NgayKham}</td>
            <td>
              <strong>Ca khám</strong>
            </td>
            <td>{appointment.CaKham}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PhieuKham;
