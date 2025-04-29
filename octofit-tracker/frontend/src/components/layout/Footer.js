import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5 className="text-uppercase">OctoFit Tracker</h5>
            <p className="small">
              Empowering students with fitness tracking and team competitions at Mergington High School.
            </p>
          </div>
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/dashboard" className="text-white-50">Dashboard</Link></li>
              <li><Link to="/activities" className="text-white-50">Activities</Link></li>
              <li><Link to="/leaderboard" className="text-white-50">Leaderboard</Link></li>
              <li><Link to="/workouts" className="text-white-50">Workouts</Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="text-uppercase">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">About</a></li>
              <li><a href="#" className="text-white-50">Privacy Policy</a></li>
              <li><a href="#" className="text-white-50">Terms of Service</a></li>
              <li><a href="#" className="text-white-50">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-3 bg-secondary" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="small text-white-50 mb-2 mb-md-0">
            © {config.COPYRIGHT_YEAR} {config.APP_NAME} - {config.SCHOOL_NAME}. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
