// Create a new file: src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || '{}')
  );
  const [loading, setLoading] = useState(false);
  
  // Method to handle login
  const login = (token, userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  // Method to handle logout
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser({});
  };
  
  // Context value
  const value = {
    isAuthenticated,
    user,
    loading,
    setLoading,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);