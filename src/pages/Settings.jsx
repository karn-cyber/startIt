import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../api/FirestoreAPIs';
import { firestore } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { IoMoonOutline, IoSunnyOutline, IoNotificationsOutline, IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import Loader from '../components/common/Loader';
import './Settings.scss';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser((userData) => {
      setUser(userData);
      setEmailNotifications(userData?.emailNotifications ?? true);
      setProfileVisibility(userData?.profileVisibility ?? 'public');
      setLoading(false);
    });

    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const updateUserSetting = async (field, value) => {
    if (user) {
      const userDoc = doc(firestore, 'users', user.id);
      await updateDoc(userDoc, { [field]: value });
    }
  };

  const handleEmailNotifications = async (enabled) => {
    setEmailNotifications(enabled);
    await updateUserSetting('emailNotifications', enabled);
  };

  const handleProfileVisibility = async (visibility) => {
    setProfileVisibility(visibility);
    await updateUserSetting('profileVisibility', visibility);
  };

  if (loading) return <Loader />;

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and privacy settings</p>
        </div>

        <div className="settings-sections">
          <div className="settings-section">
            <div className="section-header">
              <IoSunnyOutline className="section-icon" />
              <h2>Appearance</h2>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Dark Mode</h3>
                <p>Switch between light and dark themes</p>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
                  {isDarkMode ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <IoNotificationsOutline className="section-icon" />
              <h2>Notifications</h2>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates about connections and messages</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={(e) => handleEmailNotifications(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <IoLockClosedOutline className="section-icon" />
              <h2>Privacy</h2>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Profile Visibility</h3>
                <p>Control who can see your profile information</p>
              </div>
              <div className="setting-control">
                <select 
                  value={profileVisibility}
                  onChange={(e) => handleProfileVisibility(e.target.value)}
                  className="select-input"
                >
                  <option value="public">Public</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <IoPersonOutline className="section-icon" />
              <h2>Account</h2>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Account Information</h3>
                <p>Email: {user?.email}</p>
                <p>Member since: {new Date(user?.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;