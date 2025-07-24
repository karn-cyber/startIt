import React, { useState } from 'react';
import './index.scss';
import startitSmall from '../../../assets/startitSmall.svg';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { IoNotificationsOutline, IoBriefcase } from 'react-icons/io5';
import { LuMessageCircleMore } from 'react-icons/lu';
import { IoMdSearch } from 'react-icons/io';
import { AiOutlineUser } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import ProfilePopup from '../ProfilePopup';
import SearchDropdown from '../SearchDropdown';

const Topbar = () => {
  let navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const goToRoute = (route) => {
       navigate(route);
  }

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      setShowSearchDropdown(true);
      // TODO: Implement actual search logic
      // This would search through posts, users, jobs, etc.
    } else {
      setShowSearchDropdown(false);
      setSearchResults([]);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSearchDropdown(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  return (
    <>
    <div className="topbar-main">
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopup closePopup={closePopup} />
        </div>
      )}

      <div className="topbar-left">
        <img className="logo-full" src={startitSmall} alt="StartIt Logo" />
        
        <div className="search-container">
          <div className="search-wrapper">
            <IoMdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="search-input"
            />
          </div>
          {showSearchDropdown && (
            <SearchDropdown 
              query={searchQuery} 
              results={searchResults}
              onClose={() => setShowSearchDropdown(false)}
            />
          )}
        </div>
      </div>

      <div className="topbar-icons">
        <AiOutlineHome 
          className="topbar-icon" 
          size={28} 
          title="Home" 
          onClick={() => goToRoute('/homepage')}
        />
        <FaUsers 
          className="topbar-icon" 
          size={28} 
          title="Network" 
          onClick={() => goToRoute('/connections')}
        />
        <IoNotificationsOutline 
          className="topbar-icon" 
          size={28} 
          title="Notifications"
        />
        <LuMessageCircleMore 
          className="topbar-icon" 
          size={28} 
          title="Messages" 
        />
        <IoBriefcase 
          className="topbar-icon" 
          size={28} 
          title="Jobs" 
          onClick={() => goToRoute('/jobs')}
        />
      </div>
      <AiOutlineUser 
        className="user-logo" 
        size={28} 
        onClick={displayPopup} 
        title="Me" 
      />
    </div>
    </>
  );
};

export default Topbar;
