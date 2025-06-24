import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button 
        onClick={() => paginate(currentPage - 1)}
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>
      
      <div className="page-numbers">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => paginate(currentPage + 1)}
        className={`pagination-button ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
        disabled={currentPage === pageNumbers.length}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;