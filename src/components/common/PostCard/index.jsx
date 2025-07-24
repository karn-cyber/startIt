import React from 'react'
import "./index.scss"
const PostCard = ({posts}) => { 
  return (
    <div className="post-card">
        <p className="timestamp">{posts.timeStamp}</p>
        <p className="status">{posts.status}</p>
        {/* <p>{posts.id}</p> */}
    </div>
  )
}

export default PostCard