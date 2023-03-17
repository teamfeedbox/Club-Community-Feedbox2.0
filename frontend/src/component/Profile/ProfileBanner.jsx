import React from 'react';
import "./ProfileBanner.css";
function ProfileBanner() {
  return (
    <div className='Profile-Banner'>
        {/* Banner background Image */}
        <img src="Images/bg5.png"></img>

        {/* profle image and name */}
        <div className='Profile-Title'>
            <img src="Images/podcast.png"></img>
            <div>
                <p>Aditya Pandey</p>
                <span>Club Member</span>
            </div>
            <button> Edit Profile</button>
        </div>
        
    </div>
  )
}

export default ProfileBanner