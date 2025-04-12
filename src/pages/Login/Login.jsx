import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import Notification from '../../components/Notification/Notification';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Clear any existing tokens when the login page loads
    localStorage.removeItem('token');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      setShowError(true);
      return;
    }

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
        setShowError(true);
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      setShowError(true);
    }
  };

  const closeNotification = () => {
    setShowError(false);
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Fashion Store</h1>
        <p className="login-subtitle">Sign in to your account</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-hint">
            For demo, use: <br />
            Username: <strong>johnd</strong> <br />
            Password: <strong>m38rmF$</strong>
          </div>
          
          <button type="submit" className="btn login-btn">
            Sign In
          </button>
        </form>
      </div>

      <Notification 
        message={error} 
        show={showError} 
        onClose={closeNotification} 
      />
    </div>
  );
};

export default Login;
