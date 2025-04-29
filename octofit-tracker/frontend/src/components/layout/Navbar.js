import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import config from '../../config';
import './Navbar.css';

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  
  const collapseNavbar = () => {
    setExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img 
            src="/octofitapp-logo.png" 
            alt={`${config.APP_NAME} Logo`} 
            className="navbar-logo me-2"
          />
          {config.APP_NAME}
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={expanded ? "true" : "false"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                to="/dashboard"
                onClick={collapseNavbar}
              >
                <i className="fas fa-tachometer-alt me-1"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/activities"
                onClick={collapseNavbar}
              >
                <i className="fas fa-running me-1"></i> Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/teams"
                onClick={collapseNavbar}
              >
                <i className="fas fa-users me-1"></i> Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/leaderboard"
                onClick={collapseNavbar}
              >
                <i className="fas fa-trophy me-1"></i> Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/workouts"
                onClick={collapseNavbar}
              >
                <i className="fas fa-heartbeat me-1"></i> Workouts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/users"
                onClick={collapseNavbar}
              >
                <i className="fas fa-user-friends me-1"></i> Users
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                to="/profile"
                onClick={collapseNavbar}
              >
                <i className="fas fa-user-circle me-1"></i> Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active btn btn-outline-light btn-sm ms-2" : "nav-link btn btn-outline-light btn-sm ms-2"}
                to="/login"
                onClick={collapseNavbar}
              >
                <i className="fas fa-sign-in-alt me-1"></i> Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
