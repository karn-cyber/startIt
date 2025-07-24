import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Sass/HomeComponent.scss"
import PostStatus from '../components/common/PostUpdate/index.jsx'
import Footer from './common/Footer'
import NewsSection from './common/NewsSection'

const HomeComponent = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll to a specific post
    if (location.state?.scrollToPost) {
      const postId = location.state.scrollToPost;
      setTimeout(() => {
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
          postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [location.state]);

  return (
    <div style={{ width: '100%' }}>
      <div className="home-component">
        <div className="home-content">
          <div className="home-left">
            <PostStatus/>
          </div>
          <div className="home-right">
            <NewsSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeComponent
