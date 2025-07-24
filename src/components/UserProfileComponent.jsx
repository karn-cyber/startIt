import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers, getStatus, getCurrentUser, sendConnectionRequest, acceptConnectionRequest, removeConnection } from '../api/FirestoreAPIs';
import './ProfileComponent.scss';
import Loader from './common/Loader';
import Footer from './common/Footer';
import NewsSection from './common/NewsSection';

const UserProfileComponent = () => {
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching data for user:', userEmail);
        const allUsersData = await getAllUsers();
        setAllUsers(allUsersData);
        
        const targetUser = allUsersData.find(u => u.email === userEmail);
        
        if (!targetUser) {
          navigate('/homepage');
          return;
        }
        
        setUser(targetUser);
        
        // Get current user data
        getCurrentUser((userData) => {
          console.log('Current user data:', userData);
          setCurrentUser(userData);
        });
        
        // Fetch posts for this user
        getStatus((posts) => {
          setUserPosts(posts.filter((post) => post.userEmail === userEmail));
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

  // Connection logic with debug logs
  const getConnectionStatus = () => {
    if (!currentUser || !user) return 'loading';
    
    const myConnections = currentUser.connections || [];
    const myRequests = currentUser.connectionRequests || [];
    const theirRequests = user.connectionRequests || [];
    
    console.log('Connection Status Debug:');
    console.log('Current user:', currentUser.email);
    console.log('Target user:', user.email);
    console.log('My connections:', myConnections);
    console.log('My requests:', myRequests);
    console.log('Their requests:', theirRequests);
    
    // Check if already connected
    if (myConnections.includes(user.email)) {
      console.log('Status: connected');
      return 'connected';
    }
    
    // Check if they sent me a request (I can accept)
    if (myRequests.includes(user.email)) {
      console.log('Status: request_received');
      return 'request_received';
    }
    
    // Check if I sent them a request (should show as requested)
    if (theirRequests.includes(currentUser.email)) {
      console.log('Status: request_sent');
      return 'request_sent';
    }
    
    console.log('Status: not_connected');
    return 'not_connected';
  };

  const handleConnect = async () => {
    try {
      await sendConnectionRequest(user.id, currentUser.email);
      
      // Refresh all data to show updated status
      const updatedUsers = await getAllUsers();
      setAllUsers(updatedUsers);
      
      // Update the target user
      const updatedTargetUser = updatedUsers.find(u => u.email === userEmail);
      setUser(updatedTargetUser);
      
      // Update current user data directly from the fresh data
      const updatedCurrentUser = updatedUsers.find(u => u.email === localStorage.getItem('userEmail'));
      setCurrentUser(updatedCurrentUser);
      
      console.log('Connection request sent, data refreshed');
      console.log('Updated target user requests:', updatedTargetUser.connectionRequests);
      console.log('Updated current user:', updatedCurrentUser);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptConnectionRequest(user.id, currentUser.id, user.email, currentUser.email);
      
      // Refresh all data
      const updatedUsers = await getAllUsers();
      setAllUsers(updatedUsers);
      
      const updatedTargetUser = updatedUsers.find(u => u.email === userEmail);
      setUser(updatedTargetUser);
      
      const updatedCurrentUser = updatedUsers.find(u => u.email === localStorage.getItem('userEmail'));
      setCurrentUser(updatedCurrentUser);
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeConnection(user.id, currentUser.id, user.email, currentUser.email);
      
      // Refresh all data
      const updatedUsers = await getAllUsers();
      setAllUsers(updatedUsers);
      
      const updatedTargetUser = updatedUsers.find(u => u.email === userEmail);
      setUser(updatedTargetUser);
      
      const updatedCurrentUser = updatedUsers.find(u => u.email === localStorage.getItem('userEmail'));
      setCurrentUser(updatedCurrentUser);
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  if (loading) return <Loader />;
  if (!user) return <div>User not found</div>;

  const connectionStatus = getConnectionStatus();
  const isOwnProfile = userEmail === localStorage.getItem('userEmail');

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
              <div className="profile-header">
                <h2>{user.name || 'Anonymous User'}</h2>
                {!isOwnProfile && (
                  <div className="connection-actions">
                    {connectionStatus === 'not_connected' && (
                      <button className="profile-btn" onClick={handleConnect}>Connect</button>
                    )}
                    {connectionStatus === 'request_received' && (
                      <button className="profile-btn" onClick={handleAccept}>Accept Request</button>
                    )}
                    {connectionStatus === 'request_sent' && (
                      <button className="profile-btn disabled">Requested</button>
                    )}
                    {connectionStatus === 'connected' && (
                      <button className="profile-btn secondary" onClick={handleRemove}>Remove Connection</button>
                    )}
                  </div>
                )}
              </div>
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
