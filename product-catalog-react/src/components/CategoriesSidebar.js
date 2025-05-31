import React from 'react';

const CategoriesSidebar = ({ categories, selectedCategory, onCategoryChange, onClearCategories }) => {
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <aside className="categories-sidebar">
      <h3>Categories</h3>
      <div id="categoriesContainer">
        {categories.map((category) => {
          const categoryName = typeof category === 'string' ? category : category.name || category.slug;
          const categorySlug = typeof category === 'string' ? category : category.slug || category.name;
          
          return (
            <div key={categorySlug} className="category-item">
              <input
                type="radio"
                id={`category-${categorySlug}`}
                name="category"
                value={categorySlug}
                checked={selectedCategory === categorySlug}
                onChange={() => handleCategoryChange(categorySlug)}
              />
              <label htmlFor={`category-${categorySlug}`}>
                {categoryName}
              </label>
            </div>
          );
        })}
      </div>
      <button id="clearCategoriesBtn" onClick={onClearCategories}>
        Clear All Categories
      </button>
    </aside>
  );
};

export default CategoriesSidebar;
