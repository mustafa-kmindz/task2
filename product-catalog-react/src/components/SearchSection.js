import React, { useState } from 'react';

const SearchSection = ({ searchTerm, onSearch, onClearSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onClearSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(localSearchTerm);
    }
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          placeholder="Search products..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="searchBtn" onClick={() => onSearch(localSearchTerm)}>
          Search
        </button>
        <button id="clearSearchBtn" onClick={handleClear}>
          Clear Searches
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
