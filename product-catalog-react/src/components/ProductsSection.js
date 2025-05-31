import React from 'react';
import ProductCard from './ProductCard';

const ProductsSection = ({ products, loading, error, onSort }) => {
  const handleSort = (sortType) => {
    onSort(sortType);
  };

  if (loading) {
    return (
      <main className="products-section">
        <div className="loading">Loading products...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-section">
        <div className="error">{error}</div>
      </main>
    );
  }

  return (
    <main className="products-section">
      {/* Sort Buttons (desktop only) */}
      <div className="sort-buttons">
        <button 
          id="sortPriceLowToHigh" 
          onClick={() => handleSort('price-low-to-high')}
        >
          Sort By Price Low To High
        </button>
        <button 
          id="sortPriceHighToLow" 
          onClick={() => handleSort('price-high-to-low')}
        >
          Sort By Price High To Low
        </button>
        <button 
          id="sortRatingHighToLow" 
          onClick={() => handleSort('rating-high-to-low')}
        >
          Sort By Rating (High to Low)
        </button>
      </div>

      {/* Products Container */}
      <div id="productsContainer" className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
};

export default ProductsSection;
