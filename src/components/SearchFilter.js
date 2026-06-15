import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <div className="search-filter">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'present' ? 'active' : ''}`}
          onClick={() => setFilter('present')}
        >
          Present
        </button>
        <button
          className={`filter-btn ${filter === 'absent' ? 'active' : ''}`}
          onClick={() => setFilter('absent')}
        >
          Absent
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
