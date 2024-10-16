import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hoso.css"; // Import file CSS
import axiosInstance from "../../Axios/axios";
import Notification from "../../components/Notification";

function Hoso() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleClose = () => {
    setOpen(false);
  };

  const [statusChinhsua, setStatusChinhSua] = useState(false);

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    Ten: "",
    GioiTinh: "",
    NgaySinh: "",
    DiaChi: "",
    CCCD: "",
    CCCD_ngayCap: "",
    CCCD_noiCap: "",
    Job: "",
    SDT: "",
    BHYT: false, // Lưu trữ dưới dạng boolean
  });

  // Hàm xử lý khi nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi nhấn nút Cập nhật
  const handleSubmit = async () => {
    try {
      console.log(formData);
      const res = await axiosInstance.put("/user/capnhathoso", {
        data: formData,
      });
      console.log(res);
      setStatusChinhSua(!statusChinhsua);
      setSnackbarMessage(res.data?.message || "Cập nhật thành công");
      setSnackbarSeverity("success");
      setOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response?.data?.errorMessage || "Có lỗi xảy ra");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  // Hàm lấy dữ liệu hồ sơ
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/user/getHoso");
      const benhNhan = res.data.data.benhNhan;
      setFormData({
        Ten: benhNhan.Ten || "",
        GioiTinh: benhNhan.GioiTinh || "",
        NgaySinh: new Date(benhNhan.NgaySinh).toISOString().slice(0, 10),
        DiaChi: benhNhan.DiaChi || "",
        CCCD: benhNhan.CCCD || "",
        CCCD_ngayCap: new Date(benhNhan.CCCD_ngayCap)
          .toISOString()
          .slice(0, 10),
        CCCD_noiCap: benhNhan.CCCD_noiCap || "",
        Job: benhNhan.Job || "",
        SDT: benhNhan.SDT || "",
        BHYT: benhNhan.BHYT || false, // Chuyển về boolean
      });
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Có lỗi xảy ra");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Đã fetch data");
  }, [statusChinhsua]);

  return (
    <div className="outer-container">
      <Notification
        isOpen={open}
        message={snackbarMessage}
        status={snackbarSeverity}
        handleClose={handleClose}
      />
      <h2 className="form-title">HỒ SƠ BỆNH ÁN</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Tên bệnh nhân */}
        <div className="form-group">
          <label>Tên bệnh nhân</label>
          <input
            type="text"
            name="Ten"
            value={formData.Ten}
            onChange={handleChange}
            required
          />

          <label>Giới tính</label>
          <select
            name="GioiTinh"
            value={formData.GioiTinh || "-1"}
            onChange={handleChange}
            required
            style={{ height: "2.5rem", borderColor: "#ccc" }}
          >
            <option value="-1">Không xác định</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          <label>Ngày sinh</label>
          <input
            type="date"
            name="NgaySinh"
            value={formData.NgaySinh || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Số CCCD / hộ chiếu */}
        <div className="form-group">
          <label>Số CCCD / hộ chiếu</label>
          <input
            type="text"
            name="CCCD"
            value={formData.CCCD || ""}
            onChange={handleChange}
            required
          />

          <label>Cấp ngày</label>
          <input
            type="date"
            name="CCCD_ngayCap"
            value={formData.CCCD_ngayCap || ""}
            onChange={handleChange}
            required
          />

          <label>Tại</label>
          <input
            type="text"
            name="CCCD_noiCap"
            value={formData.CCCD_noiCap || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Địa chỉ và số điện thoại */}
        <div className="form-group">
          <label>Chỗ ở hiện tại</label>
          <input
            type="text"
            name="DiaChi"
            value={formData.DiaChi || ""}
            onChange={handleChange}
            required
          />

          <label>Số điện thoại</label>
          <input
            type="text"
            name="SDT"
            value={formData.SDT || ""}
            onChange={handleChange}
            required
          />

          <label>Bảo hiểm y tế:</label>
          <select
            name="BHYT"
            value={formData.BHYT ? "true" : "false"}
            onChange={(e) =>
              setFormData({ ...formData, BHYT: e.target.value === "true" })
            }
            required
            style={{
              borderColor: "#ccc",
              height: "2.5rem",
            }}
          >
            <option value="false">Không</option>
            <option value="true">Có</option>
          </select>
        </div>

        {/* Nghề nghiệp */}
        <div className="form-group">
          <label>Nghề nghiệp</label>
          <input
            type="text"
            name="Job"
            value={formData.Job || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Cập nhật
          </button>
        </div>
      </form>

      <Notification
        open={open}
        onClose={handleClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
}

export default Hoso;
