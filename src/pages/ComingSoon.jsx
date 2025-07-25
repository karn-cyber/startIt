import React from 'react';
import { useNavigate } from 'react-router-dom';
import startitBig from '../assets/startitBig.svg';
import poster1 from '../assets/poster1.jpg';
import poster2 from '../assets/poster2.jpg';
import { IoArrowBack } from 'react-icons/io5';
import './ComingSoon.scss';

const ComingSoon = ({ feature = "This Feature" }) => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack />
          Back
        </button>

        <div className="coming-soon-content">
          <div className="logo-section">
            <img src={startitBig} alt="StartIt Logo" className="startit-logo" />
          </div>

          <div className="poster-section">
            <div className="poster-grid">
              <div className="poster-card">
                <img src={poster1} alt="Coming Soon Visual" className="poster-image" />
              </div>
              <div className="poster-card">
                <img src={poster2} alt="Coming Soon Visual" className="poster-image" />
              </div>
            </div>
          </div>

          <div className="message-section">
            <h1 className="coming-soon-title">Coming Soon</h1>
            <p className="coming-soon-subtitle">
              {feature} is currently under development
            </p>
            <p className="coming-soon-description">
              We're working hard to bring you an amazing experience. 
              This feature will be available in our next update.
            </p>
            
            <div className="features-preview">
              <h3>What's Coming:</h3>
              <ul>
                <li>Enhanced user experience</li>
                <li>Real-time interactions</li>
                <li>Advanced functionality</li>
                <li>Mobile optimization</li>
              </ul>
            </div>

            <div className="cta-section">
              <button className="primary-btn" onClick={() => navigate('/homepage')}>
                Back to Home
              </button>
              <button className="secondary-btn" onClick={() => navigate('/about')}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="background-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;