import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getLoginInfo } from '../utils/loginInfo'; 
import '../ProjectCss/navbar.css';

const NavBar = () => {
  const location = useLocation();
  const isLoggedIn = !!getLoginInfo()?.token; 

  useEffect(() => {
  }, [location]);
  return (
    <div>
      <nav className="navbar">
        {isLoggedIn ? (
          <>
            {/* Show Product and Logout when logged in */}
            <NavLink to="/" className="navbar-link">
              Product
            </NavLink>
            <NavLink to="/logout" className="navbar-link">
              Logout
            </NavLink>
            <NavLink to="/admin" className="navbar-link">
              Admin Panel
            </NavLink>
          </>
        ) : (
          <>
            {/* Show Register and Login when not logged in */}
            <NavLink to="/create" className="navbar-link">
              Register
            </NavLink>
            <NavLink to="/login" className="navbar-link">
              Login
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;

