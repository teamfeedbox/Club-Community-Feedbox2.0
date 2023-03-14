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
          <div>
            <h3>Isha Bam</h3>
            <p>Club Member</p>
          </div>
        </div>
        <div className='right'>
          <div className='Reward-coins'>
              <img className='coin-1' src='Images/coins.svg'></img>
              <div>Reward Coins</div>
              <div>50 Coins</div>
          </div>
        </div>
      </div>

      {/* user detail */}
      
    </div>
  )
}

export default Profile