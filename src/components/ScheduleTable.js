import React, { useState, useEffect } from "react";

const ScheduleTable = (props) => {
  const { lichkhambacsi, tenbacsi, onDoctorClick } = props; // Nhận props 'lichkhambacsi'

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const nextDates = [];

    for (let i = 0; i < 6; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      nextDates.push(newDate);
    }

    setDates(nextDates); // Cập nhật danh sách các ngày tiếp theo
  }, []);

  const handleClick = (date, caKham) => {
    const doctorInfo = findDoctor(date, caKham);
    if (doctorInfo) {
      const thongtin = {
        NgayKham: date,
        caKham: caKham,
        bacsi: tenbacsi,
      };
      onDoctorClick(thongtin);
    }
  };

  // Định dạng ngày thành dd/mm/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm để tìm bác sĩ theo ngày và ca khám
  const findDoctor = (date, caKham) => {
    const formattedDate = formatDate(date);
    const doctor = lichkhambacsi.find(
      (lich) =>
        formatDate(new Date(lich.NgayKham)) === formattedDate &&
        lich.Ca === caKham
    );
    return doctor ? "Có Lịch" : ""; // Trả về tên bác sĩ hoặc 'Trống' nếu không tìm thấy
  };

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Thời gian</th>
          {dates.map((date, index) => (
            <th key={index}>{formatDate(date)}</th> // Hiển thị ngày trong các cột
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Dòng hiển thị cho Ca 1 */}
        <tr>
          <td>Ca 1 (7:30 - 11:00)</td>
          {dates.map((date, index) => (
            <td key={index}>
              <a
                style={styles.link}
                className="link-bacsi"
                onClick={() => handleClick(date, 1)}
              >
                {findDoctor(date, 1)}
              </a>
            </td>
          ))}
        </tr>

        {/* Dòng hiển thị cho Ca 2 */}
        <tr>
          <td>Ca 2 (13:30 - 17:00)</td>
          {dates.map((date, index) => (
            <td key={index}>
              <a
                style={styles.link}
                className="link-bacsi"
                onClick={() => handleClick(date, 2)}
              >
                {findDoctor(date, 2)}
              </a>{" "}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ScheduleTable;

const styles = {
  link: {
    color: "#22668f",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
