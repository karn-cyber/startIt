import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../../api/FirestoreAPIs'
import "./index.scss"

const PostCard = ({posts}) => { 
  const navigate = useNavigate();
  const [userName, setUserName] = useState('ANONYMOUS USER');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const allUsers = await getAllUsers();
        const postUser = allUsers.find(user => user.email === posts.userEmail);
        setUserName(postUser?.name || 'ANONYMOUS USER');
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('ANONYMOUS USER');
      }
    };

    if (posts.userEmail) {
      fetchUserName();
    }
  }, [posts.userEmail]);

  const handleUserClick = (userEmail) => {
    console.log('Clicking user:', userEmail); // Debug log
    if (userEmail === localStorage.getItem('userEmail')) {
      navigate('/profile');
    } else {
      console.log('Navigating to:', `/profile/${userEmail}`); // Debug log
      navigate(`/profile/${userEmail}`);
    }
  };

  return (
    <div className="post-card">
        <span 
          className="post-author" 
          onClick={() => handleUserClick(posts.userEmail)}
        >
          {userName}
        </span>
        <p className="timestamp">{posts.timeStamp}</p>
        <p className="status">{posts.status}</p>
    </div>
  )
}

export default PostCard
