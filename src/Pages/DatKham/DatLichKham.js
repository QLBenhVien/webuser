import React, { useState } from 'react';
import './DatLichKham.css';
import { FaSearch } from 'react-icons/fa';

const DatLichKham = () => {
  const [time, setTime] = useState('');
  const [clinic, setClinic] = useState('');
  const [doctor, setDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [shift, setShift] = useState(''); // Thêm state cho ca khám
  const [schedule, setSchedule] = useState({
    'Thứ 2': {
      'Ca 1': '',
      'Ca 2': '',
    },
    'Thứ 3': {
      'Ca 1': '',
      'Ca 2': '',
    },
    'Thứ 4': {
      'Ca 1': '',
      'Ca 2': '',
    },
    'Thứ 5': {
      'Ca 1': '',
      'Ca 2': '',
    },
    'Thứ 6': {
      'Ca 1': '',
      'Ca 2': '',
    },
    'Thứ 7': {
      'Ca 1': '',
      'Ca 2': '',
    },
  });

  const handleSearchClick = () => {
    if (time && clinic && doctor) {
      const updatedSchedule = { ...schedule };
      updatedSchedule['Thứ 2']['Ca 1'] = doctor; // Cập nhật tên bác sĩ cho Thứ 2
      updatedSchedule['Thứ 3']['Ca 1'] = doctor; // Cập nhật tên bác sĩ cho Thứ 3
      setSchedule(updatedSchedule);
    } else {
      alert('Vui lòng chọn Thời gian, Chuyên khoa và Bác sĩ trước.');
    }
  };

  // Hàm xử lý khi nhấn vào tên bác sĩ trong lịch
  const handleDoctorClick = (day, shift) => {
    const selectedDoctor = schedule[day][shift];
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
      setShift(shift); // Lưu ca khám
      setPatientName(''); // Reset các trường khác
      setGender('');
      setPhone('');
      setAge('');
      setAddress('');
      setSymptoms('');
      setTime(day); // Cập nhật ngày khám
      setClinic('Chuyên khoa ABC'); // Cập nhật chuyên khoa
    }
  };

  return (
    <main className="datlich-main">
      <h2 className="main-title">Đăng ký khám bệnh</h2>
      <div className="choice">
        <div className="form-group">
          <label htmlFor="time">Thời gian:</label>
          <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Chọn thời gian</option>
            <option value="23/09/2024 - 29/09/2024">23/09/2024 - 29/09/2024</option>
            <option value="30/09/2024 - 05/10/2024">30/09/2024 - 05/10/2024</option>
            <option value="06/10/2024 - 12/10/2024">06/10/2024 - 12/10/2024</option>
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
      <div className="schedule-table">
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
              <td onClick={() => handleDoctorClick('Thứ 2', 'Ca 1')}>{schedule['Thứ 2']['Ca 1']}</td>
              <td onClick={() => handleDoctorClick('Thứ 3', 'Ca 1')}>{schedule['Thứ 3']['Ca 1']}</td>
              <td onClick={() => handleDoctorClick('Thứ 4', 'Ca 1')}>{schedule['Thứ 4']['Ca 1']}</td>
              <td onClick={() => handleDoctorClick('Thứ 5', 'Ca 1')}>{schedule['Thứ 5']['Ca 1']}</td>
              <td onClick={() => handleDoctorClick('Thứ 6', 'Ca 1')}>{schedule['Thứ 6']['Ca 1']}</td>
              <td onClick={() => handleDoctorClick('Thứ 7', 'Ca 1')}>{schedule['Thứ 7']['Ca 1']}</td>
            </tr>
            <tr>
              <td>Ca 2 (13:30 - 17:00)</td>
              <td onClick={() => handleDoctorClick('Thứ 2', 'Ca 2')}>{schedule['Thứ 2']['Ca 2']}</td>
              <td onClick={() => handleDoctorClick('Thứ 3', 'Ca 2')}>{schedule['Thứ 3']['Ca 2']}</td>
              <td onClick={() => handleDoctorClick('Thứ 4', 'Ca 2')}>{schedule['Thứ 4']['Ca 2']}</td>
              <td onClick={() => handleDoctorClick('Thứ 5', 'Ca 2')}>{schedule['Thứ 5']['Ca 2']}</td>
              <td onClick={() => handleDoctorClick('Thứ 6', 'Ca 2')}>{schedule['Thứ 6']['Ca 2']}</td>
              <td onClick={() => handleDoctorClick('Thứ 7', 'Ca 2')}>{schedule['Thứ 7']['Ca 2']}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Form thông tin bệnh nhân */}
      <div className="patient-info">
        <h3>Thông tin bệnh nhân</h3>
        <div className="form-group">
          <label>Họ và Tên:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Giới tính:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tuổi:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ngày khám:</label>
          <input type="date" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ca khám:</label>
          <input type="text" value={shift} readOnly /> {/* Hiển thị ca khám */}
        </div>
        <div className="form-group">
          <label>Bác sĩ:</label>
          <input type="text" value={doctor} readOnly />
        </div>
        <div className="form-group">
          <label>Triệu chứng:</label>
          <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
        </div>

        {/* Thêm button-container ở đây */}
        <div className="button-container">
          <button onClick={() => console.log('Đăng ký')}>Đăng ký</button>
          <button onClick={() => console.log('Đóng')}>Đóng</button>
        </div>
      </div>
    </main>
  );
};

export default DatLichKham;
