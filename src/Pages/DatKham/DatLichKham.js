import React, { useState, useEffect } from "react";
import "./DatLichKham.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ScheduleTable from "../../components/ScheduleTable";
import doctor from "../../images/doctor.png";
import logo from "../../images/logo.png";
const DatLichKham = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [user, setUser] = useState({
    name: "phamngocduy",
    diachi: "hcmc",
    sdt: "0365968196",
    gioitinh: "nam",
    tuoi: "21",
  });

  const [time, setTime] = useState("");
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [shift, setShift] = useState("");
  const [schedule, setSchedule] = useState({
    "Thứ 2": {
      "Ca 1": "",
      "Ca 2": "",
    },
    "Thứ 3": {
      "Ca 1": "",
      "Ca 2": "",
    },
    "Thứ 4": {
      "Ca 1": "",
      "Ca 2": "",
    },
    "Thứ 5": {
      "Ca 1": "",
      "Ca 2": "",
    },
    "Thứ 6": {
      "Ca 1": "",
      "Ca 2": "",
    },
    "Thứ 7": {
      "Ca 1": "",
      "Ca 2": "",
    },
  });

  const handleSearchClick = () => {
    if (time && clinic && doctor) {
      const updatedSchedule = { ...schedule };
      updatedSchedule["Thứ 2"]["Ca 1"] = doctor; // Cập nhật bác sĩ cho Thứ 2 Ca 1
      updatedSchedule["Thứ 3"]["Ca 1"] = doctor; // Cập nhật bác sĩ cho Thứ 3 Ca 1
      setSchedule(updatedSchedule);
    } else {
      alert("Vui lòng chọn Thời gian, Chuyên khoa và Bác sĩ trước.");
    }
  };

  const handleDoctorClick = (day, shift) => {
    const selectedDoctor = schedule[day][shift];
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
      setShift(shift);
      setPatientName("Phùng Bảo Khang");
      setGender("Nam");
      setPhone("0123456789");
      setAge(19);
      setAddress("Quận 8");
      setTime(day);

      // Cập nhật chuyên khoa dựa trên lựa chọn
      switch (clinic) {
        case "phong_kham_1":
          setClinic("Khoa Nhi");
          break;
        case "phong_kham_2":
          setClinic("Khoa Phụ sản");
          break;
        case "phong_kham_3":
          setClinic("Khoa Cấp Cứu");
          break;
        default:
          setClinic("");
          break;
      }
    }
  };

  const handleRegister = () => {
    if (
      !patientName ||
      !gender ||
      !phone ||
      !age ||
      !address ||
      !time ||
      !shift ||
      !doctor ||
      !clinic
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Ghi lại thông tin đăng ký
    const appointmentData = {
      id: new Date().getTime(), // Tạo ID duy nhất cho lịch hẹn
      patientName,
      date: time,
      status: "Chưa duyệt",
      shift,
      doctor,
      symptoms,
    };

    console.log("Đăng ký thành công với thông tin:", appointmentData);
    alert("Đăng ký thành công!");

    // Điều hướng đến trang LichHenKham với thông tin lịch hẹn
    navigate("/tintuc", { state: { appointment: appointmentData } });
  };

  const handleCancel = () => {
    setPatientName("");
    setGender("");
    setPhone("");
    setAge("");
    setAddress("");
    setSymptoms("");
    setTime("");
    setClinic("");
    setDoctor("");
    setShift("");
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

    setStartDate(formatDate(today));
    setEndDate(formatDate(sixDaysLater));
  }, []);

  return (
    <main className="datlich-main">
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
            value={clinic}
            onChange={(e) => setClinic(e.target.value)}
          >
            <option value="">Chọn chuyên khoa</option>
            <option value="phong_kham_1">Phòng khám Nhi</option>
            <option value="phong_kham_2">Phòng khám Phụ sản</option>
            <option value="phong_kham_3">Phòng khám Cấp Cứu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doctor">Chọn bác sĩ:</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Chọn bác sĩ</option>
            <option value="BS. Nguyễn Văn A">BS. Nguyễn Văn A</option>
            <option value="BS. Lương Đình B">BS. Lương Đình B</option>
            <option value="BS. Nguyễn Hà G">BS. Nguyễn Hà G</option>
          </select>
        </div>

        <div className="search-icon" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
      <h3>Lịch Khám</h3>
      {/* <div className="schedule-table">
        <table>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Thứ 2</th>
              <th>Thứ 3</th>
              <th>Thứ 4</th>
              <th>Thứ 5</th>
              <th>Thứ 6</th>
              <th>Thứ 7</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ca 1 (7:30 - 11:00)</td>
              <td onClick={() => handleDoctorClick("Thứ 2", "Ca 1")}>
                {schedule["Thứ 2"]["Ca 1"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 3", "Ca 1")}>
                {schedule["Thứ 3"]["Ca 1"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 4", "Ca 1")}>
                {schedule["Thứ 4"]["Ca 1"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 5", "Ca 1")}>
                {schedule["Thứ 5"]["Ca 1"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 6", "Ca 1")}>
                {schedule["Thứ 6"]["Ca 1"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 7", "Ca 1")}>
                {schedule["Thứ 7"]["Ca 1"]}
              </td>
            </tr>
            <tr>
              <td>Ca 2 (13:30 - 17:00)</td>
              <td onClick={() => handleDoctorClick("Thứ 2", "Ca 2")}>
                {schedule["Thứ 2"]["Ca 2"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 3", "Ca 2")}>
                {schedule["Thứ 3"]["Ca 2"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 4", "Ca 2")}>
                {schedule["Thứ 4"]["Ca 2"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 5", "Ca 2")}>
                {schedule["Thứ 5"]["Ca 2"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 6", "Ca 2")}>
                {schedule["Thứ 6"]["Ca 2"]}
              </td>
              <td onClick={() => handleDoctorClick("Thứ 7", "Ca 2")}>
                {schedule["Thứ 7"]["Ca 2"]}
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
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

      <ScheduleTable />

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
              <h5 className="noidung">{user.sdt}</h5>
            </div>
            <div className="form-child">
              <h5>ĐỊA CHỈ:</h5>
              <h5 className="noidung">{user.diachi}</h5>
            </div>
            <div className="form-child">
              <h5>NGÀY KHÁM:</h5>
              <h5 className="noidung">{patientName}</h5>
            </div>
            <div className="form-child">
              <h5>CHUYÊN KHOA:</h5>
              <h5 className="noidung">{patientName}</h5>
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
              <h5 className="noidung">{user.gioitinh}</h5>
            </div>
            <div className="form-child">
              <h5>TUỔI:</h5>
              <h5 className="noidung">{user.tuoi}</h5>
            </div>

            <div className="form-child">
              <h5>CA KHÁM:</h5>
              <h5 className="noidung">{patientName}</h5>
            </div>
            <div className="form-child">
              <h5>BÁC SĨ:</h5>
              <h5 className="noidung">{patientName}</h5>
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
