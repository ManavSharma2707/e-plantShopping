import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // Simple page switching with state (no router, so GitHub Pages never 404s)
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'plants' | 'cart'

  const handleHomeClick = () => setCurrentPage('landing');
  const handlePlantsClick = () => setCurrentPage('plants');
  const handleCartClick = () => setCurrentPage('cart');

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p className="tagline">Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handlePlantsClick}>
              Get Started
            </button>
            <AboutUs />
          </div>
        </div>
      )}

      {currentPage === 'plants' && (
        <ProductList
          onHomeClick={handleHomeClick}
          onPlantsClick={handlePlantsClick}
          onCartClick={handleCartClick}
        />
      )}

      {currentPage === 'cart' && (
        <CartItem
          onContinueShopping={handlePlantsClick}
          onHomeClick={handleHomeClick}
          onPlantsClick={handlePlantsClick}
          onCartClick={handleCartClick}
        />
      )}
    </div>
  );
}

export default App;
