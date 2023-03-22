import React, { useEffect,useState } from "react";
import './ProfileEvent.css'
import {
  faCalendar,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const id = JSON.parse(localStorage.getItem("user")).decodedToken._id;
// console.log(id)



const ProfileEvent = () => {
  const [data, setData] = useState([]);


// useEffect(()=>{
//  getList();
// },[])

// const getList = async (id) => {
//   //  e.preventDefault();
//   let result = await fetch(`http://localhost:8000/myPost/${id}`, {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("jwt"),
//     },
//   });
//   result = await result.json();
//   console.log(result)
//   setData(result);
//   if (result) {
//     getList();
//   }
// };




  return (
    <div className="profile-event-overall">



<div className="profile-event-card">
        <h4>Fundamentals of UI/UX</h4>
        <div className="profile-event-icon-desc">
          <FontAwesomeIcon icon={faLocationDot} className="fa-xl" style={{color:'#FE0000'}} />
          <p>GOOGLE MEET</p>
        </div>

        <div className="profile-event-icon-desc-flex">
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faCalendar} className="fa-xl" style={{color : "#0028B7"} } />
            <p>March 25 2023</p>
          </div>
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faClock} className="fa-xl" style={{color : '#B70099'}} />
            <p>11:00 A.M.</p>
          </div>
        </div>

        <div className="profile-event-description"> 
          <div style={{fontWeight : '700'}}>Description:</div>
          <div style={{marginLeft : '10px'}}>In this session you will learn about how to start the journey to become a UI/UX developer.</div>
        </div>

        <div className="profile-event-footer"> 
          <div className="profile-event-date">TUE 21 March</div>
          <div className="profile-event-button">
            View In Calendar
          </div>
        </div>
      </div>
     



      <div className="profile-event-card">
        <h4>Fundamentals of UI/UX</h4>
        <div className="profile-event-icon-desc">
          <FontAwesomeIcon icon={faLocationDot} className="fa-xl" style={{color:'#FE0000'}} />
          <p>GOOGLE MEET</p>
        </div>

        <div className="profile-event-icon-desc-flex">
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faCalendar} className="fa-xl" style={{color : "#0028B7"} } />
            <p>March 25 2023</p>
          </div>
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faClock} className="fa-xl" style={{color : '#B70099'}} />
            <p>11:00 A.M.</p>
          </div>
        </div>

        <div className="profile-event-description"> 
          <div style={{fontWeight : '700'}}>Description:</div>
          <div style={{marginLeft : '10px'}}>In this session you will learn about how to start the journey to become a UI/UX developer.</div>
        </div>

        <div className="profile-event-footer"> 
          <div className="profile-event-date">TUE 21 March</div>
          <div className="profile-event-button">
            View In Calendar
          </div>
        </div>
      </div>


      <div className="profile-event-card">
        <h4>Fundamentals of UI/UX</h4>
        <div className="profile-event-icon-desc">
          <FontAwesomeIcon icon={faLocationDot} className="fa-xl" style={{color:'#FE0000'}} />
          <p>GOOGLE MEET</p>
        </div>

        <div className="profile-event-icon-desc-flex">
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faCalendar} className="fa-xl" style={{color : "#0028B7"} } />
            <p>March 25 2023</p>
          </div>
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon icon={faClock} className="fa-xl" style={{color : '#B70099'}} />
            <p>11:00 A.M.</p>
          </div>
        </div>

        <div className="profile-event-description"> 
          <div style={{fontWeight : '700'}}>Description:</div>
          <div style={{marginLeft : '10px'}}>In this session you will learn about how to start the journey to become a UI/UX developer.</div>
        </div>

        <div className="profile-event-footer"> 
          <div className="profile-event-date">TUE 21 March</div>
          <div className="profile-event-button">
            View In Calendar
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileEvent;
