import React, { useState } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './DatLichKham.css'; // Import CSS riêng

function DatLichKham() {
    return (
      <div className="body">
        <Header />
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/appointment" element={<AppointmentPage />} /> {/* Sửa đường dẫn ở đây */}
        </Routes>
      </div>
    );
  }
  

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/lg.png'} alt="Logo" />
        <a>Phòng khám UMC</a>
      </div>
      <nav>
        <ul className="nav-list">
          <li><a href="#home">Trang chủ</a></li>
          <li><a href="#about">Giới thiệu</a></li>
          <li><a href="#team">Đội ngũ y - bác sĩ</a></li>
          <li><a href="#datlich">Đặt lịch khám</a></li>
          <li><a href="#contact">Liên hệ</a></li>
          <li><a href="#news">Tin tức</a></li>
        </ul>
      </nav>
      <FaUser className="user-icon" />
    </header>
  );
}

// Breadcrumb Component
function Breadcrumb({ current }) {
  return (
    <div className="breadcrumb">
      <p>Trang chủ/{current}</p>
    </div>
  );
}

// BookingPage Component (Page 1)
function BookingPage() {
  const [time, setTime] = useState('');
  const [clinic, setClinic] = useState('');
  const [doctor, setDoctor] = useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (time && clinic && doctor) {
      navigate('/appointment'); // Điều hướng đến trang Appointment
    } else {
      alert('Vui lòng chọn đầy đủ thông tin trước khi đăng ký.');
    }
  };

  return (
    <main className="main">
      <Breadcrumb current="Đăng ký khám bệnh" />
      <h2 className="main-title">Đăng ký khám bệnh</h2>
      <div className="choice">
        {/* Thời gian */}
        <div className="form-group">
          <label htmlFor="time">Thời gian:</label>
          <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Chọn thời gian</option>
            <option value="16/09/2004 - 22/9/2024">16/09/2004 - 22/9/2024</option>
            <option value="23/09/2004 - 29/9/2024">23/09/2004 - 29/9/2024</option>
            <option value="30/09/2004 - 5/10/2024">30/09/2004 - 5/10/2024</option>
            <option value="6/10/2004 - 12/10/2024">6/10/2004 - 12/10/2024</option>
            <option value="13/10/2004 - 19/10/2024">13/10/2004 - 19/10/2024</option>
          </select>
        </div>

        {/* Chuyên khoa */}
        <div className="form-group">
          <label htmlFor="clinic">Chuyên khoa:</label>
          <select id="clinic" value={clinic} onChange={(e) => setClinic(e.target.value)}>
            <option value="">Chọn chuyên khoa</option>
            <option value="phong_kham_1">Phòng khám Nhi</option>
            <option value="phong_kham_2">Phòng khám Phụ sản</option>
            <option value="phong_kham_3">Phòng khám Cấp Cứu</option>
          </select>
        </div>

        {/* Chọn bác sĩ */}
        <div className="form-group">
          <label htmlFor="doctor">Chọn bác sĩ:</label>
          <select id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option value="">Chọn bác sĩ</option>
            <option value="bac_si_1">BS. Nguyễn Văn A</option>
            <option value="bac_si_2">BS. Lương Đình B</option>
            <option value="bac_si_3">BS. Nguyễn Hà G</option>
          </select>
        </div>

        {/* Biểu tượng tìm kiếm */}
        <div
          className="search-icon"
          onClick={handleRedirect}
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <FaSearch />
        </div>
      </div>
    </main>
  );
}

