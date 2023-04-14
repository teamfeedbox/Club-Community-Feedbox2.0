import React,{useState,useEffect} from 'react';
import "./ProfileBanner.css";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from './EditProfile';
import { useLocation } from "react-router-dom";
import { useStateValue } from '../../StateProvider';


function ProfileBanner(props) {
  const location = useLocation();
  const propsData = location.state;
  // console.log(propsData.role)

  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userName, setUserName] = useState('');
  const [userYear, setUserYear] = useState('');

  const [{currentUser}]= useStateValue();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    if(currentUser){
      setRole(currentUser.role);
      setData(currentUser);
      setUserBio(currentUser.bio);
      setUserName(currentUser.name);
      setUserYear(currentUser.collegeYear);
    }
  };

  return (
    <>

    {
      propsData === null ?
      
      <div className='Profile-Banner'>
    <img src="Images/bg5.png"></img>
    <div className='Profile-Title'>
        <img src={data && data.img}></img>
        <div>
            <p>{data && data.name}</p>
            {role === "Club_Member" ? (
        <span> Club Member </span>
      ) : role === "Super_Admin" ? (
        <span> Super Admin </span>
      ) : (
        <span> {role} </span>
      )}
        </div>
        <EditProfile Userbio={userBio} open={open} setOpen={setOpen}/>

        <button onClick={() => {setOpen(!open)}} >
            <FontAwesomeIcon 
            icon={faPenToSquare} 
            style={{margin:"0px 10px 0 0"}}
            />
            Edit Profile
        </button>
    </div>
</div>
:

<div className='Profile-Banner'>
        <img src="Images/bg5.png"></img>
        <div className='Profile-Title'>
            <img src={propsData && propsData.img}></img>
            <div>
                <p>{propsData && propsData.name}</p>
                {propsData.role === "Club_Member" ? (
            <span> Club Member </span>
          ) : propsData.role === "Super_Admin" ? (
            <span> Super Admin </span>
          ) : (
            <span> {propsData && propsData.role} </span>
          )}
          
            </div>
            {/* <EditProfile Userbio={userBio} open={open} setOpen={setOpen}/> */}
{/* 
            <button onClick={() => {setOpen(!open)}} >
                <FontAwesomeIcon 
                icon={faPenToSquare} 
                style={{margin:"0px 10px 0 0"}}
                />
                Edit Profile
            </button> */}
        </div>
    </div>

}
    
</>
  )
}

export default ProfileBanner