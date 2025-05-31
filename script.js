// Global variables
let allProducts = [];
let currentProducts = [];
let categories = [];

// DOM elements
const productsContainer = document.getElementById('productsContainer');
const categoriesContainer = document.getElementById('categoriesContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const clearCategoriesBtn = document.getElementById('clearCategoriesBtn');
const sortPriceLowToHigh = document.getElementById('sortPriceLowToHigh');
const sortPriceHighToLow = document.getElementById('sortPriceHighToLow');
const sortRatingHighToLow = document.getElementById('sortRatingHighToLow');

// API URLs
const PRODUCTS_API = 'https://dummyjson.com/products?limit=15';
const SEARCH_API = 'https://dummyjson.com/products/search?q=';
const CATEGORIES_API = 'https://dummyjson.com/products/categories';
const CATEGORY_PRODUCTS_API = 'https://dummyjson.com/products/category/';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        showLoading();
        await Promise.all([
            loadInitialProducts(),
            loadCategories()
        ]);
        setupEventListeners();
    } catch (error) {
        showError('Failed to initialize application');
        console.error('Initialization error:', error);
    }
}

// Load initial products (STEP-1)
async function loadInitialProducts() {
    try {
        const response = await fetch(PRODUCTS_API);
        const data = await response.json();
        allProducts = data.products;
        currentProducts = [...allProducts];
        displayProducts(currentProducts);
    } catch (error) {
        showError('Failed to load products');
        console.error('Error loading products:', error);
    }
}

// Load categories (STEP-3)
async function loadCategories() {
    try {
        const response = await fetch(CATEGORIES_API);
        categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        showError('Failed to load categories');
        console.error('Error loading categories:', error);
    }
}

// Display products
function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">No products found</div>';
        return;
    }

    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Calculate discounted price
    const originalPrice = product.price;
    const discountedPrice = originalPrice - (originalPrice * product.discountPercentage / 100);
    
    // Generate star rating
    const starsHTML = generateStarRating(product.rating);
    
    // Generate image gallery HTML
    const imageGalleryHTML = createImageGallery(product);
    
    card.innerHTML = `
        ${imageGalleryHTML}
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
            $${discountedPrice.toFixed(2)}
            <span class="product-original-price">$${originalPrice.toFixed(2)}</span>
        </div>
        <div class="product-rating">
            <span class="stars">${starsHTML}</span>
            <span class="rating-value">${product.rating.toFixed(1)}</span>
        </div>
        <button class="show-description-btn" onclick="toggleDescription(${product.id})">Show Description</button>
        <div id="description-${product.id}" class="product-description">
            <div class="description-text">${product.description}</div>
            <button class="less-description-btn" onclick="toggleDescription(${product.id})">Less Description</button>
        </div>
    `;
    
    return card;
}

// Create image gallery with multiple images and thumbnails
function createImageGallery(product) {
    const images = product.images || [];
    const hasMultipleImages = images.length > 1;
    const containerClass = hasMultipleImages ? '' : 'single-image';
    
    let thumbnailsHTML = '';
    if (hasMultipleImages) {
        thumbnailsHTML = `
            <div class="thumbnails-container">
                ${images.map((image, index) => `
                    <img src="${image}" 
                         alt="${product.title} thumbnail ${index + 1}" 
                         class="product-thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="changeMainImage(${product.id}, ${index})"
                         onerror="this.src='https://via.placeholder.com/60x60?text=No+Thumb'">
                `).join('')}
            </div>
        `;
    } else if (product.thumbnail) {
        // Show single thumbnail if only one image but thumbnail exists
        thumbnailsHTML = `
            <div class="thumbnails-container">
                <img src="${product.thumbnail}" 
                     alt="${product.title} thumbnail" 
                     class="product-thumbnail active" 
                     onerror="this.src='https://via.placeholder.com/60x60?text=No+Thumb'">
            </div>
        `;
    }
    
    return `
        <div class="product-image-container ${containerClass}" data-product-id="${product.id}">
            <img src="${images[0] || product.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${product.title}" 
                 class="product-image" 
                 id="main-image-${product.id}"
                 onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            ${hasMultipleImages ? `
                <button class="image-navigation prev-image" onclick="navigateImage(${product.id}, -1)">‹</button>
                <button class="image-navigation next-image" onclick="navigateImage(${product.id}, 1)">›</button>
                <div class="image-counter" id="counter-${product.id}">1 / ${images.length}</div>
            ` : ''}
        </div>
        ${thumbnailsHTML}
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

// Toggle product description
function toggleDescription(productId) {
    const descriptionElement = document.getElementById(`description-${productId}`);
    descriptionElement.classList.toggle('show');
}

// Display categories
function displayCategories(categories) {
    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        
        const categoryName = typeof category === 'string' ? category : category.name || category.slug;
        const categorySlug = typeof category === 'string' ? category : category.slug || category.name;
        
        categoryItem.innerHTML = `
            <input type="radio" id="category-${categorySlug}" name="category" value="${categorySlug}">
            <label for="category-${categorySlug}">${categoryName}</label>
        `;
        
        categoriesContainer.appendChild(categoryItem);
        
        // Add event listener to radio button
        const radioButton = categoryItem.querySelector('input[type="radio"]');
        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                loadProductsByCategory(categorySlug);
            }
        });
    });
}

// Load products by category
async function loadProductsByCategory(category) {
    try {
        showLoading();
        const response = await fetch(`${CATEGORY_PRODUCTS_API}${category}`);
        const data = await response.json();
        currentProducts = data.products;
        displayProducts(currentProducts);
    } catch (error) {
        showError('Failed to load category products');
        console.error('Error loading category products:', error);
    }
}

// Search products (STEP-2)
async function searchProducts() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`${SEARCH_API}${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        currentProducts = data.products;
        displayProducts(currentProducts);
        
        // Clear category selection
        clearCategorySelection();
    } catch (error) {
        showError('Failed to search products');
        console.error('Error searching products:', error);
    }
}

