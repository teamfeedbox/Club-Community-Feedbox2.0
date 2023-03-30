import React, { useState } from "react";
import styled from "styled-components";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;

  &:hover {
    border-top: 2px solid #00c9ff;
    color: #00c9ff;
  }
`;

const LinkItemHighlight = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #00c9ff;
  font-weight: 600;
  font-size: 1.1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 220ms ease-in-out;
  border-bottom: 3px solid #00c9ff;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;

  &:hover {
    color: #00c9ff;
  }
`;

export function NavLinks(props) {
  const selectedPage = window.location.pathname;

  return (
    <NavLinksContainer>
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
            <Link href="/rescources">Resources</Link>
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
      </LinksWrapper>
    </NavLinksContainer>
  );
}
