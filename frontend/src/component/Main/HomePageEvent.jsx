import React, { useState, useEffect } from "react";
import "./HomePageEvent.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Scrollbars from "react-custom-scrollbars";

const HomePageEvent = (props) => {
  const [event, setEvent] = useState([]);
  const [data, setData] = useState([]);
  const [clg, setClg] = useState();

  data.length>0 && data.map((d)=>{
    console.log(d,"ds;lmnfj")
  })

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // id = result._id;
  };

  useEffect(() => {
    getList();
    getUser();
  }, [props, props.clgData]);

  const getList = async (e) => {
    let result = await fetch("http://localhost:8000/getAllEvent");
    result = await result.json();
    setData(result.reverse());
    if (props.clgData) {
      if (data.length > 0) {
        let array = [];
        data.map((eve) => {
          if (eve.postedBy.collegeName === props.clgData) {
            array.push(eve);
          }
        })
        if (array.length > 0) {
          setEvent(array);
        } else {
          setEvent([])
        }
      }
    } else {
      setEvent(result)
    }
  };

  const attendanceUpdate = async (id) => {
    let result = await fetch(`http://localhost:8000/updateEvent/`, {
      method: "put",
      // body: JSON.stringify({ attendance }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="overall-main-page-event">
      <div className="event-main-div-res">
        {event && event.length > 0 ? event.map((item) => (
          <div className="HomePageEvent" key={item._id}>
            <div className="upcoming_event_title">{item.title}</div>
            <div className="home-page-event-time">
              <img src="Images/clock.svg" alt="" />
              <p className="home-page-event-time-p">
                Event Date : {item.eventDate}
              </p>
            </div>
            <div className="home-page-event-description">{item.desc}</div>
            <div className="home-page-event-button">
              <button className="home-page-event-button-interested" onClick={() => {
                attendanceUpdate(item._id);
                // setInterestedBtn(false);
              }}>
                Interested
              </button>
              <button className="home-page-event-button-knowmore">
                Know More
              </button>
            </div>
          </div>
        )) : "No Upcoming Events..."}
      </div>

      {/* mobile view */}
      <div className="main-event-carousel">
        {/* zkmklxm */}

        <Carousel
          autoPlay interval="5000" 
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop
          // dynamicHeight
          // className=""
        >
          {event.map((item, index) => (
            <div className="HomePageEvent ">
              <Scrollbars style={{ height: "150px" }}>
              <h2> {item.title} </h2>
              <div className="home-page-event-time">
                <FontAwesomeIcon icon={faClock} className="fa-xl" />
                <p className="home-page-event-time-p">{item.eventDate}</p>
              </div>
              <div className="home-page-event-description">
                {item.desc}
              </div>
              <div className="home-page-event-button">
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
                <button className="home-page-event-button-interested">
                  Interested
                </button>
              </div>
              </Scrollbars>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePageEvent;