// Clear search and show original products
function clearSearch() {
    searchInput.value = '';
    currentProducts = [...allProducts];
    displayProducts(currentProducts);
    clearCategorySelection();
}

// Clear category selection
function clearCategorySelection() {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.checked = false;
    });
}

// Clear categories and show all products
function clearCategories() {
    clearCategorySelection();
    currentProducts = [...allProducts];
    displayProducts(currentProducts);
}

// Sorting functions
function sortProductsByPriceLowToHigh() {
    currentProducts.sort((a, b) => {
        const priceA = a.price - (a.price * a.discountPercentage / 100);
        const priceB = b.price - (b.price * b.discountPercentage / 100);
        return priceA - priceB;
    });
    displayProducts(currentProducts);
}

function sortProductsByPriceHighToLow() {
    currentProducts.sort((a, b) => {
        const priceA = a.price - (a.price * a.discountPercentage / 100);
        const priceB = b.price - (b.price * b.discountPercentage / 100);
        return priceB - priceA;
    });
    displayProducts(currentProducts);
}

function sortProductsByRatingHighToLow() {
    currentProducts.sort((a, b) => b.rating - a.rating);
    displayProducts(currentProducts);
}

// Event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Clear search
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Clear categories
    clearCategoriesBtn.addEventListener('click', clearCategories);
    
    // Sort buttons
    sortPriceLowToHigh.addEventListener('click', sortProductsByPriceLowToHigh);
    sortPriceHighToLow.addEventListener('click', sortProductsByPriceHighToLow);
    sortRatingHighToLow.addEventListener('click', sortProductsByRatingHighToLow);
      // Setup keyboard navigation for images
    setupKeyboardNavigation();
    
    // Setup touch navigation for mobile
    setupTouchNavigation();
    
    // Setup image loading states
    addImageLoadingStates();
}

// Utility functions
function showLoading() {
    productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
}

function showError(message) {
    productsContainer.innerHTML = `<div class="error">${message}</div>`;
}

// Make functions available globally
window.toggleDescription = toggleDescription;
window.changeMainImage = changeMainImage;
window.navigateImage = navigateImage;

// Image gallery functions
function changeMainImage(productId, imageIndex) {
    const mainImage = document.getElementById(`main-image-${productId}`);
    const thumbnails = document.querySelectorAll(`[data-product-id="${productId}"] .product-thumbnail`);
    const counter = document.getElementById(`counter-${productId}`);
    
    // Find the product to get its images
    const product = [...allProducts, ...currentProducts].find(p => p.id === productId);
    if (!product || !product.images) return;
    
    // Update main image
    mainImage.src = product.images[imageIndex];
    
    // Update thumbnail active state
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === imageIndex);
    });
    
    // Update counter
    if (counter) {
        counter.textContent = `${imageIndex + 1} / ${product.images.length}`;
    }
    
    // Store current index for navigation
    mainImage.dataset.currentIndex = imageIndex;
}

function navigateImage(productId, direction) {
    const mainImage = document.getElementById(`main-image-${productId}`);
    const product = [...allProducts, ...currentProducts].find(p => p.id === productId);
    
    if (!product || !product.images) return;
    
    const currentIndex = parseInt(mainImage.dataset.currentIndex || '0');
    const totalImages = product.images.length;
    let newIndex = currentIndex + direction;
    
    // Handle wraparound
    if (newIndex >= totalImages) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalImages - 1;
    }
    
    changeMainImage(productId, newIndex);
}

// Keyboard navigation for images
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Only work if focus is on a product card
        const activeElement = document.activeElement;
        const productCard = activeElement.closest('.product-card');
        
        if (!productCard) return;
        
        const imageContainer = productCard.querySelector('.product-image-container');
        if (!imageContainer) return;
        
        const productId = parseInt(imageContainer.dataset.productId);
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateImage(productId, -1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateImage(productId, 1);
        }
    });
}

// Touch/swipe support for mobile image navigation
function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    let currentProductId = null;
    
    document.addEventListener('touchstart', function(e) {
        const imageContainer = e.target.closest('.product-image-container');
        if (!imageContainer) return;
        
        currentProductId = parseInt(imageContainer.dataset.productId);
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!currentProductId) return;
        
        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only trigger if horizontal swipe is dominant and significant
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe right - previous image
                navigateImage(currentProductId, -1);
            } else {
                // Swipe left - next image
                navigateImage(currentProductId, 1);
            }
        }
        
        currentProductId = null;
    }, { passive: true });
}

// Add loading states for better UX
function addImageLoadingStates() {
    document.addEventListener('load', function(e) {
        if (e.target.classList.contains('product-image')) {
            e.target.style.opacity = '1';
        }
    }, true);
    
    document.addEventListener('error', function(e) {
        if (e.target.classList.contains('product-image') || e.target.classList.contains('product-thumbnail')) {
            e.target.style.opacity = '0.7';
        }
    }, true);
}
