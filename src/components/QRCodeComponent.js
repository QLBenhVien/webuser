import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = ({ url }) => {
  const [patientData, setPatientData] = useState({
    name: "Phạm Ngọc Duy",
    gender: "Nam",
    age: 21,
    address: "Hồ Chí Minh",
    phone: "0365968196",
  });

  const generateQRCodeData = () => {
    return url;
  };

  return (
    <div>
      {/* Sử dụng QRCodeSVG thay vì QRCode */}
      <QRCodeSVG value={generateQRCodeData()} size={200} />

      {/* Có thể thêm phần điều chỉnh dữ liệu */}
    </div>
  );
};

export default QRCodeComponent;
