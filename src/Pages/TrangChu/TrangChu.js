import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./TrangChu.css";
import news1 from "../../images/images-tintuc/tintuc1.png";
import news2 from "../../images/images-tintuc/tintuc2.png";
import news3 from "../../images/images-tintuc/tintuc3.png";
import news4 from "../../images/images-tintuc/tintuc4.png";
import news5 from "../../images/images-tintuc/tintuc5.png";
import bacsi1 from "../../images/images-bacsi/bacsi1.png";
import bacsi2 from "../../images/images-bacsi/bacsi2.png";
import bacsi3 from "../../images/images-bacsi/bacsi3.png";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import headerbg from "../../images/header-bg.png";
const newsImages = [news1, news2, news3, news4, news5];

const TrangChu = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
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
    setCurrentSlide(
      (prev) => (prev + 1) % (newsImages.length - slidesToShow + 1)
    );
  };

  function countWithDataAttributes() {
    const counterElements = document.querySelectorAll(
      ".elementor-counter-number"
    );

    counterElements.forEach((counterElement) => {
      const duration = parseInt(
        counterElement.getAttribute("data-duration"),
        10
      );
      const toValue = parseInt(
        counterElement.getAttribute("data-to-value"),
        10
      );
      const fromValue = parseInt(
        counterElement.getAttribute("data-from-value"),
        10
      );
      const totalFrames = (duration / 1000) * 60; // Tổng số khung hình trong thời gian quy định
      const increment = (toValue - fromValue) / totalFrames; // Giá trị tăng mỗi khung hình
      let currentCount = fromValue; // Giá trị hiện tại bắt đầu từ fromValue
      let frame = 0; // Đếm khung hình đã vẽ

      const interval = setInterval(() => {
        currentCount += increment; // Cập nhật giá trị hiện tại
        counterElement.textContent = Math.round(currentCount); // Hiển thị giá trị làm tròn

        // Dừng lại khi giá trị đạt toValue
        if (frame >= totalFrames) {
          clearInterval(interval);
          counterElement.textContent = toValue;
        }
        frame++;
      }, 1000 / 60); // Cập nhật khoảng 60 lần mỗi giây
    });
  }

  // Gọi hàm khi trang được tải
  window.onload = countWithDataAttributes;

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
      <div className="">
        {/* Chi làm */}
        <header class="header" style={{ backgroundColor: "white" }}>
          <div class="content" style={{ backgroundColor: "white" }}>
            <h1>
              <span>Dịch Vụ Y Tế Nhanh Chóng Tại</span>
              <br />
              Bệnh Viện UMC
            </h1>
            <p>
              Bệnh viện UMC cam kết cung cấp dịch vụ y tế nhanh chóng với đội
              ngũ bác sĩ và nhân viên y tế chuyên nghiệp, trang thiết bị hiện
              đại. Với các dịch vụ đa dạng từ cấp cứu, khám bệnh đến điều trị
              chuyên sâu, bệnh viện luôn sẵn sàng đáp ứng nhu cầu của bệnh nhân
              trong mọi tình huống. <br></br> <br></br>Hãy đến với Bệnh viện UMC
              để trải nghiệm dịch vụ y tế tận tình, nhanh chóng và hiệu quả, bảo
              vệ sức khỏe của bạn và gia đình!
            </p>
          </div>
          <div class="image">
            <span class="image__bg"></span>
            <img src={headerbg} alt="header image" />
            <div class="image__content image__content__1">
              <span>
                <i class="ri-user-3-line"></i>
              </span>
              <div class="details">
                <h4>1520+</h4>
                <p>Bệnh nhân đang điều trị</p>
              </div>
            </div>
            <div class="image__content image__content__2">
              <ul>
                <li>Giảm 50% các dịch vụ được thừa hưởng bảo hiển y tế</li>
              </ul>
            </div>
          </div>
        </header>

        {/* News slider */}
        <div class="tintuc-trangchu-slider">
          <h2 className="tintuc-content">CHÚNG TÔI CÓ SỰ KHÁC BIỆT</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={5}
            slidesPerView={3} /* Hiển thị 3 slide cùng lúc */
            centeredSlides={true} /* Slide giữa sẽ lớn nhất */
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
          >
            {newsImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="slide-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={image}
                    alt={`News ${index + 1}`}
                    className="gallery-image"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="overlay">
                    <span className="overlay-text">
                      Phòng khám UMC là nơi bạn có thể tin tưởng với đội ngũ bác
                      sĩ giàu kinh nghiệm, trang thiết bị hiện đại, và dịch vụ
                      chăm sóc tận tâm. Chúng tôi luôn đặt sức khỏe của bạn lên
                      hàng đầu, cam kết mang đến những giải pháp y tế toàn diện,
                      an toàn và hiệu quả. Với sự chuyên nghiệp trong quá trình
                      chẩn đoán và điều trị, Phòng khám UMC không chỉ mang đến
                      cho bạn sự an tâm mà còn là sự hài lòng về chất lượng dịch
                      vụ. Hãy đến với chúng tôi để trải nghiệm môi trường y tế
                      chuẩn quốc tế, nơi mỗi bệnh nhân đều được chăm sóc như
                      người thân trong gia đình.
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div class="gallary">
          <div class="bg-gallary"></div>
          <div class="elementor">
            <div class="elementor-title">Bệnh viện UMC</div>
            <p class="elementor-title-sub">
              là một bệnh viện đa khoa hạng I, trực thuộc Bộ Y tế
            </p>
            <div class="elementor-container">
              <div
                class="elementor-column"
                data-id="c516d6d"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap">
                  <div
                    class="elementor-element"
                    data-id="5c4d45d"
                    data-element_type="widget"
                    data-widget_type="icon.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-wrapper">
                        <div class="elementor-icon">
                          <i aria-hidden="true" class="fas fa-user-md"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-2420bd7 elementor-widget elementor-widget-counter is-mac"
                    data-id="2420bd7"
                    data-element_type="widget"
                    data-widget_type="counter.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-counter">
                        <div class="elementor-counter-title">chuyên gia</div>
                        <div class="elementor-counter-number-wrapper">
                          <span class="elementor-counter-number-prefix"></span>
                          <span
                            class="elementor-counter-number"
                            data-duration="2000"
                            data-to-value="300"
                            data-from-value="50"
                          >
                            300
                          </span>
                          <span class="elementor-counter-number-suffix">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column"
                data-id="ff53624"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap">
                  <div
                    class="elementor-element"
                    data-id="4bbbf5f"
                    data-element_type="widget"
                    data-widget_type="icon.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-wrapper">
                        <div class="elementor-icon">
                          <i aria-hidden="true" class="fas fa-user-nurse"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="elementor-element"
                    data-id="61ba185"
                    data-element_type="widget"
                    data-widget_type="counter.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-counter">
                        <div class="elementor-counter-title">nhân viên</div>
                        <div class="elementor-counter-number-wrapper">
                          <span class="elementor-counter-number-prefix"></span>
                          <span
                            class="elementor-counter-number"
                            data-duration="2000"
                            data-to-value="1300"
                            data-from-value="100"
                          >
                            1300
                          </span>
                          <span class="elementor-counter-number-suffix">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column"
                data-id="ace3244"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap">
                  <div
                    class="elementor-element"
                    data-id="202e5d8"
                    data-element_type="widget"
                    data-widget_type="icon.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-wrapper">
                        <div class="elementor-icon">
                          <i aria-hidden="true" class="fas fa-history"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="elementor-element"
                    data-id="5230edb"
                    data-element_type="widget"
                    data-widget_type="counter.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-counter">
                        <div class="elementor-counter-title">
                          năm kinh nghiệm
                        </div>
                        <div class="elementor-counter-number-wrapper">
                          <span class="elementor-counter-number-prefix"></span>
                          <span
                            class="elementor-counter-number"
                            data-duration="2000"
                            data-to-value="50"
                            data-from-value="10"
                          >
                            50
                          </span>
                          <span class="elementor-counter-number-suffix"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column"
                data-id="0e53783"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap">
                  <div
                    class="elementor-element"
                    data-id="468ce80"
                    data-element_type="widget"
                    data-widget_type="icon.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-wrapper">
                        <div class="elementor-icon">
                          <i aria-hidden="true" class="fas fa-building"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="elementor-element"
                    data-id="355c68f"
                    data-element_type="widget"
                    data-widget_type="counter.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-counter">
                        <div class="elementor-counter-title">
                          viện / khoa / phòng
                        </div>
                        <div class="elementor-counter-number-wrapper">
                          <span class="elementor-counter-number-prefix"></span>
                          <span
                            class="elementor-counter-number"
                            data-duration="2000"
                            data-to-value="50"
                            data-from-value="1"
                          >
                            920
                          </span>
                          <span class="elementor-counter-number-suffix">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column"
                data-id="fa1f855"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap">
                  <div
                    class="elementor-element"
                    data-id="9b11bb8"
                    data-element_type="widget"
                    data-widget_type="icon.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-wrapper">
                        <div class="elementor-icon">
                          <i aria-hidden="true" class="fas fa-bed"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="elementor-element"
                    data-id="8fe471d"
                    data-element_type="widget"
                    data-widget_type="counter.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-counter">
                        <div class="elementor-counter-title">giường bệnh</div>
                        <div class="elementor-counter-number-wrapper">
                          <span class="elementor-counter-number-prefix"></span>
                          <span
                            class="elementor-counter-number"
                            data-duration="2000"
                            data-to-value="1200"
                            data-from-value="500"
                          >
                            1200
                          </span>
                          <span class="elementor-counter-number-suffix">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <button
              className="lichtrinh-trangchu-button"
              onClick={() => navigate("/datkham")}
            >
              Đặt lịch hẹn ngay
            </button>
            <button className="xemchitiet-trangchu-button">Xem chi tiết</button>
          </div>
        </div>
        {/* 5. Số hotline và button tìm hiểu thêm */}
        <div className="hotline-trangchu-section">
          <h2>PHÒNG KHÁM THEO YÊU CẦU</h2>
          <p>
            Bạn không có thời gian? Hãy gọi ngay Hotline Phòng khám umc để đặt
            lịch khám dịch vụ nhanh với các bác sĩ, chuyên gia của chúng tôi
          </p>
          <h2>Hotline: 0962 240 221</h2>
          <button>Tìm hiểu thêm</button>
        </div>
        {/* 6. Góp ý liên hệ */}
        <div className="feedback-trangchu-section">
          <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>

          <div className="feedback-trangchu-container">
            <div className="feedback-trangchu-info">
              <p>
                {" "}
                Nếu quý khách có góp ý, thắc mắc hay ý kiến phản hồi, đóng góp
                xin vui lòng điền vào Mẫu bên phải và gửi cho chúng tôi. Xin
                chân thành cảm ơn!
              </p>
            </div>

            <div className="feedback-trangchu-form">
              <form>
                <div className="form-trangchu-group">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Họ tên"
                    required
                  />
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-trangchu-group">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Tiêu đề"
                    required
                  />
                  <input
                    className="input-field"
                    type="tel"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
                <div className="form-trangchu-group">
                  <textarea
                    className="textarea-field"
                    placeholder="Nội dung liên hệ"
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
        {/* 7. Footer */}
        <footer>
          <div className="footer-trangchu-left">
            <h4>Công ty cổ phần trung tâm y khoa UMC</h4>
            <p>
              <i className="fas fa-map-marker-alt"></i> 201 Nguyễn Chí Thanh,
              Phường 12, Quận 5, Thành phố Hồ Chí Minh.
            </p>
            <p>
              <i className="fas fa-phone"></i> Đường dây nóng: 0962 240 221
            </p>
            <p>
              <i className="fas fa-headset"></i> Tổng đài tư vấn: (028) 3015
              9457
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
              <i className="fas fa-child"></i> Khám Nhi, Xét nghiệm Nhi & Xét
              nghiệm nhanh Covid
            </p>
            <p>
              <i className="fas fa-sun"></i> Chủ nhật | 8:00 - 12:00
            </p>
            <p>
              <i className="fas fa-lunchbox"></i> Khám Nhi, Xét nghiệm Nhi & Xét
              nghiệm nhanh Covid
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
