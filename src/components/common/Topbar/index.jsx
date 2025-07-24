import React, { useState } from 'react';
import './index.scss';
import startitSmall from '/Users/neelanshu./startit/src/assets/startitSmall.svg';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { IoNotificationsOutline, IoBriefcase } from 'react-icons/io5';
import { LuMessageCircleMore } from 'react-icons/lu';
import { IoMdSearch } from 'react-icons/io';
import { AiOutlineUser } from "react-icons/ai";

// import {FiHome} from 'react-icons/fi';
// import {HiOutlineUserGroup, HiOutlineBriefcase} from 'react-icons/hi';
// import {RiNotification3Line} from 'react-icons/ri';
// import {TbMessageCircle2} from 'react-icons/tb';
import {useNavigate} from "react-router-dom";
import ProfilePopup from '../ProfilePopup';

const Topbar = () => {
  let navigate = useNavigate();
  const goToRoute = (route) => {
       navigate(route);
  }
  const [popupVisible, setPopupVisible] = useState(false);

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  return (

    <>
    <div className="topbar-main">
    {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="logo-full" src={startitSmall} alt="StartIt Logo" />
      <div className="topbar-icons">
      <IoMdSearch className="topbar-icon" size={28} title="Search" />
        <AiOutlineHome className="topbar-icon" size={28} title="Home" 
        onClick={() => goToRoute('/homepage')}/>
        <FaUsers className="topbar-icon" size={28} title="Connections" 
        onClick={() => goToRoute('/connections')}/>
        <IoNotificationsOutline className="topbar-icon" size={28} title="Notifications"/>
        <LuMessageCircleMore className="topbar-icon" size={28} title="Messages" />
        <IoBriefcase className="topbar-icon" size={28} title="Jobs" />
      </div>
        <AiOutlineUser className="user-logo" size={28} onClick={displayPopup} title="user-logo" />     
      </div>
      </>
  );
};

export default Topbar;
