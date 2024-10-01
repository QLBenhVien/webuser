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
        "http://localhost:8080/user/xemchitietlichkham",
        {
          idLichKham: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNameBN(res.data.TenBN);
      setNameBS(res.data.TenBS);
      setAppointment(res.data.lichkham);
      console.log(appointment)
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
            <input type="text" value={nameBN} />
          </div>
          <div className="form-group">
            <label>Ngày khám:</label>
            <input type="text" value={appointment.NgayDatKham} readOnly />
          </div>
          <div className="form-group">
            <label>Triệu chứng:</label>
            <input type="text" value={appointment.TrieuChung} readOnly />
          </div>
          <div className="form-group">
            <label>Bác sĩ:</label>
            <input type="text" value={nameBS} readOnly />
          </div>
          <div className="form-group">
            <label>Ca khám:</label>
            <input type="text" value={appointment.CaKham} readOnly />
          </div>
          <div className="form-group">
            <label>Trạng thái:</label>
            <input
              type="text"
              value={appointment.TrangThai ? "đã xử lý" : "Chưa xử lý"}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Lưu ý:</label>
            <textarea readOnly>Vui lòng đến khám bệnh đúng thời hạn.</textarea>
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
