import React, { useState, useEffect } from "react";

const ScheduleTable = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const nextDates = [];

    for (let i = 0; i < 6; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      nextDates.push(newDate);
    }

    setDates(nextDates);
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Thời gian</th>
          {dates.map((date, index) => (
            <th key={index}>{formatDate(date)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ca 1 (7:30 - 11:00)</td>
          {dates.map((_, index) => (
            <td key={index}></td>
          ))}
        </tr>
        <tr>
          <td>Ca 2 (13:30 - 17:00)</td>
          {dates.map((_, index) => (
            <td key={index}></td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ScheduleTable;
