import React,{useState,useEffect} from "react";
import "./HomePageEvent.css";

const HomePageEvent = () => {
  const[event,setEvent] = useState([])

  useEffect(()=>{
    getList();
   },[])
 
   const getList = async (e) => {
     // await e.preventDefault();
     let result = await fetch("http://192.168.1.42:8000/getAllEvent");
     result = await result.json();
     console.log(result)
     setEvent(result);
   };
  return (
    <>
    {
      event.slice(0,2).map((item,index)=>
      <div className="HomePageEvent">
        <h2>{item.title}</h2>
        {/* <h2>Fundamentals of UI Development</h2> */}
        <div className="home-page-event-time">
          <img src="Images/clock.svg" alt="" />
          <p className="home-page-event-time-p">Event Date : {item.eventDate}</p>
        </div>
        <div className="home-page-event-description">
          {item.desc}
        </div>
        <div className="home-page-event-button">
          <button className="home-page-event-button-knowmore">Know More</button>
          <button className="home-page-event-button-interested">
            Interested
          </button>
        </div>
      </div>
      )
    }
      



{/* 
      <div className="HomePageEvent">
        <h2>Fundamentals of UI Development</h2>
        <div className="home-page-event-time">
          <img src="Images/clock.svg" alt="" />
          <p className="home-page-event-time-p">March 5, 2023</p>
        </div>
        <div className="home-page-event-description">
          Learn basics of UI development and learn what industry requires from
          you as a freshers.
        </div>
        <div className="home-page-event-button">
          <button className="home-page-event-button-knowmore">Know More</button>
          <button className="home-page-event-button-interested">
            Interested
          </button>
        </div>
      </div> */}

    </>
  );
};

export default HomePageEvent;
