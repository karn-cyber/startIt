import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers, getStatus } from '../api/FirestoreAPIs';
import './ProfileComponent.scss';
import Loader from './common/Loader';
import Footer from './common/Footer';
import NewsSection from './common/NewsSection';

const UserProfileComponent = () => {
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching data for user:', userEmail);
        const allUsers = await getAllUsers();
        console.log('All users:', allUsers);
        
        const targetUser = allUsers.find(u => u.email === userEmail);
        console.log('Target user found:', targetUser);
        
        if (!targetUser) {
          console.log('User not found, redirecting to homepage');
          navigate('/homepage');
          return;
        }
        
        setUser(targetUser);
        
        // Fetch posts for this user
        getStatus((posts) => {
          console.log('All posts:', posts);
          const filteredPosts = posts.filter((post) => post.userEmail === userEmail);
          console.log('Filtered posts for user:', filteredPosts);
          setUserPosts(filteredPosts);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail, navigate]);

  if (loading) return <Loader />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="profile-linkedin-bg">
      <div className="profile-main-content">
        <div className="profile-banner-section">
          <div className="profile-banner"></div>
          <div className="profile-photo-wrapper">
            <img
              src={user.profilePic || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')}
              alt="Profile"
              className="profile-photo"
            />
          </div>
        </div>
        <div className="profile-content-sections">
          <div className="profile-left">
            <div className="profile-user-info">
              <h2>{user.name || 'Anonymous User'}</h2>
              <div className="profile-email">{user.email}</div>
              <div className="profile-section">
                <h4>About</h4>
                <p>{user.about || 'No information available'}</p>
              </div>
              <div className="profile-section">
                <h4>Education</h4>
                <ul>
                  {(user.education || []).map((edu, idx) => <li key={idx}>{edu}</li>)}
                </ul>
                {(!user.education || user.education.length === 0) && <p>No education information</p>}
              </div>
              <div className="profile-section">
                <h4>Experience</h4>
                <ul>
                  {(user.experience || []).map((exp, idx) => <li key={idx}>{exp}</li>)}
                </ul>
                {(!user.experience || user.experience.length === 0) && <p>No experience information</p>}
              </div>
            </div>
            <div className="profile-posts accent-card">
              <h3>Posts</h3>
              {userPosts.length === 0 ? (
                <div className="no-posts">No posts yet.</div>
              ) : (
                <ul className="posts-list">
                  {userPosts.map((post) => (
                    <li key={post.id} className="post-item">
                      <div className="post-content">{post.status}</div>
                      <div className="post-timestamp">{post.timeStamp}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="profile-right">
            <NewsSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfileComponent;
