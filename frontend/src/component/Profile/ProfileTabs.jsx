import React, { useState, useEffect } from "react";
import "./ProfileTabs.css";
import Overview from "./Overview";
import ProfilePost from "./ProfilePost";
import ProfileEvent from "./ProfileEvent";
import ProfileRes from "./ProfileRes";
import ProfilePostPage from "./ProfilePostPage";
import Dashboard from "../Dashboard/Dashboard";
import { useLocation } from "react-router-dom";

import Colleges from "./Colleges";
import { useStateValue } from "../../StateProvider";
import ProfileBanner from "./ProfileBanner";

const ProfileTabs = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const [render,setRender]=useState();
  const [data,setData] = useState();

  const [tabs, setTabs] = useState("Overview");
  const role = JSON.parse(localStorage.getItem("user")).role;

  const [{ currentUser }, dispatch] = useStateValue();

  useEffect(() => {
    // getUser();
  }, [render])

  const getUser = async () => {
    if (!currentUser) {
      let result = await fetch(`http://localhost:8000/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      result = await result.json();
      console.log(result, 'user hereeeeeee');

      dispatch({
        type: 'INIT_USER',
        item: result,
      });
    } else {
      setData(currentUser)
      console.log("current user already initialized");
    }
  };

  const func=(data)=>{
    setRender(data);
  }


  return (
    <div  className="pt-[60px]">
      <ProfileBanner sendData={func}/>
      {
        propsData === null ?
          <div className="overall-profile-tabs">
            <div className="profile-tabs">
              <div
                className={
                  tabs === "Overview"
                    ? "profile-tab-content profile-tab-content-highlight"
                    : "profile-tab-content"
                }
                onClick={() => setTabs("Overview")}
              >
                {
                  role === 'Super_Admin' ? 'Dashboard' : 'Overview'
                }
              </div>

              {role === "Super_Admin" ? (
                <div
                  className={
                    tabs === "Colleges"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("Colleges")}
                >
                  Colleges
                </div>
              ) : (
                ""
              )}

              {role !== "Club_Member" ? (
                <div
                  className={
                    tabs === "Post"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("Post")}
                >
                  Posts
                </div>
              ) : (
                ""
              )}

              {role !== "Club_Member" ? (
                <div
                  className={
                    tabs === "Event"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("Event")}
                >
                  Events
                </div>
              ) : (
                ""
              )}
              {role !== "Club_Member" ? (
                <div
                  className={
                    tabs === "Res"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("Res")}
                >
                  Resources
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="profile-tab-data">
              <div className={tabs === "Overview" ? "" : "profile-tab-data-hide"}>
                {role === 'Super_Admin' ? <Dashboard /> :
                  <Overview send={render && render}/>
                }
              </div>
              <div className={tabs === "Colleges" ? "" : "profile-tab-data-hide"}>
                <Colleges />
              </div>
              <div className={tabs === "Post" ? "" : "profile-tab-data-hide"}>
                <ProfilePostPage />
              </div>
              <div className={tabs === "Event" ? "" : "profile-tab-data-hide"}>
                <ProfileEvent />
              </div>
              <div className={tabs === "Res" ? "" : "profile-tab-data-hide"}>
                <ProfileRes />
              </div>
            </div>
          </div>
          :
          <div className="overall-profile-tabs">
            <div className="profile-tabs">

              <div
                className={
                  tabs === "Overview"
                    ? "profile-tab-content profile-tab-content-highlight"
                    : "profile-tab-content"
                }
                onClick={() => setTabs("Overview")}
              >
                Overview
              </div>
            </div>

            <div className="profile-tab-data">
              <div className={tabs === "Overview" ? "" : "profile-tab-data-hide"}>
                <Overview />
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default ProfileTabs;
