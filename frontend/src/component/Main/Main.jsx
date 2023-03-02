import React from "react";
import Navbar from "../Navbar";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div style={{'display' : 'flex'}}>
        <div>
          <HomePageProfile />
        </div>
        <div>
          <PostDisplay />
        </div>
      </div>
    </div>
  );
};

export default Main;
