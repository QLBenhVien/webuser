import React, { useState, useEffect } from "react";
import "./DatLichKham.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ScheduleTable from "../../components/ScheduleTable";
import axios from "axios";

// thong bao
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const DatLichKham = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  //thong bao
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleClose = () => {
    setOpen(false);
  };

  //end thong bao

  //useState phieu
  const [time, setTime] = useState("");
  const [clinic, setClinic] = useState({
    id: "",
    Ten: "",
  });
  const [doctor, setDoctor] = useState({
    id: "",
    Ten: "",
  });
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [shift, setShift] = useState("");

  ///
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
  });
  const [khoa, setKhoa] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [bacSi, setBacSi] = useState([
    {
      id: "",
      hoTen: "",
      email: "",
      diaChi: "",
      maCV: "",
      maKhoa: "",
      maTK: "",
      gioiTinh: null,
      sdt: null,
    },
  ]);
  const [bacSiCurrent, setBacSiCurrent] = useState([
    {
      id: "",
      hoTen: "",
      email: "",
      diaChi: "",
      maCV: "",
      maKhoa: "",
      maTK: "",
      gioiTinh: null,
      sdt: null,
    },
  ]);
  const [lichkhambacsi, setLichkhambacsi] = useState([]);

  const [dataPhieu, setDataPhieu] = useState([
    {
      hoTen: "",
      gioiTinh: "",
      sdt: "",
      ngaySinh: "",
      diaChi: "",
      caKham: "",
      ngayKham: "",
      bacSi: "",
      chuyenKhoa: "",
      trieuChung: "",
    },
  ]);

  const fecthdata = async () => {
    try {
      const res = await axios.get(
        "https://backend-datkhambenh.onrender.com/user/thongtindatkham",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({
        id: res.data.data.benhNhan._id,
        name: res.data.data.benhNhan.Ten,
        email: res.data.data.benhNhan.Email,
        gender: res.data.data.benhNhan.GioiTinh,
        address: res.data.data.benhNhan.DiaChi,
        phone: res.data.data.benhNhan.SDT,
      });
      setKhoa(res.data.data.khoa);

      console.log(res);
      setBacSi(res.data.data.bacsi);
      // setSnackbarMessage(res.data.message);
      // setSnackbarSeverity("success");
      // setOpen(true);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");

        localStorage.setItem("token-hethan", "true");
        localStorage.removeItem("token");
      }
      console.log(error.response.status);
    }
  };

  useEffect(() => {
    fecthdata();
  }, []);
  // cap nhap bac si
  // Cập nhật bacSiCurrent theo clinic
  useEffect(() => {
    const bacSicurrent = bacSi.filter((bac) => bac.MaKhoa === clinic.id);
    setBacSiCurrent(bacSicurrent);
    console.log("bac si hien tai", bacSiCurrent);
  }, [clinic.id]);

  const handleSearchClick = async () => {
    try {
      const res = await axios.put(
        "https://backend-datkhambenh.onrender.com/user/timlichkham",
        {
          BacSiID: doctor.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      //thong bao
      setSnackbarMessage(res.data.data.message);
      setSnackbarSeverity("success");
      setOpen(true);

      // console.log(res.data.lichkham);
      setLichkhambacsi(res.data.data.lichkham);
      console.log("lich kham dc set", lichkhambacsi);
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity("error");
      setOpen(true);
      console.log(error);
    }
  };

  const handleDoctorClick = (doctorInfo) => {
    setDataPhieu((prevData) => ({
      ...prevData,
      hoTen: user.name,
      gioiTinh: user.gender,
      sdt: user.phone,
      ngaySinh: "14062003",
      diaChi: user.address,
      caKham: doctorInfo.caKham,
      ngayKham: doctorInfo.NgayKham,
      bacSi: doctor.Ten,
      chuyenKhoa: clinic.Ten,
      trieuChung: symptoms,
    }));
    console.log("dataphieu:", dataPhieu);
  };

  // useEffect(() => {
  //   handleDoctorClick();
  // }, [dataPhieu]);

  const handleRegister = async () => {
    try {
      const res = await axios.put(
        "https://backend-datkhambenh.onrender.com/user/datkham",
        {
          MaNV: doctor.id,
          MaBN: user.id,
          MaKhoa: clinic.id,
          NgayDat: dataPhieu.ngayKham,
          CaKham: dataPhieu.caKham,
          TrieuChung: symptoms,
        }
      );
      console.log(res);
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");
      setOpen(true);
      handleCancel();
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity("error");
      setOpen(true);
      console.log(error);
    }
  };

  const handleCancel = () => {
    setDataPhieu((prevData) => ({
      ...prevData,
      caKham: "",
      ngayKham: null,
      bacSi: "",
      chuyenKhoa: "",
    }));
    setSymptoms("");
  };

  useEffect(() => {
    const today = new Date();
    const sixDaysLater = new Date(today);
    sixDaysLater.setDate(today.getDate() + 5);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý tháng trong JS bắt đầu từ 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    console.log("time");
    setStartDate(formatDate(today));
    setEndDate(formatDate(sixDaysLater));
  }, []);

  return (
    <main className="datlich-main">
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
      <h2 className="main-title">ĐĂNG KÝ KHÁM BỆNH</h2>
      <div className="choice">
        <div className="form-group">
          <label htmlFor="time">Thời gian:</label>

          <label style={{ color: "red" }}>
            {startDate}- {endDate}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="clinic">Chuyên khoa:</label>
          <select
            id="clinic"
            value={clinic.id} // Hoặc có thể là clinic.id nếu bạn chỉ muốn dùng id để tra cứu
            onChange={(e) => {
              const selectedClinic = khoa.find(
                (item) => item._id === e.target.value
              ); // Tìm khoa dựa trên id đã chọn
              setClinic({
                id: selectedClinic._id,
                Ten: selectedClinic.Tenkhoa,
              }); // Cập nhật clinic với cả id và tên
            }}
          >
            <option key={-1}>Chọn chuyên khoa</option>
            {khoa.map((item) => (
              <option key={item._id} value={item._id}>
                {item.Tenkhoa}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doctor">Chọn bác sĩ:</label>
          <select
            id="doctor"
            value={doctor.id} // Sử dụng `doctor.id` nếu bạn đang lưu đối tượng doctor
            onChange={(e) => {
              const selectedDoctor = bacSiCurrent.find(
                (item) => item._id === e.target.value
              ); // Tìm bác sĩ dựa trên ID đã chọn
              setDoctor({ id: selectedDoctor._id, Ten: selectedDoctor.HoTen }); // Cập nhật với ID và tên
            }}
            disabled={bacSiCurrent.length === 0} // Disable nếu không có bác sĩ
          >
            <option value="">Chọn bác sĩ</option>
            {Array.isArray(bacSiCurrent) && bacSiCurrent.length > 0 ? (
              bacSiCurrent.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.HoTen}
                </option>
              ))
            ) : (
              <option value="">Không có bác sĩ</option>
            )}
          </select>
        </div>

        <div className="search-icon" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
      <h3>Lịch Khám</h3>

      <h5
        style={{
          color: "#AA0000",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        Nhấn vào ô bạn muốn khám thông tin sẽ được điền tự động ở phiếu khám
        bệnh.
      </h5>
      <ScheduleTable
        lichkhambacsi={lichkhambacsi}
        tenbacsi={doctor}
        onDoctorClick={handleDoctorClick}
      />
      <div className="patient-info">
        <h3>PHIẾU ĐĂNG KÝ KHÁM BỆNH</h3>
        <div className="form-datkham">
          <div className="form-datkham-trai">
            <div className="form-child">
              <h5>HỌ VÀ TÊN:</h5>
              <h5 className="noidung">{user.name}</h5>
            </div>
            <div className="form-child">
              <h5>SỐ ĐIỆN THOẠI:</h5>
              <h5 className="noidung">{user.phone}</h5>
            </div>
            <div className="form-child">
              <h5>ĐỊA CHỈ:</h5>
              <h5 className="noidung">{user.address}</h5>
            </div>
            <div className="form-child">
              <h5>NGÀY KHÁM:</h5>
              <h5 className="noidung">
                {dataPhieu.ngayKham != null
                  ? new Date(dataPhieu.ngayKham).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </h5>
            </div>
            <div className="form-child">
              <h5>CHUYÊN KHOA:</h5>
              <h5 className="noidung">{dataPhieu.chuyenKhoa}</h5>
            </div>
            <div className="form-child">
              <h5>TRIỆU CHỨNG:</h5>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
          </div>
          <div className="form-datkham-phai">
            <div className="form-child">
              <h5>GIỚI TÍNH:</h5>
              <h5 className="noidung">{user.gender}</h5>
            </div>
            <div className="form-child">
              <h5>NGÀY SINH:</h5>
              <h5 className="noidung">{dataPhieu.ngaySinh}</h5>
            </div>

            <div className="form-child">
              <h5>CA KHÁM:</h5>
              <h5 className="noidung">{dataPhieu.caKham}</h5>
            </div>
            <div className="form-child">
              <h5>BÁC SĨ:</h5>
              <h5 className="noidung">{dataPhieu.bacSi}</h5>
            </div>
            <div className="form-child"></div>
          </div>
        </div>
        <div className="button-container">
          <button className="register-btn" onClick={handleRegister}>
            Đăng ký
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </div>
    </main>
  );
};

export default DatLichKham;
