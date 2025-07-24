import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./index.scss";
import { useNavigate } from 'react-router-dom';

export default function ProfilePopup({ closePopup }) {


    console.log("Hello, world")
    const handleLogout = async () => {
        await onLogout();
        localStorage.removeItem("userEmail");
        window.location.href = "/";
    };

    const navigate = useNavigate();

    return(
        <div className="popup-card">
            <ul className="popup-options">
                <li className="popup-option" onClick={() => { closePopup(); navigate('/profile'); }}>Profile</li>
                <li className="popup-option" onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
}
