import React from 'react';
import Calendar from './Calendar';
import Navbar from "../Navbar";
import "./Calendar.css";
import ReactBigCalendar from './ReactBigCalendar.js';
function CalendarPage() {
  return (
    <>
        <div className='CalendarPage-navbar'>
          <Navbar/>
        </div>
        <ReactBigCalendar></ReactBigCalendar>
    </>

  )
}

export default CalendarPage