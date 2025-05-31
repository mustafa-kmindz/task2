import React from 'react';

const MobileControls = ({ categories, selectedCategory, onCategoryChange, onSort }) => {
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSortChange = (e) => {
    if (e.target.value) {
      onSort(e.target.value);
    }
  };

  return (
    <div className="mobile-controls">
      {/* Mobile Categories Dropdown */}
      <div className="mobile-dropdown mobile-categories-dropdown">
        <label className="dropdown-label" htmlFor="mobileCategoriesSelect">
          Filter by Category
        </label>
        <select
          id="mobileCategoriesSelect"
          className="dropdown-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => {
            const categoryName = typeof category === 'string' ? category : category.name || category.slug;
            const categorySlug = typeof category === 'string' ? category : category.slug || category.name;
            return (
              <option key={categorySlug} value={categorySlug}>
                {categoryName}
              </option>
            );
          })}
        </select>
      </div>

      {/* Mobile Sort Dropdown */}
      <div className="mobile-dropdown mobile-sort-dropdown">
        <label className="dropdown-label" htmlFor="mobileSortSelect">
          Sort Products
        </label>
        <select
          id="mobileSortSelect"
          className="dropdown-select"
          onChange={handleSortChange}
          defaultValue=""
        >
          <option value="">Select Sort Option</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="rating-high-to-low">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default MobileControls;
