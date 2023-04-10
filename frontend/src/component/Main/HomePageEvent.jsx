import React, { useState, useEffect } from "react";
import "./HomePageEvent.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import Scrollbars from "react-custom-scrollbars";

const HomePageEvent = (props) => {
  const [event, setEvent] = useState([]);
  const [data, setData] = useState([]);
  let userId, role;
  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    userId = result._id;
    role = result.role
  };

  useEffect(() => {
    getList();
    getUser();
  }, [props, props.clgData]);

  const getList = async (e) => {
    let result = await fetch("http://localhost:8000/getAllEvent");
    result = await result.json();
    result.map((data) => {
      if (data.attendance.length > 0) {
        data.attendance.map((attend) => {
          if (attend._id === userId && userId) {
            data.isInterested = true
            return;
          } else {
            data.isInterested = false
          }
        })
      } else {
        data.isInterested = false
      }
    })
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

  // Mark Interested 
  const attendanceUpdate = async (eveid) => {
    // let result = await fetch(`http://localhost:8000/updateEvent/${eveid}`, {
    //   method: "put",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // });
    // result = await result.json();

    console.log(userId);

    // let data = await fetch(`http://localhost:8000/update/interested/events/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    //   body: JSON.stringify({event:myEvent})
    // });
    // const res = await data.json();
    // console.log(res);
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
              {/* {role && role != "Super_Admin" ? "" : 
              <Button className="" disabled={item.isInterested} onClick={() => {
                attendanceUpdate(item._id);
              }}>
                Interested
              </Button>
              } */}
              <Link to='/calendar' state={{eventId:item._id}}>
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
              </Link>
            </div>
          </div>
        )) : 
        <div className="HomePageEvent">
        <div style={{justifyContent:"center",textAlign:"center"}}>No Upcoming Events !</div> 
        </div>
        }
      </div>

      {/* mobile view */}
      <div className="main-event-carousel">

        <Carousel
          autoPlay interval="5000" 
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop
        >
          {event.map((item, index) => (
            <div className="HomePageEvent">
              <Scrollbars style={{ height: "150px" }}>
              <h2> {item.title} </h2>
              <div className="home-page-event-time">
                <FontAwesomeIcon icon={faClock} className="fa-xl" />
                <p className="home-page-event-time-p">{item.eventDate}</p>
              </div>
              <div className="home-page-event-description">
                {item.desc}
              </div>
              <div className="home-page-event-button pb-3">
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
