import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import Notification from '../../components/Notification/Notification';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart, displayNotification } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
    displayNotification("Order placed successfully!");
    
    // Hide the success message after 4 seconds
    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-value">${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="cart-actions">
                <Link to="/" className="btn btn-secondary">
                  Continue Shopping
                </Link>
                <button 
                  className="btn" 
                  onClick={handleCheckout}
                  disabled={orderPlaced}
                >
                  {orderPlaced ? 'Order Placed!' : 'Checkout'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;