import React, { useState, useEffect } from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import { IoMoonOutline, IoSunnyOutline, IoSettingsOutline } from 'react-icons/io5';

export default function ProfilePopup({ closePopup }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const handleLogout = async () => {
        await onLogout();
        localStorage.removeItem("userEmail");
        window.location.href = "/";
    };

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

    return(
        <div className="popup-card">
            <ul className="popup-options">
                <li className="popup-option" onClick={() => { closePopup(); navigate('/profile'); }}>
                    Profile
                </li>
                <li className="popup-option" onClick={() => { closePopup(); navigate('/settings'); }}>
                    <IoSettingsOutline className="popup-icon" />
                    Settings
                </li>
                <li className="popup-option dark-mode-toggle" onClick={toggleDarkMode}>
                    {isDarkMode ? <IoSunnyOutline className="popup-icon" /> : <IoMoonOutline className="popup-icon" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </li>
                <li className="popup-option logout-option" onClick={handleLogout}>
                    Logout
                </li>
            </ul>
        </div>
    );
}
