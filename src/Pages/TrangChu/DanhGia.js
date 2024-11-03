import React, { useState } from "react";
import axios from "axios";
import "./TrangChu.css";

function DanhGia() {
  const [form, setForm] = useState({
    HoTen: "",
    Email: "",
    SDT: "",
    TieuDe: "",
    NoiDung: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/danhgia", form);
      setMessage(res.data.message);
      setForm({ HoTen: "", Email: "", SDT: "", TieuDe: "", NoiDung: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi khi gửi phản hồi.");
    }
  };

  return (
    <div className="feedback-trangchu-section">
      <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>

      <div className="feedback-trangchu-container">
        <div className="feedback-trangchu-info">
          <p>
            Nếu quý khách có góp ý, thắc mắc hay ý kiến phản hồi, đóng góp xin
            vui lòng điền vào mẫu bên phải và gửi cho chúng tôi. Xin chân thành
            cảm ơn!
          </p>
        </div>

        <div className="feedback-trangchu-form">
          {message && <p className="feedback-message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-trangchu-group">
              <input
                className="input-field"
                type="text"
                name="HoTen"
                placeholder="Họ tên"
                value={form.HoTen}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="email"
                name="Email"
                placeholder="Email"
                value={form.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-trangchu-group">
              <input
                className="input-field"
                type="text"
                name="TieuDe"
                placeholder="Tiêu đề"
                value={form.TieuDe}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="tel"
                name="SDT"
                placeholder="Số điện thoại"
                value={form.SDT}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-trangchu-group">
              <textarea
                className="textarea-field"
                name="NoiDung"
                placeholder="Nội dung liên hệ"
                value={form.NoiDung}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="trangchu-buttons">
              <button type="submit">Gửi phản hồi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DanhGia;