// AppointmentPage Component (Page 2)
function AppointmentPage() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đăng ký khám bệnh thành công!');
    navigate('/');
  };

  return (
    <main className="main">
      <Breadcrumb current="Đăng ký khám bệnh - Trang 2" />
      <h2 className="main-title">Đăng ký khám bệnh</h2>

      <div className="choice">
        {/* Thời gian */}
        <div className="form-group">
          <label htmlFor="time">Thời gian:</label>
          <select id="time">
            <option value="">Chọn thời gian</option>
            <option value="16/09/2004 - 22/9/2024">16/09/2004 - 22/9/2024</option>
            <option value="23/09/2004 - 29/9/2024">23/09/2004 - 29/9/2024</option>
            <option value="30/09/2004 - 5/10/2024">30/09/2004 - 5/10/2024</option>
            <option value="6/10/2004 - 12/10/2024">6/10/2004 - 12/10/2024</option>
            <option value="13/10/2004 - 19/10/2024">13/10/2004 - 19/10/2024</option>
          </select>
        </div>

        {/* Chuyên khoa */}
        <div className="form-group">
          <label htmlFor="clinic">Chuyên khoa:</label>
          <select id="clinic">
            <option value="">Chọn chuyên khoa</option>
            <option value="phong_kham_1">Phòng khám Nhi</option>
            <option value="phong_kham_2">Phòng khám Phụ sản</option>
            <option value="phong_kham_3">Phòng khám Cấp Cứu</option>
          </select>
        </div>

        {/* Chọn bác sĩ */}
        <div className="form-group">
          <label htmlFor="doctor">Chọn bác sĩ:</label>
          <select id="doctor">
            <option value="">Chọn bác sĩ</option>
            <option value="bac_si_1">BS. Nguyễn Văn A</option>
            <option value="bac_si_2">BS. Lương Đình B</option>
            <option value="bac_si_3">BS. Nguyễn Hà G</option>
          </select>
        </div>

        {/* Biểu tượng tìm kiếm */}
        <div
          className="search-icon"
          onClick={handleSubmit}
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <FaSearch />
        </div>
      </div>

      <h3 className="section-title">Lịch khám</h3>

      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Thứ 2<br/>16/09/2024</th>
              <th>Thứ 3<br/>17/09/2024</th>
              <th>Thứ 4<br/>18/09/2024</th>
              <th>Thứ 5<br/>19/09/2024</th>
              <th>Thứ 6<br/>20/09/2024</th>
              <th>Thứ 7<br/>21/09/2024</th>
              <th>Chủ Nhật<br/>22/09/2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ca 1:<br/>6h - 9h</td>
              <td></td>
              <td>BS. Nguyễn<br/>Văn A</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ca 2:<br/>9h - 12h</td>
              <td></td>
              <td>BS. Nguyễn<br/>Văn A</td>
              <td></td>
              <td>BS. Nguyễn<br/>Văn A</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="section-title">Thông tin bệnh nhân</h3>
      <div className="thongtin_benhnhan">
        <form onSubmit={handleSubmit}>
          {/* Hàng 1: Họ và tên, Giới tính */}
          <div className="form-group-b">
            <p className="group-b">Họ và tên:</p>
            <p>Giới tính</p>
          </div>

          {/* Hàng 2: Số điện thoại, Tuổi */}
          <div className="form-group-b">
            <p className="group-b">Số điện thoại:</p>
            <p className="group-b">Tuổi:</p>
          </div>

          {/* Hàng 3: Địa chỉ, Ngày khám */}
          <div className="form-group-a">
            <p>Địa chỉ:</p>
          </div>

          {/* Hàng 4: Ngày khám, Ca khám */}
          <div className="form-group-b">
            <p className="group-b">Ngày khám:</p>
            <p className="group-b">Ca khám:</p>
          </div>

          {/* Hàng 5: Chuyên khoa, Bác sĩ */}
          <div className="form-group-b">
            <p className="group-b">Chuyên khoa:</p>
            <p className="group-b">Bác sĩ:</p>
          </div>
          
          <div className="form-group-a">
            <p>Triệu chứng:</p>
          </div>

          <div className="button_dangky">
            <button type="button" onClick={handleCancel} className="cancel-button">Hủy</button>
            <button type="submit" className="submit-button">Đăng ký</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default DatLichKham;
