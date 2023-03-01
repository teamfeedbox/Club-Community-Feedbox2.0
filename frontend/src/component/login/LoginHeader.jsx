import React from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faCompass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="login-header-left">
        <img src="Images/linkedin.jpg" alt="" />
      </div>
      <div className="login-header-right">
        <div className="login-header-overall-icons">
          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faCompass} />
            Discover
          </div>

          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faUserGroup} />
            People
          </div>

          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faChalkboardUser} />
            Learning
          </div>
        </div>

        <div className="login-header-overall-button">
          <Link to="/signup" className="joinnow-login-header">
            Join Now
          </Link>
          <Link to="/" className="signin-login-header">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
