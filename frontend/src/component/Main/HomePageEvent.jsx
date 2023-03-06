import React from "react";
import "./HomePageEvent.css";

const HomePageEvent = () => {
  return (
    <>
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
      </div>

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
      </div>
    </>
  );
};

export default HomePageEvent;
