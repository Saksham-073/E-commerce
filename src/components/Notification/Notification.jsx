import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, show, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (show) {
      // Reset closing state when showing a new notification
      setIsClosing(false);
      
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        setIsClosing(true);
        
        // Allow animation to complete before calling onClose
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Animation duration
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`notification ${isClosing ? 'closing' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
