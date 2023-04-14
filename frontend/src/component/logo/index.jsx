import React from "react";
import styled from "styled-components";

import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../responsive";
import { useNavigate } from "react-router-dom";
// import GreenlandLogoImg from "../../assets/images/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 170px;
  height: 165px;

  img {
    width: 100%;
    height: 100%;
    object-fit: conver;
    padding:20px;
  }
`;

const MobileLogoImg = styled.div`
  width: 170px;
  height: 165px;
  margin-left : -25px;

  img {
    width: 100%;
    height: 100%;
    object-fit: conver;
    padding:20px;
  }
`;

// const LogoText = styled.h2`
//   font-size: 16px;
//   margin: 0;
//   margin-left: 4px;
//   color: #222;
//   font-weight: 500;
// `;

export function Logo(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const  navigate = useNavigate();

  return (
    <LogoWrapper>
      {!isMobile && <LogoImg onClick={() =>{
        navigate('/main');
    window.location.reload(true);
      }}>
        <img src='Images/logo1.png' alt="Feedbox logo" />
      </LogoImg>}

      { isMobile && <MobileLogoImg>
      <img src='Images/logo1.png' alt="Feedbox logo" />
      </MobileLogoImg>}
      {/* <LogoText>Greenland</LogoText> */}
    </LogoWrapper>
  );
}
