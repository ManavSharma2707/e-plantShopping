import React from 'react';
import { useSelector } from 'react-redux';
import './ProductList.css';

// Shared navbar used on both the Plants page and the Cart page.
function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  // Live total quantity of all items in the cart
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">Paradise Nursery</div>
      <div className="navbar-links">
        <button className="nav-link" onClick={onHomeClick}>
          Home
        </button>
        <button className="nav-link" onClick={onPlantsClick}>
          Plants
        </button>
        <button className="nav-link cart-link" onClick={onCartClick} aria-label="Cart">
          <span className="cart-icon-wrapper">
            <svg
              className="cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-badge">{totalQuantity}</span>
          </span>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
