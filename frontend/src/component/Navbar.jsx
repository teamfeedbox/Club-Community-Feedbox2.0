import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
    const [hightlight , setHighlight] = useState('home');
  return (
    <div className="Navbar">
      <div className="Navbar-left">
        <img src="Images/logo.png" alt="" />
      </div>
      <div className="navbar-center">
        <Link className="navbar-link"  onClick={() => setHighlight('home')}>
          Home
          <div className={hightlight === 'home' ? 'navbar-highlight' : ''}></div>
        </Link>

        {/* <Link className="navbar-link" onClick={() => setHighlight('notification')}>
          Notification
          <div className={hightlight === 'notification' ? 'navbar-highlight' : ''}></div>
        </Link> */}

        <Link className="navbar-link" onClick={() => setHighlight('calendar')}>
          Calendar
          <div className={hightlight === 'calendar' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link className="navbar-link" onClick={() => setHighlight('res')}>
          Resources
          <div className={hightlight === 'res' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link className="navbar-link" onClick={() => setHighlight('faq')}>
          FAQ
          <div className={hightlight === 'faq' ? 'navbar-highlight' : ''}></div>
        </Link>
      </div>
      <div className="navabar-right">
        <div className="navabar-icon">
          <FontAwesomeIcon className="fa-xl" icon={faBell} />
        </div>
        <div className="navabr-button">
          <button>Create Event</button>
        </div>
        <div className="navbar-profile">
          <Link>
            <img src="Images/girl.jpg" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
