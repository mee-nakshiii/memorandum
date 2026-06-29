import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = 'Search...' }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-input-group">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
