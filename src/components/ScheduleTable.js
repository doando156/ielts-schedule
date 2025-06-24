import React from 'react';

const ScheduleTable = ({ schedule, updateStatus, highlightToday }) => {
  const today = new Date();

  // Kiểm tra xem một hàng có phải là ngày hôm nay không
  const isTodayRow = (dateStr) => {
    const itemDate = new Date(dateStr);
    return itemDate.toDateString() === today.toDateString();
  };
  
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Skill</th>
          <th>Status</th>
          <th>Lesson Name</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item, index) => (
          <tr 
            key={index} 
            className={`
              status-${item.status.replace(/\s+/g, '-')}
              ${highlightToday && isTodayRow(item.date) ? 'today-row' : ''}
            `}
          >
            <td className="date-cell">
              {item.date}
              {highlightToday && isTodayRow(item.date) && 
                <span className="today-badge">Hôm nay</span>
              }
            </td>
            <td>{item.time}</td>
            <td>{item.skill}</td>
            <td>
              <select
                value={item.status}
                onChange={(e) => updateStatus(index, e.target.value)}
                className={`status-select ${item.status.replace(/\s+/g, '-')}`}
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </td>
            <td>{item.name}</td>
            <td>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                View Lesson
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;