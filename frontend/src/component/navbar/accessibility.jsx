import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faRightFromBracket,
  faUser,
  faObjectsColumn,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";

import { Link } from "react-router-dom";

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #6adf76;
  background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  // position: relative;

  &:hover {
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  // border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: gray;
    //   background-color: #00c9ff;
    // margin-right : 10px;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;
const Links = styled(Link)`
  // text-decoration: none;
  // color: inherit;
  // font-size: inherit;
`;

export function Accessibility(props) {
  const [notification, setNotification] = useState(false);

  const [user, setUser] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    getUser();
  }, []);
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);

    // console.log(id)
    setUser(result);

    // if (result) {
    //   getUser();
    // }
  };
  const selectedPage = window.location.pathname;

  const logoutHandler = () => {
    localStorage.clear();
  };

  const handleCross = () => {
    setNotification(false);
  };

  return (
    <AccessibilityContainer>
      {/* *********************profile icon*************************** */}
      {role === "Admin" ? (
        <Links
          to="/profile"
          title="Profile Page"
          className={
            selectedPage === "/profile" || selectedPage === "/dashboard"
              ? "hidden"
              : "block"
          }
        >
          <LoginButton>
            <FontAwesomeIcon icon={faUser} className="fa-xl" />
          </LoginButton>
        </Links>
      ) : (
        ""
      )}
      {/* *************************Dashboard****************************** */}
      {role && role === "Super_Admin" ? (
        <Links
          to="/dashboard"
          title="Dashboard"
          className={
            selectedPage === "/dashboard" || selectedPage === "/profile"
              ? "hidden"
              : "block"
          }
        >
          <LoginButton>
            <img src="Images/Dashboard.png" alt="" />
          </LoginButton>
        </Links>
      ) : (
        ""
      )}
      {/* *************************logout************************************ */}
      <Links
        to="/"
        title="Logout"
        onClick={logoutHandler}
        className={
          selectedPage === "/profile" || selectedPage === "/dashboard"
            ? "block"
            : "hidden"
        }
      >
        <LoginButton>
          <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
        </LoginButton>
      </Links>
      {/* *******************notification bell**************** */}
      <RegisterButton
        title="Notification"
        onClick={() => {
          setNotification(!notification);
        }}
      >
        <FontAwesomeIcon icon={faBell} className="fa-xl" />
      </RegisterButton>

      {notification ? <Notification props={{ handleCross }} /> : ""}
    </AccessibilityContainer>
  );
}
