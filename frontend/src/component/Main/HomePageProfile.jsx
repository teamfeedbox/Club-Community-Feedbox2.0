import React from "react";
import "./HomePageProfile.css";

const HomePageProfile = () => {

  const auth = localStorage.getItem("user");
  return (
    <div className="HomePageProfile">
      <div className="home-page-profile-card">
        <img src="Images/girl.jpg" alt="" />
      </div>
      <p className="HomePageProfile-name">{JSON.parse(auth).name}</p>
      <p className="HomePageProfile-role">Club Member</p>
      <p className="HomePageProfile-skills">
        Skills:- <span>{JSON.parse(auth).skills.join(",")}</span>{" "}
      </p>
      <div className="HomePageProfile-coin">
        <div>
          <img src="Images/shield.png" alt="fjb" />
        </div>
        <div className="reward-coin-content">
          <p>Reward Coins <br /> 50 Coins </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default HomePageProfile;
