import React from "react";
import Navbar from "../Navbar";
import ProfileBanner from "./ProfileBanner";
import ProfileTabs from "./ProfileTabs";

function ProfilePage() {
  return (
    <div>
    <Navbar/>
    <ProfileBanner/>
    <ProfileTabs />
    </div>
  );
}

export default ProfilePage;
