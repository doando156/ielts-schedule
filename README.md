
# IELTS Study Schedule

Ứng dụng lên lịch học và theo dõi quá trình học IELTS giúp người học quản lý thời gian và tiến độ học tập hiệu quả.

## Tính Năng Chính
- 📅 **Lên lịch học tập IELTS có cấu trúc** cho cả 4 kỹ năng: Nghe, Nói, Đọc, Viết.
- 📊 **Theo dõi tiến độ học tập** với biểu đồ trực quan.
- 🌓 **Hỗ trợ chế độ sáng/tối** giúp tối ưu trải nghiệm người dùng.
- ✅ **Cập nhật trạng thái bài học** (Chưa bắt đầu, Đang học, Đã hoàn thành, Quá hạn).
- 🔍 **Bộ lọc** giúp dễ dàng tìm kiếm bài học theo tháng, kỹ năng và trạng thái.
- 📱 **Giao diện thích ứng** với các thiết bị di động.
- 💾 **Tự động lưu tiến độ vào localStorage** để không mất dữ liệu khi làm mới trang.

## Demo
Truy cập phiên bản demo tại: [IELTS Study Schedule Demo](https://doando156.github.io/ielts-schedule/)

## Cài Đặt và Sử Dụng

### Yêu Cầu
- **Node.js** (phiên bản 12.x trở lên)
- **npm** hoặc **yarn**

### Cài Đặt
Clone repository về máy của bạn:

```bash
git clone https://github.com/doando156/ielts-schedule.git
```

Di chuyển vào thư mục dự án:

```bash
cd ielts-schedule
```

Cài đặt các gói phụ thuộc:

```bash
npm install
```

### Sử Dụng
Khởi chạy ứng dụng ở chế độ phát triển:

```bash
npm start
```

Truy cập ứng dụng tại:

```
http://localhost:3000
```

### Triển Khai
Dự án được cấu hình để triển khai lên **GitHub Pages**:

1. Đảm bảo đã cấu hình `homepage` trong `package.json`:

   ```json
   "homepage": "https://username.github.io/ielts-schedule"
   ```

2. Cài đặt **gh-pages** nếu chưa có:

   ```bash
   npm install --save-dev gh-pages
   ```

3. Triển khai lên GitHub Pages:

   ```bash
   npm run deploy
   ```

## Cấu Trúc Dự Án
```
ielts-schedule/
├── public/              # Tài nguyên tĩnh
├── src/                 # Mã nguồn
│   ├── components/      # Các component React
│   │   ├── CurrentDateIndicator.js
│   │   ├── Footer.js
│   │   ├── Pagination.js
│   │   ├── ScheduleFilter.js
│   │   ├── ScheduleTable.js
│   │   ├── StatsDashboard.js
│   │   └── ThemeToggle.js
│   ├── App.css         # Styles cho ứng dụng
│   ├── App.js          # Component chính
│   └── index.js        # Điểm vào ứng dụng
└── package.json        # Cấu hình dự án và dependencies
```

## Các Lệnh npm
- `npm start`: Chạy ứng dụng ở chế độ phát triển.
- `npm run build`: Tạo phiên bản tối ưu cho production.
- `npm run deploy`: Triển khai lên GitHub Pages.
- `npm test`: Chạy các bài kiểm thử.

## Công Nghệ Sử Dụng
- **React**
- **JavaScript (ES6+)**
- **CSS3**
- **LocalStorage API**
- **GitHub Pages**

## Tác Giả
**Do Doan**

## Giấy Phép
**Developed by Do Doan**
