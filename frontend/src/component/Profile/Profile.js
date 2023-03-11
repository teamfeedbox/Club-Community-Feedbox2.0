import React from 'react'
import "./Profile.css";
function Profile() {
  return (
    <div className='profile-container'>
        {/* Head section */}
      <div className='profile-head'>
        <div className='left'>
            <img src="Images/girl.jpg"></img>
        </div>
        <div className='middle'> 
            <h3>Isha Bam</h3>
            <p>Club Member</p>
        </div>
        <div className='right'>
            
        </div>
      </div>
    </div>
  )
}

export default Profile