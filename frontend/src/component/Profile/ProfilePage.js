import React from 'react';
import Navbar from '../Navbar';
import Profile from "./Profile";
import Detail from './Detail';
function ProfilePage() {
  return (
    <>
    <div>
    <Navbar/>
    </div>
    <Profile/>
    <Detail/>
    </>
    
  )
}

export default ProfilePage