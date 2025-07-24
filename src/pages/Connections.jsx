import React, { useEffect, useState } from 'react';
import { getCurrentUser, getAllUsers, sendConnectionRequest, acceptConnectionRequest, removeConnection } from '../api/FirestoreAPIs';
import Loader from '../components/common/Loader';
import './Connections.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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

  // Debug output
  console.log('allUsers:', allUsers);

  return (
    <div className="connections-page">
      <div className="connections-searchbar">
        <input
          type="text"
          placeholder="Search for people..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>
      <h2>Your Network</h2>
      <div className="connections-list">
        {allUsers.length === 0 && <div>No users found in the database.</div>}
        {filteredUsers.length === 0 && allUsers.length > 0 && <div>No users match your search.</div>}
        {filteredUsers.map((u, idx) => {
          let status = 'Not Connected';
          if (myConnections.includes(u.email)) status = 'Connected';
          else if ((user.connectionRequests || []).includes(u.email)) status = 'Request Received';
          else if ((u.connectionRequests || []).includes(user.email)) status = 'Request Sent';
          return (
            <div className="connection-card" key={u.id}>
              <img className="connection-photo" src={u.profilePic || `https://ui-avatars.com/api/?name=${u.name || 'User'}`} alt={u.name} />
              <div className="connection-info">
                <div className="connection-name">{u.name}</div>
                <div className="connection-email">{u.email}</div>
                <div className="connection-status">{status}</div>
              </div>
              <div className="connection-actions">
                {status === 'Not Connected' && <button className="connection-btn" onClick={() => handleConnect(u)}>Connect</button>}
                {status === 'Request Received' && <button className="connection-btn" onClick={() => handleAccept(u)}>Accept</button>}
                {status === 'Connected' && <button className="connection-btn" onClick={() => handleRemove(u)}>Remove</button>}
                {status === 'Request Sent' && <span className="connection-btn disabled">Requested</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections; 