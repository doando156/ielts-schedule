import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Phần giới thiệu */}
        <div className="footer-section">
          <h3>IELTS Study Schedule</h3>
          <p>Lập kế hoạch học tập IELTS hiệu quả với công cụ quản lý thời gian thông minh</p>
        </div>
        
        {/* Các liên kết quan trọng */}
        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li>
              <a
                href="https://ieltstrainingonline.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                IELTS Training Online
              </a>
            </li>
            <li>
              <a href="/guide">
                Hướng dẫn sử dụng
              </a>
            </li>
            <li>
              <a href="/about">
                Về chúng tôi
              </a>
            </li>
          </ul>
        </div>
        
        {/* Thông tin liên hệ */}
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>Email: <a href="mailto:dodoan1333@gmail.com">dodoan1333@gmail.com</a></p>
          <p>Số điện thoại: <a href="tel:+84123456789">+84 123 456 789</a></p>
          <div className="social-links">
            {/* Thay 📘 bằng icon Facebook nếu muốn */}
            <a
              href="https://www.facebook.com/doandeptraivl"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
            >
              📘
            </a>
          </div>
        </div>
      </div>
      
      {/* Phần bản quyền */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} IELTS Study Schedule. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
