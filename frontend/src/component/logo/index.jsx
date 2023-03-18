import React from "react";
import styled from "styled-components";

import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../responsive";
// import GreenlandLogoImg from "../../assets/images/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 159px;
  height: 145px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MobileLogoImg = styled.div`
  width: 149px;
  height: 135px;
  margin-left : -25px;

  img {
    width: 100%;
    height: 100%;
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

  return (
    <LogoWrapper>
      {!isMobile && <LogoImg>
        <img src='Images/logo1.png' alt="Feedbox logo" />
      </LogoImg>}

      { isMobile && <MobileLogoImg>
      <img src='Images/logo1.png' alt="Feedbox logo" />
      </MobileLogoImg>}
      {/* <LogoText>Greenland</LogoText> */}
    </LogoWrapper>
  );
}
