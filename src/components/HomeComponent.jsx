import React from 'react'
import "../Sass/HomeComponent.scss"
import PostStatus from '../components/common/PostUpdate/index.jsx'
import Footer from './common/Footer'

const HomeComponent = () => {
  return (
    <div style={{ width: '100%' }}>
      <div className="home-component">
        <PostStatus/>
      </div>
      <Footer />
    </div>
  )
}

export default HomeComponent
