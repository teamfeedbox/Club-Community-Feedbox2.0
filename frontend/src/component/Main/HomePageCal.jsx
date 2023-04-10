import React, { useEffect, useState } from "react";
import "./HomePageCal.css";
import Calendar from "react-calendar";

const HomePageCal = (props) => {
  const [value, onChange] = useState(new Date());
  const [event,setEvent]=useState([]);

  useEffect(() => {
    getList()
  }, [])

  const getList = async (e) => {
    let res = await fetch("http://localhost:8000/getAllEvent");
    res = await res.json();

    let today = new Date();
    let result = [];
    res.map((event) => {
      let eveDate = new Date(event.eventDate + " " + event.eventTime);
      if (today < eveDate) {
        result.push(event)
      }
    })
    result = result.reverse()
    if (props.clgData) {
      if (result.length > 0) {
        let array = [];
        result.map((eve) => {
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

  return (
    <div className="home-page-cal">
      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default HomePageCal;
