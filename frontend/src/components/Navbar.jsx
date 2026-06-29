import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if token exists in localStorage to update auth status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          🎓 <span>Memorandum</span>
        </NavLink>

        <button 
          className="navbar-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/alumni" 
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Alumni
          </NavLink>
          <NavLink 
            to="/jobs" 
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </NavLink>
          <NavLink 
            to="/events" 
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Events
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button 
                className="navbar-btn" 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
