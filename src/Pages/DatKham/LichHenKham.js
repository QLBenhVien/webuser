import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LichHenKham.css";
import axios from "axios";

// thong bao
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const LichHenKham = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Khai báo location

  //user
  const [name, setName] = useState("");

  // Khởi tạo state cho danh sách lịch hẹn
  const [appointments, setAppointments] = useState([{}]);

  //thong bao
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleClose = () => {
    setOpen(false);
  };

  //end thong bao

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/xemlichkham", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res:", res.data.TenBN);
      setName(res.data.TenBN);
      console.log("name", name);
      setAppointments(res.data.lichkham);
      console.log("appointments:", appointments);
      // setSnackbarMessage(res.data.message);
      // setSnackbarSeverity("success");
      // setOpen(true);
    } catch (error) {
      // if (error.response.status === 401) {
      //   navigate("/login");

      //   localStorage.setItem("token-hethan", "true");
      //   localStorage.removeItem("token");
      // }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Nhận thông tin lịch hẹn mới từ state và cập nhật danh sách
  useEffect(() => {
    const newAppointment = location.state?.appointment;
    if (newAppointment) {
      setAppointments((prev) => {
        const existingIds = prev.map((app) => app.id);
        if (!existingIds.includes(newAppointment.id)) {
          return [...prev, newAppointment]; // Thêm lịch hẹn mới
        }
        return prev; // Không thêm nếu ID đã tồn tại
      });
    }
  }, [location.state]);

  const handleCancelAppointment = async (id) => {
    // Xóa lịch hẹn khỏi danh sách
    try {
      const res = await axios.put(
        "http://localhost:8080/user/huylichkham",
        { idlichdat: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
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

  return (
    <div className="app">
      {/* Sidebar as a simple list in the top-right corner */}
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
      {/* Right Content */}
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
                    <tr key={appointment.id}>
                      <td>{index + 1}</td> {/* Hiển thị STT */}
                      <td>{name}</td>
                      <td>{appointment.NgayDatKham}</td>
                      <td>
                        {appointment.TrangThai ? "đã xử lý" : "chưa xử lý"}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            // Điều hướng đến trang chi tiết và truyền dữ liệu
                            navigate("/chitietlichkham", {
                              state: { id: appointment._id },
                            });
                          }}
                        >
                          Xem
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment._id)
                          }
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
