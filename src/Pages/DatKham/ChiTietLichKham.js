import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChiTietLichKham.css"; // Import file CSS
import axios from "axios";

const ChiTietLichKham = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Khởi tạo navigate
  const { id } = location.state; // Lấy dữ liệu lịch khám từ state

  const handleCancelAppointment = () => {
    // Xử lý hủy lịch
    alert("Lịch hẹn đã bị hủy.");
    // Bạn có thể thêm logic hủy lịch hẹn ở đây, như gửi yêu cầu đến server
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const [nameBN, setNameBN] = useState("");
  const [appointment, setAppointment] = useState({});
  const [nameBS, setNameBS] = useState("");
  const handleClose = () => {
    navigate(-1); // Quay lại trang trước
  };
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.put(
        "https://backend-datkhambenh.onrender.com/user/xemchitietlichkham",
        {
          idLichKham: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("da fetch");
      setNameBN(res.data.TenBN);
      setNameBS(res.data.TenBS);
      setAppointment(res.data.lichkham);
      console.log(appointment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="chitiet-container">
      <h2>Chi tiết lịch khám</h2>

      {appointment ? (
        <form className="chitiet-form">
          <div className="form-group">
            <label>Tên bệnh nhân:</label>
            <a type="text">{nameBN}</a>
          </div>
          <div className="form-group">
            <label>Ngày khám:</label>
            <a type="text">{formatDate(appointment.NgayDatKham)}</a>
          </div>
          <div className="form-group">
            <label>Triệu chứng:</label>
            <a type="text">{appointment.TrieuChung}</a>
          </div>
          <div className="form-group">
            <label>Bác sĩ:</label>
            <a type="text">{nameBS}</a>
          </div>
          <div className="form-group">
            <label>Ca khám:</label>
            <a type="text">{formatDate(appointment.CaKham)}</a>
          </div>
          <div className="form-group">
            <label>Trạng thái:</label>
            <a>{appointment.TrangThai ? "đã xử lý" : "Chưa xử lý"}</a>
          </div>

          <div className="form-group">
            <label>Lưu ý:</label>
            <a>Vui lòng đến khám bệnh đúng thời hạn.</a>
          </div>

          <div className="button-container">
            <button type="button" className="close-btn" onClick={handleClose}>
              Đóng
            </button>
          </div>
        </form>
      ) : (
        <p>Không có dữ liệu lịch khám.</p>
      )}
    </div>
  );
};

export default ChiTietLichKham;
