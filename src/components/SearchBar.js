import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bài học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;