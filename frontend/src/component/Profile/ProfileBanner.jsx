import React,{useState,useEffect} from 'react';
import "./ProfileBanner.css";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from './EditProfile';
import { useLocation } from "react-router-dom";


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
  // const [img, setImg] = useState('Images/defaultImg.png')


  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);
    setData(result);
    setUserBio(result.bio);
    setUserName(result.name);
    setUserYear(result.collegeYear);
    // setImg(result.img)
  };
  // console.log(`profile banner bio is: ${userBio}`);


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