import React from 'react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="theme-toggle">
      <button 
        className={`theme-toggle-button ${darkMode ? 'dark' : 'light'}`}
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <span className="theme-label">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </div>
  );
};

export default ThemeToggle;