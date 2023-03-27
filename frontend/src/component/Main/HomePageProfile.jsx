import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState,useEffect} from "react";
import "./HomePageProfile.css";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const changeColor = [
  {
    bgColor : '#C7EDCF',
    fontColor : '#2AA100'
  },
  {
    bgColor : '#EDC7E2',
    fontColor : '#9B0483'
  },
  {
    bgColor : '#EDE7C7',
    fontColor : '#A67904'
  },
  {
    bgColor : '#EDC7C7',
    fontColor : '#A10000'
  },
]

const skills = ['Graphics Designing','Content Writing', 'Search Engine Optimization', 'Time Management' ]

const HomePageProfile = () => {
  const [selectedColourIndex, setColourIndex] = useState(0);

    const nextColour = () => {
        const newColourIndex = selectedColourIndex + 1;
        if (changeColor[newColourIndex]) 
            setColourIndex(newColourIndex);
        else
            setColourIndex(0);
    }

  const auth = localStorage.getItem("user");

  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  });
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

  const navigate = useNavigate();


  const goToProfile = () => {
    navigate('/profile');
    window.location.reload(true);

  }
  
  return (
    <div className="HomePageProfile" >
      <div className="home-profile-bg-doodle">
        <img src="Images/doodle-profile-bg.png" alt="" />
        {/* <Link to='/profile' className="home-profile-visit-profile" title="Visit profile page">
          <FontAwesomeIcon className="home-profile-visit-profile-icon" icon={faArrowUpRightFromSquare} />
        </Link> */}
        <button className="home-profile-visit-profile" onClick={goToProfile}>
        <FontAwesomeIcon className="home-profile-visit-profile-icon" icon={faArrowUpRightFromSquare} />

        </button>
      </div>
      <div className="home-profile-main-info">
        <div className="home-profile-main-photo">
          <img src="Images/podcast.png" alt="" />
        </div>
        <div className="home-profile-name-section">
          <h4>{data && data.name}</h4>
          <p>Club Member</p>
        </div>
      </div>

      <div className="home-profile-skill-div">
        <h6>Skills:</h6>
        <div className="home-profile-skills">

        {
          data && data.skills.map((item)=>(
            <div style={{background: '#C7EDCF', color : '#2AA100'}}>{item}</div>

          ))
        }
          {/* <div style={{background: '#C7EDCF', color : '#2AA100'}} >Graphics Designing</div> */}

          {/* <div style={{background: '#EDC7E2', color : '#9B0483'}} >Content Writing</div>
          <div style={{background: '#EDE7C7', color : '#A67904'}} >Search Engine Optimization</div>
          <div style={{background: '#EDC7C7', color : '#A10000'}} >Time Management</div> */}
        </div>
      </div>

      <div className="home-profile-coin-section">
        <div className="home-profile-coins">
          <img src="Images/Money.png" alt="" />
        </div>
        <div className="home-profile-coins-content">
          <h6>40</h6>
          <div>Coins Collected</div>
        </div>
      </div>


    </div>
  );
};

export default HomePageProfile;
