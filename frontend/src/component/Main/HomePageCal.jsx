import React, { useEffect, useState } from "react";
import "./HomePageCal.css";
import Calendar from "react-calendar";
import moment from 'moment';

const HomePageCal = ({ clgData, eventSel }) => {
  const [value, onChange] = useState(new Date());
  const [event, setEvent] = useState([]);
  const [dupData, setDupData] = useState([]);

  useEffect(() => {
    getList()
  }, [clgData])

  const getList = async (e) => {
    let res = await fetch("http://localhost:8000/getAllEvent");
    res = await res.json();
    setDupData(res)

    let today = new Date();
    let result = [];
    let newResult=[];
    res.map((event) => {
      let eveDate = new Date(event.eventDate + " " + event.eventTime);
      if (today < eveDate) {
        result.push(event.eventDate)
        newResult.push(event);
      }
    })
    result = result.reverse()
    if (clgData) {
      if (res.length > 0) {
        let array = [];
        newResult.map((eve) => {
          if (eve.postedBy.collegeName === clgData) {
            array.push(eve.eventDate);
          }
        })
        console.log(array,"aerar");
        if (array.length > 0) {
          console.log(array, "pppppppppppppppppppppppppppppppp");
          setEvent(array);
        } else {
          setEvent([]);
        }
      }
    } else {
      setEvent(result)
    }
  };

  const handleChange = (day) => {
    const date = moment(day).format("YYYY-MM-DD");
    dupData.map((eve) => {
      if (eve.eventDate == date) {
        console.log(date, eve.eventDate);
        eventSel(eve.eventDate)
      }
    })
  }

  return (
    <div className="home-page-cal">
      <div className="calendar-container">
        <Calendar onChange={handleChange} value={value}
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
