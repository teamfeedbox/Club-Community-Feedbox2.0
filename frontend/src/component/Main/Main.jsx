import React, { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import "./Main.css";
import bg from "../assets/mainBg.png";
import NavbarRes from "../navbar/NavbarRes";

const Main = () => {
  const [user, setUser] = useState();

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setUser(result);
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <NavbarRes />
      <div
        className="main_container"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* *******************webview****************** */}
        <div className="main-page-display-web">
          <section className="main">
            <div className="flex m-auto justify-center">
              <div className="main-home-page-profile">
                <scrollable-component scrollbar-visibility="always">
                  <HomePageProfile userData={user && user} />
                </scrollable-component>
              </div>

              <div className="main-post-dispaly">
                <scrollable-component scrollbar-visibility="always">
                  <div>
                    {user && user.role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
                  </div>
                  <PostDisplay userData={user && user} />
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
            </div>
          </section>
        </div>

        {/* *****************tab view ************************* */}

        <div className="main-page-display-tab">
          <section className="main">
            <div className="main-page-display-tab-left ">
              <scrollable-component scrollbar-visibility="always">
                <HomePageProfile userData={user && user} />
                <p className="up-coming-events">UP-COMING EVENTS</p>

                <HomePageEvent />
              </scrollable-component>
            </div>
            <div className="main-page-display-tab-right">
              <scrollable-component scrollbar-visibility="always">
                {user && user.role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
                <PostDisplay userData={user && user} />
              </scrollable-component>
            </div>
          </section>
        </div>

        {/* ******************mobile view************************* */}
        <div className="main-page-display-mobile">
          <section className="main ">
            <div className="w-[92%] ml-[4%]">
              {user && user.role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
            </div>
            <p className="up-coming-events">UP-COMING EVENTS</p>
            <div className="w-[92%] ml-[4%]">
              <HomePageEvent />
            </div>
            <PostDisplay userData={user && user} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Main;
