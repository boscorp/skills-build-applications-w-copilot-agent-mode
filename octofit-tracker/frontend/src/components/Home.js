import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import './Home.css';

function Home() {
  return (
    <div className="home-container fade-in">
      <div className="hero-section text-white text-center py-5 mb-5">
        <div className="hero-pattern"></div>
        <div className="container hero-content">
          <img src="/octofitapp-logo.png" alt={config.APP_NAME} className="home-logo" />
          <h1 className="display-4 fw-bold">Welcome to {config.APP_NAME}</h1>
          <p className="lead fs-3 my-4">
            Track your fitness activities, join teams, and compete on the leaderboard!
          </p>
          <hr className="my-4 bg-white opacity-50" />
          <p className="mb-4 fs-5">
            {config.APP_NAME} is {config.SCHOOL_NAME}'s fitness tracking platform designed to help students and faculty stay active and motivated.
          </p>
          <div className="home-buttons mt-4">
            <Link to="/login" className="btn btn-light btn-lg">
              <i className="fas fa-sign-in-alt me-2"></i> Sign In
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              <i className="fas fa-user-plus me-2"></i> Register
            </Link>
          </div>
        </div>
      </div>

      <div className="container features-section my-5 pt-4">
        <h2 className="text-center mb-5 fw-bold">Key Features</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-running"></i>
                </div>
                <h3 className="card-title h4 mb-3">Activity Tracking</h3>
                <p className="card-text">
                  Log and monitor your physical activities, from running to swimming to yoga with detailed analytics.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="card-title h4 mb-3">Team Competitions</h3>
                <p className="card-text">
                  Join teams, participate in challenges, and work together to reach fitness goals with your classmates.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h3 className="card-title h4 mb-3">Leaderboards</h3>
                <p className="card-text">
                  Compete with friends and classmates to reach the top of the leaderboard and earn recognition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container my-5 pt-3">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card testimonial shadow-sm">
              <div className="card-body">
                <i className="fas fa-quote-left testimonial-quote"></i>
                <p className="lead mb-3 fst-italic">
                  "Since we started using {config.APP_NAME}, student participation in physical activities has increased by 45%. It's become a fun part of our school culture."
                </p>
                <p className="text-end mb-0 fw-bold">- Paul Octo, Physical Education Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5 my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">About {config.APP_NAME}</h2>
              <p className="lead mb-4">
                {config.APP_NAME} is designed specifically for {config.SCHOOL_NAME} to encourage physical fitness and friendly competition among students and staff.
              </p>
              <p className="mb-4">
                Our platform makes it easy to track various physical activities, join teams, participate in challenges, and see real-time progress on leaderboards.
              </p>
              <Link to="/dashboard" className="btn btn-primary">
                <i className="fas fa-tachometer-alt me-2"></i> View Dashboard
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-4">Get started in 3 simple steps:</h3>
                  <div className="d-flex mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', flexShrink: 0}}>1</div>
                    <div>
                      <h4 className="h6 fw-bold mb-1">Create an account</h4>
                      <p className="mb-0 text-muted">Register with your school email address to get started</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>2</div>
                    <div>
                      <h4 className="h6 fw-bold mb-1">Join a team</h4>
                      <p className="mb-0 text-muted">Or create your own team with friends</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>3</div>
                    <div>
                      <h4 className="h6 fw-bold mb-1">Start logging activities</h4>
                      <p className="mb-0 text-muted">Track your exercises and compete on the leaderboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
