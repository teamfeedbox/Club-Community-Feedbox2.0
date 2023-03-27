import React from 'react';
import "./ProfileBanner.css";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ProfileBanner() {
  return (
    <div className='Profile-Banner'>
        <img src="Images/bg5.png"></img>
        <div className='Profile-Title'>
            <img src="Images/podcast.png"></img>
            <div>
                <p>Aditya Pandey</p>
                <span>President</span>
            </div>
            <button>
                <FontAwesomeIcon 
                icon={faPenToSquare} 
                style={{margin:"0px 10px 0 0"}}
                />
                Edit Profile
            </button>
        </div>
    </div>
  )
}

export default ProfileBanner