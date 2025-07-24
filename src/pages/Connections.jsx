import React, { useEffect, useState } from 'react';
import { getCurrentUser, getAllUsers, sendConnectionRequest, acceptConnectionRequest, removeConnection } from '../api/FirestoreAPIs';
import Loader from '../components/common/Loader';
import './Connections.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

const Connections = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate('/');
      }
    });
    getCurrentUser((userData) => {
      setUser(userData);
    });
    getAllUsers().then(users => {
      setAllUsers(users);
      setLoading(false);
    });
  }, [userEmail]);

  const myConnections = user?.connections || [];
  const myRequests = user?.connectionRequests || [];
  const myId = user?.id;

  const handleConnect = async (targetUser) => {
    await sendConnectionRequest(targetUser.id, user.email);
    getAllUsers().then(setAllUsers);
    getCurrentUser((userData) => setUser(userData));
  };

  const handleAccept = async (targetUser) => {
    await acceptConnectionRequest(targetUser.id, myId, targetUser.email, user.email);
    getAllUsers().then(setAllUsers);
    getCurrentUser((userData) => setUser(userData));
  };

  const handleRemove = async (targetUser) => {
    await removeConnection(targetUser.id, myId, targetUser.email, user.email);
    getAllUsers().then(setAllUsers);
    getCurrentUser((userData) => setUser(userData));
  };

  if (loading || !user) return <Loader />;

  const filteredUsers = allUsers.filter(u =>
    u.email !== userEmail &&
    (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  const getFilteredConnections = () => {
    switch (activeTab) {
      case 'connections':
        return filteredUsers.filter(u => myConnections.includes(u.email));
      case 'requests':
        return filteredUsers.filter(u => myRequests.includes(u.email));
      case 'sent':
        return filteredUsers.filter(u => (u.connectionRequests || []).includes(user.email));
      default:
        return filteredUsers;
    }
  };

  const displayUsers = getFilteredConnections();
  const connectionsCount = allUsers.filter(u => myConnections.includes(u.email)).length;

  const getConnectionStatus = (u) => {
    if (myConnections.includes(u.email)) return 'Connected';
    if (myRequests.includes(u.email)) return 'Request Received';
    if ((u.connectionRequests || []).includes(user.email)) return 'Request Sent';
    return 'Not Connected';
  };

  const renderConnectionButton = (u, status) => {
    switch (status) {
      case 'Not Connected':
        return <button className="connection-btn primary" onClick={() => handleConnect(u)}>Connect</button>;
      case 'Request Received':
        return <button className="connection-btn primary" onClick={() => handleAccept(u)}>Accept</button>;
      case 'Connected':
        return <button className="connection-btn ghost" onClick={() => handleRemove(u)}>Remove</button>;
      case 'Request Sent':
        return <button className="connection-btn disabled">Pending</button>;
      default:
        return null;
    }
  };

  const suggestions = allUsers
    .filter(u => 
      u.email !== userEmail && 
      !myConnections.includes(u.email) && 
      !myRequests.includes(u.email) &&
      !(u.connectionRequests || []).includes(user.email)
    )
    .slice(0, 5);

  return (
    <div className="connections-page">
      <div className="connections-header">
        <h1>My network</h1>
        <div className="connections-count">
          {connectionsCount} connection{connectionsCount !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="connections-searchbar">
        <div className="search-wrapper">
          <IoSearchOutline className="search-icon" />
          <input
            type="text"
            placeholder="Search connections"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="connections-content">
        <div className="connections-main">
          <div className="connections-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({filteredUsers.length})
            </button>
            <button 
              className={`tab ${activeTab === 'connections' ? 'active' : ''}`}
              onClick={() => setActiveTab('connections')}
            >
              Connections ({connectionsCount})
            </button>
            <button 
              className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              Requests ({myRequests.length})
            </button>
            <button 
              className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
              onClick={() => setActiveTab('sent')}
            >
              Sent ({allUsers.filter(u => (u.connectionRequests || []).includes(user.email)).length})
            </button>
          </div>

          <div className="connections-list">
            {displayUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No connections found</h3>
                <p>Try adjusting your search or explore suggested connections.</p>
              </div>
            ) : (
              displayUsers.map((u) => {
                const status = getConnectionStatus(u);
                return (
                  <div className="connection-card" key={u.id}>
                    <img 
                      className="connection-photo" 
                      src={u.profilePic || `https://ui-avatars.com/api/?name=${u.name || 'User'}&background=0a66c2&color=fff`} 
                      alt={u.name} 
                    />
                    <div className="connection-info">
                      <div className="connection-name" onClick={() => navigate(`/profile/${u.email}`)}>
                        {u.name || 'Anonymous User'}
                      </div>
                      <div className="connection-headline">
                        {u.headline || u.email}
                      </div>
                      <div className="connection-status">
                        <span className={`status-dot ${status === 'Connected' ? '' : status === 'Request Received' ? 'pending' : 'sent'}`}></span>
                        {status}
                      </div>
                    </div>
                    <div className="connection-actions">
                      {renderConnectionButton(u, status)}
                      <button className="more-btn">⋯</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="connections-sidebar">
          {suggestions.length > 0 && (
            <div className="sidebar-card">
              <div className="card-header">
                <h3>People you may know</h3>
              </div>
              <div className="card-content">
                {suggestions.map((s) => (
                  <div key={s.id} className="suggestion-item">
                    <img 
                      className="suggestion-photo" 
                      src={s.profilePic || `https://ui-avatars.com/api/?name=${s.name || 'User'}&background=0a66c2&color=fff`} 
                      alt={s.name} 
                    />
                    <div className="suggestion-info">
                      <div className="suggestion-name">{s.name || 'Anonymous'}</div>
                      <div className="suggestion-headline">{s.headline || s.email}</div>
                    </div>
                    <button className="suggestion-btn" onClick={() => handleConnect(s)}>
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections; 
