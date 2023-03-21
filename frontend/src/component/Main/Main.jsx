import React from "react";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import "./Main.css";
import bg from "../assets/mainBg.png";
import { Scrollbars } from "react-custom-scrollbars";

const Main = () => {
  return (
    <div
      className="main_container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="main-page-display-web">
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
              <div className="home-page-cal-div">
                <HomePageCal />
              </div>
              <p className="up-coming-events">UP-COMING EVENTS</p>
              <HomePageEvent />
            </scrollable-component>
          </div>
        </section>
      </div>

      <div className="main-page-display-tab">
        <section className="main">
          <div className='main-page-display-tab-left'>
          <scrollable-component scrollbar-visibility="always">

            <HomePageProfile />
              <HomePageEvent />
            </scrollable-component>
          </div>
          <div className='main-page-display-tab-right'>
          <scrollable-component scrollbar-visibility="always">

            <CreatePost />
              <PostDisplay />
            </scrollable-component>
          </div>
        </section>
      </div>

      <div className="main-page-display-mobile">
        <section className="main">
          <CreatePost />
          <p className="up-coming-events">UP-COMING EVENTS</p>
          <HomePageEvent />
          <PostDisplay />
        </section>
      </div>
    </div>
  );
};

export default Main;
