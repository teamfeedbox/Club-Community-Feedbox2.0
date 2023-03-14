import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const selectedPage = window.location.pathname;
  console.log(`slected page : ${selectedPage}`);
  return (
    <div className="Navbar">
      <div className="Navbar-left">
        <img src="Images/logo.png" alt="" />
      </div>
      <div className="navbar-center">
        <Link to="/main" className="navbar-link">
          Home
          <div
            className={selectedPage === "/main" ? "navbar-highlight" : ""}
          ></div>
        </Link>

        <Link to="/approvals" className="navbar-link">
          Approvals
          <div
            className={selectedPage === "/approvals" ? "navbar-highlight" : ""}
          ></div>
        </Link>

        <Link to="/calendar" className="navbar-link">
          Calendar
          <div
            className={
              selectedPage === "/calendar" || selectedPage === "/attendance"
                ? "navbar-highlight"
                : ""
            }
          ></div>
        </Link>

        <Link to="/rescources" className="navbar-link">
          Resources
          <div
            className={
              selectedPage === "/rescources" ||
              selectedPage === "/rescourcesDisplay"
                ? "navbar-highlight"
                : ""
            }
          ></div>
        </Link>

        <Link to="/faq" className="navbar-link">
          FAQ
          <div
            className={selectedPage === "/faq" ? "navbar-highlight" : ""}
          ></div>
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

          {/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>  */}
          
          <select name="cars" id="cars">
            <option value="volvo"></option>
            <option value="saab">Logout</option>
          </select> 

        </div>
      </div>
    </div>
  );
};

export default Navbar;
