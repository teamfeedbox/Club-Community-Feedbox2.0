import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from '../assets/logo1.png';
import { Accessibility } from "./accessibility";
import { NavLinks } from "./navLinks";
import { DeviceSize } from "../responsive";
import { MobileNavLinks } from "./mobileNavLinks";
import { Link } from "react-router-dom";


const NavbarContainer = styled.div`
  position : fixed;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  background : white;
  z-index : 99;
`;

const LeftSection = styled.div`
  display: flex;
  width:140px;
  @media screen and (max-width:700px){
    margin-left:-10px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;

export default function NavbarRes(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const selectedPage = window.location.pathname;

  return (
    <NavbarContainer>
      <LeftSection>
        {/* <Logo /> */}
        <Link to="/main">
          <div>
            <img src={Logo} alt="" />
          </div>
        </Link>
      </LeftSection>
      <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
      <RightSection>
        {!isMobile && <Accessibility />}
        {isMobile && <MobileNavLinks />}
      </RightSection>
    </NavbarContainer>
  );
}
