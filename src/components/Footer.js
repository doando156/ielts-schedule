import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>IELTS Study Schedule</h3>
          <p>Lập kế hoạch học tập IELTS hiệu quả với công cụ quản lý thời gian thông minh</p>
        </div>
        
        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li><a href="https://ieltstrainingonline.com" target="_blank" rel="noopener noreferrer">IELTS Training Online</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); alert('Tính năng đang phát triển');}}>Hướng dẫn sử dụng</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); alert('Tính năng đang phát triển');}}>Về chúng tôi</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>Email: dodoan1333@gmail.com</p>
          <div className="social-links">
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">📧</a>
            <a href="#" className="social-icon">📘</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} IELTS Study Schedule. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;