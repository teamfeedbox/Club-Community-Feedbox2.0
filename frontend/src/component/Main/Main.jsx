import React from "react";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import "./Main.css";
import bg from '../assets/mainBg.png'

const Main = () => {
  return (
    <div className="main_container"
    style={
      {backgroundImage : `url(${bg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"  }
    }
    >
      <section className="main">
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
            <div className="">
              <div className="ml-6">
                <HomePageCal />
              </div>
              <HomePageEvent />
            </div>
          </scrollable-component>
        </div>
      </section>
    </div>
  );
};

export default Main;
