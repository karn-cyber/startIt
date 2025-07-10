import React from 'react';
import './index.scss';
import startitSmall from '/Users/neelanshu./startit/src/assets/startitSmall.svg';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { IoNotificationsOutline, IoBriefcase } from 'react-icons/io5';
import { LuMessageCircleMore } from 'react-icons/lu';
// import {FiHome} from 'react-icons/fi';
// import {HiOutlineUserGroup, HiOutlineBriefcase} from 'react-icons/hi';
// import {RiNotification3Line} from 'react-icons/ri';
// import {TbMessageCircle2} from 'react-icons/tb';
const Topbar = () => {
  return (

    <>
    <div className="topbar-main">
      <img className="logo-full" src={startitSmall} alt="StartIt Logo" />

      <div className="topbar-icons">
        <AiOutlineHome className="topbar-icon" size={28} title="Home" />
        <FaUsers className="topbar-icon" size={28} title="Connections" />
        <IoNotificationsOutline className="topbar-icon" size={28} title="Notifications" />
        <LuMessageCircleMore className="topbar-icon" size={28} title="Messages" />
        <IoBriefcase className="topbar-icon" size={28} title="Jobs" />
      </div>
      </div>
      </>
  );
};

export default Topbar;
