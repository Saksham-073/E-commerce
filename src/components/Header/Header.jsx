import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { getCartCount } = useCart();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Fashion Store
        </Link>
        
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/cart" className={location.pathname === '/cart' ? 'nav-link active' : 'nav-link'}>
            Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;