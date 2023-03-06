import React, { useState } from "react";
import "./HomePageCal.css";
import Calendar from "react-calendar";
// import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const HomePageCal = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="home-page-cal">
      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default HomePageCal;
