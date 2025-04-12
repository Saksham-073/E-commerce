import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Notification from '../../components/Notification/Notification';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { addToCart, showNotification, notificationMessage } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Error: {error}</p>
        <Link to="/" className="btn" style={{ marginTop: '20px' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Product not found</p>
        <Link to="/" className="btn" style={{ marginTop: '20px' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / {product.category} / {product.title}
        </div>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.title}</h1>
            
            <p className="product-detail-category">
              Category: <span>{product.category}</span>
            </p>
            
            <div className="product-detail-rating">
              <span className="rating-value">{product.rating?.rate || 0}</span>/5
              <span className="rating-count">({product.rating?.count || 0} reviews)</span>
            </div>
            
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            
            <p className="product-detail-description">{product.description}</p>
            
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select 
                  id="quantity" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                className="btn add-to-cart-btn" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Notification 
        message={notificationMessage} 
        show={showNotification} 
      />
    </div>
  );
};

export default ProductDetail;