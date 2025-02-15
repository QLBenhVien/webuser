import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LichHenKham.css";
import axios from "axios";
import Axios from "../../Axios/axios";

// Dialog và các thành phần từ Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// thong bao
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Nội dung của phiếu khám bệnh
import PhieuKham from "./PhieuKhamBenh";

const today = new Date(); // Lấy ngày hiện tại
const LichHenKham = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([{}]);

  // State quản lý việc hiển thị Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // thong bao
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://backend-datkhambenh.onrender.com/user/xemlichkham",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName(res.data.TenBN);
      setAppointments(res.data.lichkham);
      // console.log(appointments);
      console.log("phieu kham page");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handleCancelAppointment = async (id) => {
    try {
      const res = await axios.put(
        "https://backend-datkhambenh.onrender.com/user/huylichkham",
        { idlichdat: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");
      setOpen(true);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenDialog = async (appointment) => {
    try {
      const res = await Axios.put("/user/xemphieukham", {
        id: appointment,
      });
      console.log(res);
      setSelectedAppointment({
        sttKham: res.data.data.data.sttKham || "N/A", // Số thứ tự khám
        TenBN: res.data.data.data.tenbn,
        GioiTinh: res.data.data.data.gioitinh,
        Tuoi: res.data.data.data.ngaysinh
          ? new Date().getFullYear() -
            new Date(res.data.data.data.ngaysinh).getFullYear()
          : "N/A", // Tính tuổi từ ngày sinh
        SoDienThoai: res.data.data.data.sdt,
        DiaChi: res.data.data.data.diachi,
        TenBacSi: res.data.data.data.tenbs,
        NgayKham: res.data.data.data.ngaykham,
        CaKham: res.data.data.data.cakham,
        pdf_url: res.data.data.data.url,
      });
      setOpenDialog(true); // Mở Dialog khi nhận dữ liệu thành công
    } catch (error) {
      console.log("Lỗi khi lấy phiếu khám: ", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng Dialog
  };

  return (
    <div className="app">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <div className="layout">
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
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{formatDate(appointment.NgayDatKham)}</td>
                      <td>
                        {appointment.DaHuy
                          ? "Đã bị hủy"
                          : appointment.TrangThai
                          ? "Đặt Lịch thành công"
                          : "Chưa xử lý"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleClickOpenDialog(appointment._id)}
                          disabled={appointment.DaHuy ? true : false}
                          style={{
                            border: "none",
                            backgroundColor: "#fff",
                          }}
                        >
                          Xem
                        </button>
                      </td>
                      <td>
                        {!appointment.TrangThai && (
                          <button
                            onClick={() =>
                              handleCancelAppointment(appointment._id)
                            }
                          >
                            Hủy
                          </button>
                        )}
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

      {/* Dialog hiển thị phiếu khám bệnh */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md" // Giới hạn chiều rộng tối đa của dialog
        fullWidth={true} // Đặt dialog chiếm toàn bộ chiều rộng cho phù hợp với nội dung
      >
        <DialogTitle>Phiếu khám bệnh</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <PhieuKham appointment={selectedAppointment} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LichHenKham;
