import React, { useState, useEffect } from 'react';
import './App.css';
import SearchSection from './components/SearchSection';
import MobileControls from './components/MobileControls';
import CategoriesSidebar from './components/CategoriesSidebar';
import ProductsSection from './components/ProductsSection';
import { fetchProducts, fetchCategories, searchProducts, fetchProductsByCategory } from './services/api';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      
      setAllProducts(productsData.products);
      setCurrentProducts(productsData.products);
      setCategories(categoriesData);
    } catch (error) {
      setError('Failed to initialize application');
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    if (!term.trim()) {
      alert('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await searchProducts(term);
      setCurrentProducts(data.products);
      setSearchTerm(term);
      setSelectedCategory(''); // Clear category selection
    } catch (error) {
      setError('Failed to search products');
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentProducts([...allProducts]);
    setSelectedCategory('');
  };

  const handleCategoryChange = async (category) => {
    if (!category) {
      setCurrentProducts([...allProducts]);
      setSelectedCategory('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await fetchProductsByCategory(category);
      setCurrentProducts(data.products);
      setSelectedCategory(category);
      setSearchTerm(''); // Clear search term
    } catch (error) {
      setError('Failed to load category products');
      console.error('Error loading category products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCategories = () => {
    setSelectedCategory('');
    setCurrentProducts([...allProducts]);
  };

  const handleSort = (sortType) => {
    const sortedProducts = [...currentProducts];
    
    switch (sortType) {
      case 'price-low-to-high':
        sortedProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discountPercentage / 100);
          const priceB = b.price - (b.price * b.discountPercentage / 100);
          return priceA - priceB;
        });
        break;
      case 'price-high-to-low':
        sortedProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discountPercentage / 100);
          const priceB = b.price - (b.price * b.discountPercentage / 100);
          return priceB - priceA;
        });
        break;
      case 'rating-high-to-low':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setCurrentProducts(sortedProducts);
  };

  return (
    <div className="container">
      <header>
        <h1>Task 2</h1>
      </header>
      
      <SearchSection 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      
      <MobileControls 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSort={handleSort}
      />

      <div className="main-content">
        <CategoriesSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onClearCategories={handleClearCategories}
        />

        <ProductsSection 
          products={currentProducts}
          loading={loading}
          error={error}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default App;
