import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./index.scss";

export default function ProfilePopup() {


    console.log("Hello, world")
    const handleLogout = async () => {
        await onLogout();
        localStorage.removeItem("userEmail");
        window.location.href = "/";
    };

    return(
        <div className="popup-card">
            <ul className="popup-options">
                <li className="popup-option" onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
}
