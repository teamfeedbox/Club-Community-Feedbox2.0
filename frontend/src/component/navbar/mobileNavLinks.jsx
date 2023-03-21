import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";

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

const Link = styled.a`
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
              <Link href="/main">Home</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/main">Home</Link>
            </LinkItem>
          )}

          {selectedPage === "/profile" ? (
            <LinkItemHighlight>
              <Link href="/profile">Profile</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/profile">Profile</Link>
            </LinkItem>
          )}

          {selectedPage === "/calendar" || selectedPage === "/attendance" ? (
            <LinkItemHighlight>
              <Link href="/calendar">Calendar</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/calendar">Calendar</Link>
            </LinkItem>
          )}

          {selectedPage === "/approvals" ? (
            <LinkItemHighlight>
              <Link href="/approvals">Approvals</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/approvals">Approvals</Link>
            </LinkItem>
          )}

          {selectedPage === "/rescources" ||
          selectedPage === "/rescourcesDisplay" ? (
            <LinkItemHighlight>
              <Link href="/rescources">Rescources</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/rescources">Rescources</Link>
            </LinkItem>
          )}

          {selectedPage === "/faq" ? (
            <LinkItemHighlight>
              <Link href="/faq">FAQs</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link href="/faq">FAQs</Link>
            </LinkItem>
          )}

          <Marginer />
          <Accessibility />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
