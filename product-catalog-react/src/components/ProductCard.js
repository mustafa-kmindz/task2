import React, { useState } from 'react';
import ImageGallery from './ImageGallery';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  // Calculate discounted price
  const originalPrice = product.price;
  const discountedPrice = originalPrice - (originalPrice * product.discountPercentage / 100);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="product-card">
      <ImageGallery product={product} />
      
      <h3 className="product-title">{product.title}</h3>
      
      <div className="product-price">
        ${discountedPrice.toFixed(2)}
        <span className="product-original-price">${originalPrice.toFixed(2)}</span>
      </div>
      
      <div className="product-rating">
        <StarRating rating={product.rating} />
        <span className="rating-value">{product.rating.toFixed(1)}</span>
      </div>
      
      <button 
        className="show-description-btn" 
        onClick={toggleDescription}
      >
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>
      
      {showDescription && (
        <div className={`product-description ${showDescription ? 'show' : ''}`}>
          <div className="description-text">{product.description}</div>
          <button 
            className="less-description-btn" 
            onClick={toggleDescription}
          >
            Less Description
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
