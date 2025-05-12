import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/landing" replace />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/landing" replace />} />
          <Route path="/landing" element={isAuthenticated ? <Landing /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/landing" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/landing" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;