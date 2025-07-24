import React, { useEffect, useState } from 'react';
import { getCurrentUser, getStatus, getAllUsers, sendConnectionRequest, acceptConnectionRequest, removeConnection } from '../api/FirestoreAPIs';
import { firestore } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ProfileComponent.scss';
import Loader from './common/Loader';
import Footer from './common/Footer';
import NewsSection from './common/NewsSection';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [showEduForm, setShowEduForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [newEdu, setNewEdu] = useState('');
  const [newExp, setNewExp] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    getCurrentUser((userData) => {
      setUser(userData);
      setProfilePic(userData?.profilePic || '');
      setAbout(userData?.about || '');
      setEducation(userData?.education || []);
      setExperience(userData?.experience || []);
    });
    getStatus((posts) => {
      setUserPosts(posts.filter((post) => post.userEmail === userEmail));
    });
    getAllUsers().then(setAllUsers);
  }, [userEmail]);

  const handlePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profilePics/${user.id}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const userDoc = doc(firestore, 'users', user.id);
    await updateDoc(userDoc, { profilePic: url });
    setProfilePic(url);
    setUploading(false);
  };

  const handleAboutSave = async () => {
    if (user) {
      const userDoc = doc(firestore, 'users', user.id);
      await updateDoc(userDoc, { about });
    }
  };

  const handleAddEdu = async () => {
    if (user && newEdu.trim()) {
      const updated = [...education, newEdu];
      setEducation(updated);
      setShowEduForm(false);
      setNewEdu('');
      const userDoc = doc(firestore, 'users', user.id);
      await updateDoc(userDoc, { education: updated });
    }
  };

  const handleAddExp = async () => {
    if (user && newExp.trim()) {
      const updated = [...experience, newExp];
      setExperience(updated);
      setShowExpForm(false);
      setNewExp('');
      const userDoc = doc(firestore, 'users', user.id);
      await updateDoc(userDoc, { experience: updated });
    }
  };

  // --- CONNECTIONS LOGIC ---
  const myConnections = user?.connections || [];
  const myRequests = user?.connectionRequests || [];
  const myId = user?.id;

  // Suggestions: all users except self, already connected, or already requested
  const suggestions = allUsers.filter(
    (u) =>
      u.email !== userEmail &&
      !(myConnections.includes(u.email)) &&
      !(myRequests.includes(u.email)) &&
      (!user?.connections || !user.connections.includes(u.email)) &&
      (!user?.connectionRequests || !user.connectionRequests.includes(u.email))
  );

  // Requests: users who have sent you a request
  const incomingRequests = allUsers.filter(
    (u) => (user?.connectionRequests || []).includes(u.email)
  );

  // Connected users
  const connectedUsers = allUsers.filter(
    (u) => (user?.connections || []).includes(u.email)
  );

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

  if (!user) return <Loader />;

  return (
    <div className="profile-linkedin-bg">
      <div className="profile-main-content">
        <div className="profile-banner-section">
          <div className="profile-banner"></div>
          <div className="profile-photo-wrapper">
            <img
              src={profilePic || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')}
              alt="Profile"
              className="profile-photo"
            />
            <label className="profile-photo-upload">
              {uploading ? 'Uploading...' : 'Change Photo'}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePicChange}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
        <div className="profile-content-sections">
          <div className="profile-left">
            <div className="profile-user-info">
              <h2>{user.name}</h2>
              <div className="profile-email">{user.email}</div>
              <div className="profile-about">
                <h4>About</h4>
                <textarea
                  className="profile-about-input"
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  rows={2}
                />
                <button className="profile-btn" onClick={handleAboutSave}>Save</button>
              </div>
              <div className="profile-section">
                <h4 data-section="education">Education</h4>
                <ul>
                  {education.map((edu, idx) => <li key={idx}>{edu}</li>)}
                </ul>
                {showEduForm ? (
                  <div className="profile-form-row">
                    <input value={newEdu} onChange={e => setNewEdu(e.target.value)} placeholder="Add education..." />
                    <button className="profile-btn" onClick={handleAddEdu}>Add</button>
                    <button className="profile-btn secondary" onClick={() => setShowEduForm(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="add-section-btn" onClick={() => setShowEduForm(true)}>Add Education</button>
                )}
              </div>
              <div className="profile-section">
                <h4 data-section="experience">Experience</h4>
                <ul>
                  {experience.map((exp, idx) => <li key={idx}>{exp}</li>)}
                </ul>
                {showExpForm ? (
                  <div className="profile-form-row">
                    <input value={newExp} onChange={e => setNewExp(e.target.value)} placeholder="Add experience..." />
                    <button className="profile-btn" onClick={handleAddExp}>Add</button>
                    <button className="profile-btn secondary" onClick={() => setShowExpForm(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="add-section-btn" onClick={() => setShowExpForm(true)}>Add Experience</button>
                )}
              </div>
            </div>
            <div className="profile-posts accent-card">
              <h3>Your Posts</h3>
              {userPosts.length === 0 ? (
                <div className="no-posts">No posts yet.</div>
              ) : (
                <ul className="posts-list">
                  {userPosts.map((post) => (
                    <li key={post.id} className="post-item">{post.status}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="profile-right">
            <NewsSection />
            <div className="profile-suggestions accent-card">
              <h4>People you may know</h4>
              <ul>
                {suggestions.map((s, idx) => (
                  <li key={idx} className="suggestion-item">
                    <span>{s.name}</span>
                    <button className="profile-btn" onClick={() => handleConnect(s)}>Connect</button>
                  </li>
                ))}
              </ul>
            </div>
            {incomingRequests.length > 0 && (
              <div className="profile-suggestions accent-card">
                <h4>Connection Requests</h4>
                <ul>
                  {incomingRequests.map((s, idx) => (
                    <li key={idx} className="suggestion-item">
                      <span>{s.name}</span>
                      <button className="profile-btn" onClick={() => handleAccept(s)}>Accept</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {connectedUsers.length > 0 && (
              <div className="profile-suggestions accent-card">
                <h4>Your Connections</h4>
                <ul>
                  {connectedUsers.map((s, idx) => (
                    <li key={idx} className="suggestion-item">
                      <span>{s.name}</span>
                      <button className="profile-btn" onClick={() => handleRemove(s)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileComponent; 
