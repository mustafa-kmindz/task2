import React, { useState } from 'react';

const ImageGallery = ({ product }) => {
  const images = product.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const changeMainImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
  };

  const navigateImage = (direction) => {
    const totalImages = images.length;
    let newIndex = currentImageIndex + direction;

    // Handle wraparound
    if (newIndex >= totalImages) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = totalImages - 1;
    }

    setCurrentImageIndex(newIndex);
  };

  const containerClass = hasMultipleImages ? '' : 'single-image';
  const mainImageSrc = images[currentImageIndex] || product.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <>
      <div className={`product-image-container ${containerClass}`} data-product-id={product.id}>
        <img
          src={mainImageSrc}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {hasMultipleImages && (
          <>
            <button 
              className="image-navigation prev-image" 
              onClick={() => navigateImage(-1)}
            >
              ‹
            </button>
            <button 
              className="image-navigation next-image" 
              onClick={() => navigateImage(1)}
            >
              ›
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="thumbnails-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} thumbnail ${index + 1}`}
              className={`product-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => changeMainImage(index)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60?text=No+Thumb';
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
