import React from 'react';

const ScheduleFilter = ({ onFilterChange }) => {
  // Tạo mảng tháng
  const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ];

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="month-filter">Filter by Month:</label>
        <select 
          id="month-filter" 
          onChange={(e) => onFilterChange('month', e.target.value)}
        >
          <option value="">All Months</option>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-item">
        <label htmlFor="skill-filter">Filter by Skill:</label>
        <select 
          id="skill-filter" 
          onChange={(e) => onFilterChange('skill', e.target.value)}
        >
          <option value="">All Skills</option>
          <option value="Reading">Reading</option>
          <option value="Listening">Listening</option>
          <option value="Speaking">Speaking</option>
          <option value="Writing">Writing</option>
        </select>
      </div>
      
      <div className="filter-item">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select 
          id="status-filter" 
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};

export default ScheduleFilter;