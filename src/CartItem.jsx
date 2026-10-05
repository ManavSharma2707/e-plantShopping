import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Navbar from './Navbar';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onHomeClick, onPlantsClick, onCartClick }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Subtotal for a single item: cost * quantity
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Sum of all item subtotals
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  // Sum of all quantities
  const totalPlants = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would drop to 0, so remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
      />

      <div className="cart-container">
        <h2 className="cart-heading">Shopping Cart</h2>

        <div className="cart-summary">
          <p className="cart-total-plants">Total Plants in Cart: {totalPlants}</p>
          <p className="cart-total-amount">
            Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
          </p>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit Price: ${item.cost.toFixed(2)}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-item-button"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${calculateTotalCost(item).toFixed(2)}
                  </div>
                </div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-shopping-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
