import React, { useEffect } from 'react';
import Footer from '../components/common/Footer';
import '../Sass/About.scss';
import poster1 from '../assets/poster1.jpg';
import poster2 from '../assets/poster2.jpg';
import { FiZap, FiPenTool, FiTrendingUp, FiStar } from 'react-icons/fi';

const About = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleBookAppointment = () => {
    window.open('https://calendly.com/neelanshu-2024-nst/30min', '_blank');
  };

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>Welcome to StartIt</h1>
          <p className="hero-subtitle">Where creativity knows no bounds</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-intro">
          <div className="intro-text">
            <h2>The Modern Era of Connection</h2>
            <p>
              StartIt is more than just a platform – it's a revolution in how we connect, 
              collaborate, and create in the digital age. We're building the future where 
              professionals, freelancers, and visionaries come together to showcase their 
              creative potential and live life to the fullest.
            </p>
          </div>
        </section>

        <section className="about-posters">
          <div className="poster-grid">
            <div className="poster-card">
              <img src={poster1} alt="Showcase Your Creative" className="poster-image" />
            </div>
            
            <div className="poster-card">
              <img src={poster2} alt="Visual Noire" className="poster-image" />
            </div>
          </div>
        </section>

        <section className="about-mission">
          <div className="mission-content">
            <h2>Redefining Professional Networking</h2>
            <div className="mission-grid">
              <div className="mission-item">
                <FiZap className="mission-icon" />
                <h3>Innovation First</h3>
                <p>We believe in pushing boundaries and embracing the future of work. StartIt empowers you to think differently and act boldly.</p>
              </div>
              <div className="mission-item">
                <FiPenTool className="mission-icon" />
                <h3>Creative Freedom</h3>
                <p>Your creativity deserves a platform that understands its value. Share your projects, connect with like-minded professionals, and build your empire.</p>
              </div>
              <div className="mission-item">
                <FiTrendingUp className="mission-icon" />
                <h3>Freelance Revolution</h3>
                <p>The gig economy is here to stay. We're creating the ultimate ecosystem for freelancers to thrive, connect, and scale their businesses.</p>
              </div>
              <div className="mission-item">
                <FiStar className="mission-icon" />
                <h3>Living Large</h3>
                <p>Work hard, dream big, live large. StartIt is for those who refuse to settle for ordinary and are ready to make their mark on the world.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-vision">
          <div className="vision-content">
            <h2>Where Ambition Meets Opportunity</h2>
            <p>
              In a world where traditional career paths are evolving, StartIt stands as your 
              gateway to unlimited possibilities. Whether you're a designer pushing creative 
              boundaries, a developer building the next big thing, or an entrepreneur ready 
              to disrupt industries – this is your stage.
            </p>
            <p>
              Join thousands of professionals who've chosen to break free from conventional 
              networking and embrace a platform that celebrates innovation, rewards creativity, 
              and connects you with opportunities that matter.
            </p>
          </div>
        </section>

        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>The future of professional networking is here. Are you ready to be part of it?</p>
            <button className="cta-button" onClick={handleBookAppointment}>
              Book a Consultation
            </button>
          </div>
        </section>

        <section className="calendly-section">
          <div className="calendly-container">
            <h2>Schedule Your Meeting</h2>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/neelanshu-2024-nst/30min"
              style={{minWidth: '320px', height: '700px'}}
            ></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
