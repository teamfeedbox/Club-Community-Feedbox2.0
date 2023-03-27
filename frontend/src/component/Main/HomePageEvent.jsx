import React, { useState, useEffect } from "react";
import "./HomePageEvent.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

const HomePageEvent = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async (e) => {
    // await e.preventDefault();
    let result = await fetch("http://localhost:8000/getAllEvent");
    result = await result.json();
    //  console.log(result)
    setEvent(result);
  };
  return (
    <div className="overall-main-page-event">
      <div className="event-main-div-res">

      {
      event.map((item,index)=>
      <div className="HomePageEvent" key={item._id}>
        <h2>{item.title}</h2>
        <div className="home-page-event-time">
          <img src="Images/clock.svg" alt="" />
          <p className="home-page-event-time-p">Event Date : {item.eventDate}</p>
        </div>
        <div className="home-page-event-description">
          {item.desc}
        </div>
        <div className="home-page-event-button">
          <button className="home-page-event-button-interested">
            Interested
          </button>
          <button className="home-page-event-button-knowmore">Know More</button>
        </div>
      </div>
      )
    }

</div>


      <div className="main-event-carousel">
        <Carousel autoPlay interval="5000" infiniteLoop={true} showThumbs={false} >
          <div>
            <div className="HomePageEvent">
              <h2>Fundamentals of UI Development</h2>
              <div className="home-page-event-time">
                <FontAwesomeIcon icon={faClock} className='fa-xl' />
                <p className="home-page-event-time-p">March 5, 2023</p>
              </div>
              <div className="home-page-event-description">
                Learn basics of UI development and learn what industry requires
                from you as a freshers.
              </div>
              <div className="home-page-event-button">
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
                <button className="home-page-event-button-interested">
                  Interested
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="HomePageEvent">
              <h2>Fundamentals of UI Development</h2>
              <div className="home-page-event-time">
                {/* <img src="Images/clock.svg" alt="" /> */}
                <FontAwesomeIcon icon={faClock} className='fa-xl' />
                <p className="home-page-event-time-p">March 5, 2023</p>
              </div>
              <div className="home-page-event-description">
                Learn basics of UI development and learn what industry requires
                from you as a freshers.
              </div>
              <div className="home-page-event-button">
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
                <button className="home-page-event-button-interested">
                  Interested
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="HomePageEvent">
              <h2>Fundamentals of UI Development</h2>
              <div className="home-page-event-time">
                {/* <img src="Images/clock.svg" alt="" /> */}
                <FontAwesomeIcon icon={faClock} className='fa-xl' />
                <p className="home-page-event-time-p">March 5, 2023</p>
              </div>
              <div className="home-page-event-description">
                Learn basics of UI development and learn what industry requires
                from you as a freshers.
              </div>
              <div className="home-page-event-button">
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
                <button className="home-page-event-button-interested">
                  Interested
                </button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* <div className="HomePageEvent">
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
    </div>
  );
};

export default HomePageEvent;
