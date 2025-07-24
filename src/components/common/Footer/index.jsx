import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>StartIt</h4>
            <p>Connect. Share. Grow.</p>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={handleAboutClick}>About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 StartIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
