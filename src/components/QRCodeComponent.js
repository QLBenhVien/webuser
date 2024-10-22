import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = () => {
  const [patientData, setPatientData] = useState({
    name: "Phạm Ngọc Duy",
    gender: "Nam",
    age: 21,
    address: "Hồ Chí Minh",
    phone: "0365968196",
  });

  const generateQRCodeData = () => {
    return "https://www.google.com/maps/@10.8691456,106.594304,14z?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D";
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
