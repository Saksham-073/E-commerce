import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRefresh = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          setUser(userData);
          // Redirect to products page on refresh if authenticated
          navigate('/');
        } catch (error) {
          console.error("Failed to parse user data", error);
        }
      }
      setLoading(false);
    };

    // Add event listener for page load
    window.addEventListener('load', handleRefresh);
    
    // Initial check
    handleRefresh();

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleRefresh);
    };
  }, [navigate]);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      const userObj = { username };
      localStorage.setItem('user', JSON.stringify(userObj));
      
      setIsAuthenticated(true);
      setUser(userObj);
      setLoading(false);
      navigate('/'); // Redirect to products page after login
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
}

export default useAuth;