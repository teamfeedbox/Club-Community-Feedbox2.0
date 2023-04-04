import React, { useState, useEffect } from "react";
import "./ProfileTabs.css";
import Overview from "./Overview";
import ProfilePost from "./ProfilePost";
import ProfileEvent from "./ProfileEvent";
import ProfileRes from "./ProfileRes";
import PostDisplayPage from "../Main/PostDisplayPage";
import ProfilePostPage from "./ProfilePostPage";

const ProfileTabs = () => {
  const [tabs, setTabs] = useState("Overview");
  const [role, setRole] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  });
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);
    // console.log(result);
    setData(result);
    // if (result) {
    //   getUser();
    // }
  };

  return (
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
          <Overview />
        </div>

        <div className={tabs === "Post" ? "" : "profile-tab-data-hide"}>
          {/* <ProfilePost /> */}
          {/* <PostDisplayPage/> */}
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
  );
};

export default ProfileTabs;
