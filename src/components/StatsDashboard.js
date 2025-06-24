import React from 'react';

const StatsDashboard = ({ schedule }) => {
  // Calculate statistics
  const totalLessons = schedule.length;
  const completed = schedule.filter(item => item.status === 'completed').length;
  const inProgress = schedule.filter(item => item.status === 'in progress').length;
  const notStarted = schedule.filter(item => item.status === 'not started').length;
  const overdue = schedule.filter(item => item.status === 'overdue').length;
  
  // Calculate completion percentage
  const completionPercentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  
  return (
    <div className="stats-dashboard">
      <h2>Study Progress</h2>
      
      {/* Phần trăm hoàn thành được đặt giữa */}
      <div className="completion-percentage">
        <span className="percentage-value">{completionPercentage}%</span>
        <span className="percentage-label">Completed</span>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{totalLessons}</div>
          <div className="stat-label">Total Lessons</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-value">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{notStarted}</div>
          <div className="stat-label">Not Started</div>
        </div>
        
        <div className="stat-card overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;