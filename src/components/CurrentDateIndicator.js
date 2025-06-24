import React from 'react';

// Cải thiện hiển thị ngày hiện tại trong dark mode
const CurrentDateIndicator = ({ schedule }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('vi-VN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Tính số bài học đã hoàn thành
  const completed = schedule.filter(item => item.status === 'completed').length;
  // Tính số bài học quá hạn
  const overdue = schedule.filter(item => item.status === 'overdue').length;
  // Tính số bài học cần làm hôm nay
  const todayItems = schedule.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === today.toDateString();
  });
  
  return (
    <div className="current-date-indicator">
      <div className="today-info">
        <div className="today-date">
          <i className="fa fa-calendar"></i> Hôm nay: {formattedDate}
        </div>
        <div className="progress-info">
          <div className="progress-item">
            <span className="progress-label">Đã hoàn thành:</span>
            <span className="progress-value completed">{completed}</span>
          </div>
          <div className="progress-item">
            <span className="progress-label">Quá hạn:</span>
            <span className="progress-value overdue">{overdue}</span>
          </div>
          <div className="progress-item">
            <span className="progress-label">Cần làm hôm nay:</span>
            <span className="progress-value today">{todayItems.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDateIndicator;