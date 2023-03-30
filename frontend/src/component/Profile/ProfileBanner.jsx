import React,{useState,useEffect} from 'react';
import "./ProfileBanner.css";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from './EditProfile';

function ProfileBanner() {

  const [data, setData] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUser();
  },[]);
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
    setData(result);
    // if (result) {
    //   getUser();
    // }
  };


  return (
    <div className='Profile-Banner'>
        <img src="Images/bg5.png"></img>
        <div className='Profile-Title'>
            <img src="Images/podcast.png"></img>
            <div>
                <p>{data && data.name}</p>
                <span>President</span>
            </div>
            <EditProfile open={open} setOpen={setOpen}/>

            <button onClick={() => {setOpen(!open)}} >
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