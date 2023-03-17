import React from "react";
import Navbar from "../Navbar";
import NewNavbar from "../NewNavbar";
import ProfileBanner from "./ProfileBanner";
import ProfileTabs from "./ProfileTabs";

function ProfilePage() {
  return (
    <div>
    {/* <NewNavbar/> */}
    <Navbar />
    <ProfileBanner/>
    <ProfileTabs />
    </div>
  );
}

export default ProfilePage;
