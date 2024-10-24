// components/Pagination.jsx
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-4 mt-8 mb-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-accent2-500 rounded disabled:bg-accent2-300"
      >
        <ArrowLeft />
      </button>
      
      <span className="px-4 py-2 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-accent2-500 rounded disabled:bg-accent2-300"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
