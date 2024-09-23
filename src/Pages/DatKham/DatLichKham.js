import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './DatLichKham.css';

function DatLichKham() {
  const [time, setTime] = useState('');
  const [clinic, setClinic] = useState('');
  const [doctor, setDoctor] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [formData, setFormData] = useState({
    hoTen: '',
    gioiTinh: '',
    soDienThoai: '',
    tuoi: '',
    diaChi: '',
    ngayKham: '',
    caKham: '',
    chungKhoa: '',
    bacSi: '',
    trieuChung: '',
  });

  const handleRedirect = () => {
    if (time && clinic && doctor) {
      setShowAppointmentForm(true);
      setFormData((prevData) => ({
        ...prevData,
        chungKhoa: clinic,
        bacSi: doctor,
      }));
    } else {
      alert('Vui lòng chọn đầy đủ thông tin trước khi đăng ký.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setShowAppointmentForm(false);
    setFormData({
      hoTen: '',
      gioiTinh: '',
      soDienThoai: '',
      tuoi: '',
      diaChi: '',
      ngayKham: '',
      caKham: '',
      chungKhoa: '',
      bacSi: '',
      trieuChung: '',
    });
    setTime('');
    setClinic('');
    setDoctor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đăng ký khám bệnh thành công!');
    handleCancel();
  };

  return (
    <main className="datlich-main">
      <Breadcrumb current="Đăng ký khám bệnh" />
      <h2 className="main-title">Đăng ký khám bệnh</h2>
      <div className="choice">
        <div className="form-group">
          <label htmlFor="time">Thời gian:</label>
          <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Chọn thời gian</option>
            <option value="16/09/2024 - 22/09/2024">16/09/2024 - 22/09/2024</option>
            <option value="23/09/2024 - 29/09/2024">23/09/2024 - 29/09/2024</option>
            <option value="30/09/2024 - 05/10/2024">30/09/2024 - 05/10/2024</option>
            <option value="06/10/2024 - 12/10/2024">06/10/2024 - 12/10/2024</option>
            <option value="13/10/2024 - 19/10/2024">13/10/2024 - 19/10/2024</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="clinic">Chuyên khoa:</label>
          <select id="clinic" value={clinic} onChange={(e) => setClinic(e.target.value)}>
            <option value="">Chọn chuyên khoa</option>
            <option value="phong_kham_1">Phòng khám Nhi</option>
            <option value="phong_kham_2">Phòng khám Phụ sản</option>
            <option value="phong_kham_3">Phòng khám Cấp Cứu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doctor">Chọn bác sĩ:</label>
          <select id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option value="">Chọn bác sĩ</option>
            <option value="bac_si_1">BS. Nguyễn Văn A</option>
            <option value="bac_si_2">BS. Lương Đình B</option>
            <option value="bac_si_3">BS. Nguyễn Hà G</option>
          </select>
        </div>

        <div
          className="search-icon"
          onClick={handleRedirect}
          title="Đăng ký"
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
              <th>Thứ 2<br />16/09/2024</th>
              <th>Thứ 3<br />17/09/2024</th>
              <th>Thứ 4<br />18/09/2024</th>
              <th>Thứ 5<br />19/09/2024</th>
              <th>Thứ 6<br />20/09/2024</th>
              <th>Thứ 7<br />21/09/2024</th>
              <th>Chủ Nhật<br />22/09/2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ca 1:<br />6h - 9h</td>
              <td></td>
              <td>BS. Nguyễn<br />Văn A</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Ca 2:<br />9h - 12h</td>
              <td></td>
              <td>BS. Nguyễn<br />Văn A</td>
              <td></td>
              <td>BS. Nguyễn<br />Văn A</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {showAppointmentForm && (
        <>
          <h3 className="section-title">Thông tin bệnh nhân</h3>
          <div className="thongtin_benhnhan">
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <div className={`form-group-${key === 'gioiTinh' || key === 'trieuChung' ? 'a' : 'b'}`} key={key}>
                  <label htmlFor={key}>
                    {key === 'hoTen' ? 'Họ và tên' : 
                     key === 'gioiTinh' ? 'Giới tính' : 
                     key === 'soDienThoai' ? 'Số điện thoại' :
                     key === 'tuoi' ? 'Tuổi' :
                     key === 'diaChi' ? 'Địa chỉ' :
                     key === 'ngayKham' ? 'Ngày khám' :
                     key === 'caKham' ? 'Ca khám' :
                     key === 'trieuChung' ? 'Triệu chứng' : 
                     key.charAt(0).toUpperCase() + key.slice(1)}:
                  </label>
                  <input
                    type={key === 'tuoi' ? 'number' : key === 'soDienThoai' ? 'tel' : key === 'ngayKham' ? 'date' : 'text'}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    placeholder={`Nhập ${key === 'hoTen' ? 'họ và tên' : 
                                key === 'gioiTinh' ? 'giới tính' : 
                                key === 'soDienThoai' ? 'số điện thoại' : 
                                key === 'tuoi' ? 'tuổi' : 
                                key === 'diaChi' ? 'địa chỉ' : 
                                key === 'ngayKham' ? 'ngày khám' : 
                                key === 'trieuChung' ? 'triệu chứng' : 
                                key}`}
                  />
                </div>
              ))}

              <div className="button_dangky">
                <button type="button" onClick={handleCancel} className="cancel-button">Hủy</button>
                <button type="submit" className="submit-button">Đăng ký</button>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
}

// Breadcrumb Component
function Breadcrumb({ current }) {
  return (
    <div className="breadcrumb">
      <p>Trang chủ / {current}</p>
    </div>
  );
}

export default DatLichKham;
