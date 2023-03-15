import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const selectedPage = window.location.pathname;
  // console.log(`slected page : ${selectedPage}`);
 
const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const ref = useRef();
const auth = localStorage.getItem("user");


useOutsideClick(ref, () => {
  if (show) setShow(false);
});

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
        </div>

        <div className="navabr-dropdown">
          <div ref={ref}  onClick={() => setShow(!show)}>
            <FontAwesomeIcon className="dropdown-icon" icon={faCaretDown} />
          </div>

          {show ? (
            <div className="dropdown-content" >
              <Link className="navbar-links" to="/profile">
                {" "}
                <FontAwesomeIcon icon={faUser} /> <span>{JSON.parse(auth).name}</span>{" "}
              </Link>
              <Link className="navbar-links">
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                <span>Logout</span>{" "}
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
