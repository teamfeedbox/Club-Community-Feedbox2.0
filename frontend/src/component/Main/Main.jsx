import React from "react";
import Navbar from "../Navbar";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import { ScrollableComponentElement } from "scrollable-component";
// import 'scrollable-component';
import "./Main.css";

const Main = () => {
  return (
    <div className="main_container">
      <Navbar />
      <div className="main">
        <div className="main-home-page-profile">
          <scrollable-component scrollbar-visibility="always">
            <HomePageProfile />
          </scrollable-component>
        </div>

        <div className="main-post-dispaly">
        <scrollable-component scrollbar-visibility="always">
           
          <div>
            <CreatePost />
          </div>
          <PostDisplay />
          </scrollable-component>
        </div>

        <div className="main-home-page-cal">
        <scrollable-component scrollbar-visibility="always">
         
          <div>
            <HomePageCal />
            <HomePageEvent />
          </div>
          </scrollable-component>
        </div>
      </div>
    </div>
  );
};

export default Main;
