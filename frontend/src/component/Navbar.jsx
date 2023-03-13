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
        <Link to='/main' className="navbar-link"  onClick={() => setHighlight('home')}>
          Home
          <div className={hightlight === 'home' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link to='/approvals' className="navbar-link" onClick={() => setHighlight('approvals')}>
          Approvals
          <div className={hightlight === 'approvals' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link to='/calendar' className="navbar-link" onClick={() => setHighlight('calendar')}>
          Calendar
          <div className={hightlight === 'calendar' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link to='/rescources' className="navbar-link" onClick={() => setHighlight('res')}>
          Resources
          <div className={hightlight === 'res' ? 'navbar-highlight' : ''}></div>
        </Link>

        <Link to='/faq' className="navbar-link" onClick={() => setHighlight('faq')}>
          FAQ
          <div className={hightlight === 'faq' ? 'navbar-highlight' : ''}></div>
        </Link>
      </div>
      <div className="navabar-right">
        <div className="navabar-icon cr-ptr">
          <FontAwesomeIcon className="fa-xl " icon={faBell} />
        </div>
        <div className="navabr-button">
          <button>Create Event</button>
        </div>
        <div className="navbar-profile">
          <Link to="/profile">
            <img src="Images/girl.jpg" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
