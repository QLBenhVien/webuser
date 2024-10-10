import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './TrangChu.css';
import news1 from '../../images/images-tintuc/tintuc1.png';
import news2 from '../../images/images-tintuc/tintuc2.png';
import news3 from '../../images/images-tintuc/tintuc3.png';
import news4 from '../../images/images-tintuc/tintuc4.png';
import news5 from '../../images/images-tintuc/tintuc5.png';
import bacsi1 from '../../images/images-bacsi/bacsi1.png'; 
import bacsi2 from '../../images/images-bacsi/bacsi2.png'; 
import bacsi3 from '../../images/images-bacsi/bacsi3.png';
import 'font-awesome/css/font-awesome.min.css';

const newsImages = [news1, news2, news3, news4, news5];

const TrangChu = () => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Number of slides to show at once

  useEffect(() => {
    const isLoginSuccess = localStorage.getItem("loginSuccess");

    if (isLoginSuccess === "true") {
      setSnackbarMessage("Đăng nhập thành công!");
      setSnackbarSeverity("success");
      setOpen(true);
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (newsImages.length - slidesToShow + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (newsImages.length - slidesToShow + 1)) % (newsImages.length - slidesToShow + 1));
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className="trangchu-container">
        <div className="videotrangchu-container">
          <iframe
            width="100%"
            height="550px"
            src="https://www.youtube.com/embed/bvjyd7wVIGQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
        <h2 style={{ textAlign: "center", color: "#22668E" }}>Tin tức mới</h2>

        {/* News slider */}
        <div className="tintuc-trangchu-slider">
          <button className="tintuc-trangchu-button" onClick={prevSlide}>&lt;</button> {/* Left Arrow */}
          <div className="slide">
            {newsImages.slice(currentSlide, currentSlide + slidesToShow).map((image, index) => {
              const links = [
                "https://lucnam.bacgiang.gov.vn/chi-tiet-tin-tuc/-/asset_publisher/Enp27vgshTez/content/chu-ong-trien-khai-cac-hoat-ong-phong-chong-dich-benh/20181",
                "https://tuyengiao.hungyen.dcs.vn/tang-cuong-phong-chong-dich-covid-19-bang-y-hoc-co-truyen-c28332.html/",
                "https://baobinhphuoc.com.vn/news/14/143498/tang-cuong-tiem-vaccine-phong-covid-19-uu-tien-bao-ve-nhom-nguy-co-cao/",
                "https://dienbientv.vn/tin-tuc-su-kien/y-te-suc-khoe/202108/mot-so-trieu-chung-phat-ban-co-the-la-dau-hieu-mac-covid-19-5747096/",
                "https://baophapluat.vn/13-hoc-sinh-nhap-vien-sau-khi-uong-nuoc-ngot-mien-phi-o-cong-truong-post527209.html"
              ];
              return (
                <a key={index} href={links[index % links.length]} target="_blank" rel="noopener noreferrer">
                  <img src={image} alt={`News ${currentSlide + index + 1}`} />
                </a>
              );
            })}
          </div>
          <button className="slider-button" onClick={nextSlide}>&gt;</button> {/* Right Arrow */}
        </div>

        {/* 3. Đoạn chữ với background màu xanh dương nhạt */}
        <div className="vanban-trangchu-section">
          <h2>CHÚNG TÔI CÓ SỰ KHÁC BIỆT</h2>
          <p>Phòng khám UMC là nơi bạn có thể tin tưởng với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, và dịch vụ chăm sóc tận tâm. 
            Chúng tôi luôn đặt sức khỏe của bạn lên hàng đầu, cam kết mang đến những giải pháp y tế toàn diện, an toàn và hiệu quả.
            Với sự chuyên nghiệp trong quá trình chẩn đoán và điều trị, Phòng khám UMC không chỉ mang đến cho bạn sự an tâm mà còn là sự hài lòng về 
            chất lượng dịch vụ. Hãy đến với chúng tôi để trải nghiệm môi trường y tế chuẩn quốc tế, nơi mỗi bệnh nhân đều được chăm sóc như người thân
            trong gia đình.
          </p>
        </div>

   {/* 4. Đội ngũ bác sĩ gồm 3 ảnh */}
        <div className="bacsi-trangchu">
          <h2>ĐỘI NGŨ Y - BÁC SĨ CHUYÊN NGHIỆP</h2>
          <div className="bacsi-trangchu-team">
            <div className="bacsi-trangchu-item">
              <img src={bacsi1} alt="Doctor 1" />
              <p>BS Chà My</p>
            </div>
            <div className="bacsi-trangchu-item">
              <img src={bacsi2} alt="Doctor 2" />
              <p>BS TUẤN</p>
            </div>
            <div className="bacsi-trangchu-item">
              <img src={bacsi3} alt="Doctor 3" />
              <p>BS THỊNH</p>
            </div>
          </div>
          <div className="trangchu-buttons">
            <button className="lichtrinh-trangchu-button">Đặt lịch hẹn ngay</button>
            <button className="xemchitiet-trangchu-button">Xem chi tiết</button>
          </div>
        </div>


        {/* 5. Số hotline và button tìm hiểu thêm */}
        <div className="hotline-trangchu-section">
          <h2>PHÒNG KHÁM THEO YÊU CẦU</h2>
          <p>Bạn không có thời gian? Hãy gọi ngay Hotline Phòng khám umc để đặt lịch khám dịch vụ nhanh với các bác sĩ, chuyên gia của chúng tôi</p>
          <h2>Hotline: 0962 240 221</h2>
          <button>Tìm hiểu thêm</button>
        </div>

        {/* 6. Góp ý liên hệ */}
        <div className="feedback-trangchu-section">
          <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        
          <div className="feedback-trangchu-container">
            <div className="feedback-trangchu-info">
              <p> Nếu quý khách có góp ý, thắc mắc hay ý kiến phản hồi, đóng góp xin vui lòng điền vào
              Mẫu bên phải và gửi cho chúng tôi. Xin chân thành cảm ơn!</p>
            </div>

            <div className="feedback-trangchu-form">
              <form>
                <div className="form-trangchu-group">
                  <input className="input-field" type="text" placeholder="Họ tên" required />
                  <input className="input-field" type="email" placeholder="Email" required />
                </div>
                <div className="form-trangchu-group">
                  <input className="input-field" type="text" placeholder="Tiêu đề" required />
                  <input className="input-field" type="tel" placeholder="Số điện thoại" required />
                </div>
                <div className="form-trangchu-group">
                  <textarea className="textarea-field" placeholder="Nội dung liên hệ" required></textarea>
                </div>
                <div className="trangchu-buttons">
                  <button type="submit">Gửi phản hồi</button>
                </div>
              </form>
            </div>
        </div>
      </div>

       

        {/* 7. Footer */}
        <footer>
            <div className="footer-trangchu-left">
              <h4>Công ty cổ phần trung tâm y khoa UMC</h4>
              <p>
                <i className="fas fa-map-marker-alt"></i> 201 Nguyễn Chí Thanh, Phường 12, Quận 5, Thành phố Hồ Chí Minh.
              </p>
              <p>
                <i className="fas fa-phone"></i> Đường dây nóng: 0962 240 221
              </p>
              <p>
                <i className="fas fa-headset"></i> Tổng đài tư vấn: (028) 3015 9457
              </p>
              <p>
                <i className="fas fa-fax"></i> Fax: (028) 3815 9465
              </p>
              <p>
                <i className="fas fa-envelope"></i> umc@bbnnaa.com
              </p>
            </div>
            <div className="footer-trangchu-right">
              <h4>Lịch làm việc</h4>
              <p>
                <i className="fas fa-clock"></i> Thứ 2 - Thứ 7 | 8:00 - 17:00
              </p>
              <p>
                <i className="fas fa-child"></i> Khám Nhi, Xét nghiệm Nhi & Xét nghiệm nhanh Covid
              </p>
              <p>
                <i className="fas fa-sun"></i> Chủ nhật | 8:00 - 12:00
              </p>
              <p>
                <i className="fas fa-lunchbox"></i> Khám Nhi, Xét nghiệm Nhi & Xét nghiệm nhanh Covid
              </p>
              <p>
                <i className="fas fa-clock"></i> Giờ nghỉ trưa: 12:00 - 13:00
              </p>
            </div>
          </footer>
    </div>
    </div>
  );
};

export default TrangChu;
