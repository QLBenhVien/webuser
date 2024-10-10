import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hoso.css"; // Import file CSS

function Hoso() {
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    tenBenhNhan: "",
    gioiTinh: "",
    ngaysinh: "",
    soCCCD: "",
    capNgay: "",
    tai: "",
    hoKhau: "",
    choOHienTai: "",
    ngheNghiep: "",
    tienSuGiaDinh: "",
    tienSuBanThan: "",
  });

  // Hàm xử lý khi nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi nhấn nút Tạo
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu form:", formData);
    // Thêm logic xử lý dữ liệu ở đây
  };

  return (
    <div className="outer-container">
      <h2 className="form-title">HỒ SƠ BỆNH ÁN</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên bệnh nhân</label>
          <input
            type="text"
            name="tenBenhNhan"
            value={formData.tenBenhNhan}
            onChange={handleChange}
            required
          />

          <label>Giới tính</label>
          <input
            type="text"
            name="gioiTinh"
            value={formData.gioiTinh}
            onChange={handleChange}
            required
          />

          <label>Ngày sinh</label>
          <input
            type="date"
            name="ngaysinh"
            value={formData.tuoi}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số CCCD / hộ chiếu</label>
          <input
            type="text"
            name="soCCCD"
            value={formData.soCCCD}
            onChange={handleChange}
            required
          />

          <label>Cấp ngày</label>
          <input
            type="date"
            name="capNgay"
            value={formData.capNgay}
            onChange={handleChange}
            required
          />

          <label>Tại</label>
          <input
            type="text"
            name="tai"
            value={formData.tai}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Chỗ ở hiện tại</label>
          <input
            type="text"
            name="choOHienTai"
            value={formData.choOHienTai}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nghề nghiệp</label>
          <input
            type="text"
            name="ngheNghiep"
            value={formData.ngheNghiep}
            onChange={handleChange}
            required
          />
        </div>
        <p>Ngày tạo hồ sơ: </p> {/* Hiển thị ngày tạo từ cơ sở dữ liệu */}
        {/* <p className="note">
          Lưu ý: Những mục được đánh dấu * vui lòng không để trống
        </p> */}
        <div className="button-group">
          <button type="submit" className="submit-button">
            Cập nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default Hoso;
