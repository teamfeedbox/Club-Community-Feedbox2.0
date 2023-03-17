import React, { useState } from "react";
import "./ProfileTabs.css";
import Overview from "./Overview";
import ProfilePost from "./ProfilePost";
import ProfileEvent from "./ProfileEvent";
import ProfileRes from "./ProfileRes";

const ProfileTabs = () => {
  const [tabs, setTabs] = useState('Overview');

  return (
    <div className="overall-profile-tabs">
      <div className="profile-tabs">
        <div className={tabs === 'Overview' ? 'profile-tab-content profile-tab-content-highlight' : 'profile-tab-content'} onClick={() => setTabs('Overview')}>
          Overview
        </div>
        <div className={tabs === 'Post' ? 'profile-tab-content profile-tab-content-highlight' : 'profile-tab-content'} onClick={() => setTabs('Post')}>Post</div>
        <div className={tabs === 'Event' ? 'profile-tab-content profile-tab-content-highlight' : 'profile-tab-content'} onClick={() => setTabs('Event')}>Event</div>
        <div className={tabs === 'Res' ? 'profile-tab-content profile-tab-content-highlight' : 'profile-tab-content'} onClick={() => setTabs('Res')}>Rescources</div>
      </div>
      <div className="profile-tab-data">
        <div className={tabs === 'Overview' ? '' : 'profile-tab-data-hide'}>
          <Overview />
        </div>

        <div className={tabs === 'Post' ? '' : 'profile-tab-data-hide'}>
          <ProfilePost />
        </div>

        <div className={tabs === 'Event' ? '' : 'profile-tab-data-hide'}>
          <ProfileEvent />
        </div>

        <div className={tabs === 'Res' ? '' : 'profile-tab-data-hide'}>
          <ProfileRes />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
