import React from 'react'
import "../Sass/HomeComponent.scss"
import PostStatus from '../components/common/PostUpdate/index.jsx'
import Footer from './common/Footer'
import NewsSection from './common/NewsSection'

const HomeComponent = () => {
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
