import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";
import {Link} from 'react-router-dom'


const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 9;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 10px;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
  margin-top: -5px;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;

  margin-bottom: 10px;
`;

const LinkItemHighlight = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #00c9ff;

  font-weight: 500;
  font-size: 1.1rem;
  display: flex;

  margin-bottom: 10px;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  const selectedPage = window.location.pathname;

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          {selectedPage === "/main" ? (
            <LinkItemHighlight>
              <Links to="/main">Home</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/main">Home</Links>
            </LinkItem>
          )}

          {/* {selectedPage === "/profile" ? (
            <LinkItemHighlight>
              <Link to="/profile">Profile</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link to="/profile">Profile</Link>
            </LinkItem>
          )} */}

          {selectedPage === "/calendar" || selectedPage === "/attendance" ? (
            <LinkItemHighlight>
              <Links to="/calendar">Calendar</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/calendar">Calendar</Links>
            </LinkItem>
          )}

          {selectedPage === "/approvals" ? (
            <LinkItemHighlight>
              <Links to="/approvals">Approvals</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/approvals">Approvals</Links>
            </LinkItem>
          )}

          {selectedPage === "/rescources" ||
          selectedPage === "/rescourcesDisplay" ? (
            <LinkItemHighlight>
              <Links to="/rescources">Rescources</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/rescources">Rescources</Links>
            </LinkItem>
          )}

          {selectedPage === "/faq" ? (
            <LinkItemHighlight>
              <Links to="/faq">FAQs</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/faq">FAQs</Links>
            </LinkItem>
          )}

          <Marginer />
          <Accessibility />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
