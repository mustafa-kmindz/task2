// API URLs
const PRODUCTS_API = 'https://dummyjson.com/products?limit=15';
const SEARCH_API = 'https://dummyjson.com/products/search?q=';
const CATEGORIES_API = 'https://dummyjson.com/products/categories';
const CATEGORY_PRODUCTS_API = 'https://dummyjson.com/products/category/';

// Fetch initial products
export const fetchProducts = async () => {
  const response = await fetch(PRODUCTS_API);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await fetch(CATEGORIES_API);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

// Search products
export const searchProducts = async (query) => {
  const response = await fetch(`${SEARCH_API}${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${CATEGORY_PRODUCTS_API}${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category products');
  }
  return response.json();
};
