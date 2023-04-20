import React, { useEffect, useState } from "react";
import "./HomePageCal.css";
import Calendar from "react-calendar";
import { useStateValue } from "../../StateProvider";
import moment from 'moment';

const HomePageCal = ({ clgData, eventSel}) => {
  const [value, onChange] = useState(new Date());
  const [event, setEvent] = useState([]);

  const [{allEventsData}] = useStateValue();
  const dupData = allEventsData && allEventsData;

  useEffect(() => {
    if (allEventsData) {
      console.log("yes");
      let today = new Date();
      let result = [];
      let newResult = [];
      dupData.map((event) => {
        let eveDate = new Date(event.eventDate + " " + event.eventTime);
        if (today < eveDate) {
          result.push(event.eventDate)
          newResult.push(event);
        }
      })
      result = result.reverse();
      setEvent(result);
      if (clgData) {
        if (clgData === "All") {
          setEvent(result);
        } else {
          if (dupData.length > 0) {
            let array = [];
            newResult.map((eve) => {
              if (eve.postedBy.collegeName === clgData) {
                array.push(eve.eventDate);
              }
            })
            if (array.length > 0) {
              setEvent(array);
            } else {
              setEvent([]);
            }
          }
        }
      } else {
        setEvent(result);
      }
    }
  }, [clgData])

  const handleChange = (day) => {
    const date = moment(day).format("YYYY-MM-DD");
    console.log(date,"cal");
    eventSel(date)
  }

  return (
    <div className="home-page-cal">
      <div className="calendar-container">
        <Calendar onChange={handleChange} value={value}
        showYearPicker={false}
          tileClassName={({ date, view }) => {
            if (event.find(x => x === moment(date).format("YYYY-MM-DD"))) {
              return 'highlightbtn1'
            }
          }} />
      </div>
    </div>
  );
};

export default HomePageCal;
