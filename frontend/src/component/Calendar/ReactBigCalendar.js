import React, { useState } from "react";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactBigCalendar from "./ReactBigCalendar";
import { useEffect } from "react";
import $, { cleanData } from "jquery";
import {
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faAlignLeft,
  faXmark,
  faPodcast,
  faTextSlash,
  faTextWidth,
  faFileText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [dates, setDates] = useState(0);

  const [event, setEvent] = useState([]);

  const [title, setTitle] = useState();
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [venue, setVenue] = useState();
  const [desc, setDesc] = useState();
  const [speaker, setSpeaker] = useState();
  const [myEvent, setMyEvent] = useState();


  let eventData = [];
  event &&
    event.map((data,i) => {
      
      const val = {
        id: i,
        title: data.title,
        // allDay: true,
        start: new Date(data.eventDate),
        end: new Date(data.eventDate),
      };
      eventData.push(val)
    });
// console.log(eventData)
// console.log(eventsData)
  // const [create,setCreate]=useEffect();
  // const [view,setView]=useEffect();

  // function callIt(){
  //   if(count1==0)
  //   {
  //     $(".Calendar-add").css("border-radius","20px 20px 0px 0px");
  //     $(".Calendar-add-drop").delay("slow").show();
  //     setCount1(1);
  //   }
  //   else
  //   {
  //     $(".Calendar-add").css({"border-radius":"20px 20px 20px 20px"});
  //     $(".Calendar-add-drop").hide();
  //     setCount1(0);
  //   }

  // }
  useEffect(() => {
    if (count1 == 0) {
      $(".Calendar-add-drop").hide();
    } else {
      $(".Calendar-add-drop").show();
    }

    const showEvent = async () => {
      let result = await fetch("http://localhost:8000/getAllEvent");
      result = await result.json();
      setEvent(result);
      // console.log(result[0].eventDate);
    };
    showEvent();

    // for Event prview
    if(count2==0)
    {
      $(".Calendar-view-events").hide(); 
      $(".Calendar-view-title").css("border-radius", "20px 20px 20px 20px");
    }
    else{
      $(".Calendar-view-title").css("border-radius", "20px 20px 0px 0px");
      $(".Calendar-view-events").show(); 
    }
  });

  const addEvent = async (e) => {
    e.preventDefault();
    // const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:8000/createEvent", {
      method: "post",
      body: JSON.stringify({ title, eventDate, eventTime, venue, desc,speaker }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    // if(result){
    //   alert("event is added")
    // }else{
    //   console.log("error")
    // }
    // handleSelect1();
    setCount1(0);
    // setEventsData([
    //   ...eventsData,
    //   {
    //     start,
    //     end,
    //     title,
    //   },
    // ]);
  };

  const handleEvent = ({start,end},eve, data) => {
    // alert(event.title+"_______"+event.start+"________"+event.end);
    // if (count2 == 0) {
    //   $(".Calendar-view-title").css("border-radius", "20px 20px 0px 0px");
    //   $(".Calendar-view-events").delay("slow").show();
    //   setCount2(1);
    // } else {
    //   $(".Calendar-view-title").css({ "border-radius": "20px 20px 20px 20px" });
    //   $(".Calendar-view-events").hide();
    //   setCount2(0);
    // }

    // console.log("onSelectEvent",event);

    // var currDate = start;
    setCount2(1);
    var currEventDate = start.getDate();
    var month = parseInt(start.getMonth()) + 1;
    var year = parseInt(start.getFullYear());
    
    const startDate = year + "-" + 0 + month + "-" + currEventDate;

    // if (month < 10) {
    //   console.log(startDate);
    // } else {
    //   console.log(currDate.getDate() + "-" + month + "-" + year);
    // }

    event.map(function (val, index) {
      if (val.eventDate === startDate) {
       
        console.log(val)
        setMyEvent(val);
        
      }

    });

    
  };

  const handleSelect3 = ({ start, end }) => {
    if (count1 === 0) {
      $(".Calendar-add-drop").show();
      setCount1(1);
    } else {
      $(".Calendar-add-drop").hide();
      setCount1(0);
    }
  };

  const handleSelect1 = ({ start, end }) => {
    setCount1(0);
  };

  const handleSelect = ({ start, end }) => {
    setCount1(1);
    if (count1 == 0) {
      $(".Calendar-add-drop").hide();
    } else {
      $(".Calendar-add-drop").show();
    }
    // console.log(start )
    // console.log(end )
    // var currDate = start;
    // var currEventDate = currDate.getDate();
    // var month = parseInt(currDate.getMonth()) + 1;
    // var year = parseInt(currDate.getFullYear());
    // // const startDate = currDate.getDate() + "-" + 0 + month + "-" + year;
    // const startDate = year + "-" + 0 + month + "-" + currDate.getDate();

    // if (month < 10) {
    //   console.log(startDate);
    // } else {
    //   console.log(currDate.getDate() + "-" + month + "-" + year);
    // }

    // event.map(function (val, index) {
    //   if (val.eventDate === startDate) {
       
    //     console.log(val)
    //   }

    // });

    // const title = title;
    // if (title)
    //   setEventsData([
    //     ...eventsData,
    //     {
    //       start,
    //       end,
    //       title,
    //     },
    //   ]);
  };
  const navigate = useNavigate();

  return (
    <div className="Calendar-container">


      <div className="Calendar-left">
        <div
          className="Calendar-add"
          onClick={handleSelect3}
          // onClick={callIt}
        >


          <div>
            Create Event
            <FontAwesomeIcon
              style={{ margin: "0px 0px 0px 10px" }}
              icon={faCirclePlus}
            />
          </div>


        </div>
    
 

        <div className="Calendar-view">
          <div className="Calendar-view-title">Events Preview</div>
          <div className="Calendar-view-events">
            <div className="event-title">{myEvent && myEvent.title}</div>
            <div className="event-profile">
              <FontAwesomeIcon
                style={{ margin: "0 10px 0 0" }}
                icon={faPodcast}
                
              />
              {myEvent && myEvent.speaker}
            </div>
            <div className="event-minor">
              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faLocationDot}
                />
                {myEvent && myEvent.venue}
               
              </div>

              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faCalendarAlt}
                />
                {myEvent && myEvent.eventDate}
              </div>

              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faClock}
                />
                {myEvent && myEvent.eventTime}
              </div>
            </div>
            <div>
              <b>Descrpition</b>
              <br />
              {myEvent && myEvent.desc}
            </div>
            <div className="preview-button">
            <button>Interested</button>
            <button>Cancel Event</button>
            </div>
            <div style={{textAlign:"center"}}>
            <button onClick={() => {navigate('/attendance')}}>Mark Attendance</button>
            </div>
          </div>
        </div>

{/* onClick = {showEvent} */}
      </div>

      
      {/* <ReactBigCalendar className="ReactBigCalendar" /> */}
      <div className="ok" style={{ width: "98vw", margin: "0 20px 0 0" }}>
         {eventData.length>0 && <Calendar
          views={["agenda", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventData}
          style={{ height: "100vh" }}
          onSelectEvent={handleEvent}
          value={dates}
          onSelectSlot={handleSelect}
        />
        // console.log(eventData,"jhjhghjg")
        // console.log(eventData,"jhjhghjg")
        // console.log(eventData,"jhjhghjg")
        
        }
      </div>

      <div className="Calendar-add-drop">
        <form>
          <div className="calender-add-title">
            <span>Create an Event</span>
            <div className="cancel-button" onClick={handleSelect1}>
            <FontAwesomeIcon
             icon={faXmark} />
            </div>
            </div>
          <div className="Calendar-title" >
            <span>Title</span>
            <input
              type="text"
              placeholder="Add Event Title"
              value={title}
              maxlength="50"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>


          <div style={{border:"1.5px solid black",padding:"10px 10px 15px 10px",borderRadius:"10px"}}>
          <span style={{fontWeight:"600"}}>General</span>
          <div className="input-container">
          
          <FontAwesomeIcon
                style={{ margin: "7px 10px 0 0" }}
                icon={faPodcast}
                
              />
            <input
              type="Speaker Name"
              value={eventDate}
              placeholder="Speaker Name"
              onChange={(e) => setEventDate(e.target.value)}
            ></input>
          </div>

          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "7px 10px 0 0" }}
              icon={faCalendarAlt}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <FontAwesomeIcon
             style={{ margin: "7px 10px 0 0" }} icon={faClock} />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "7px 15px 0 0" }}
              icon={faLocationDot}
            />
            <input
              type="text"
              placeholder="Add place name.."
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          </div>

          <div className="input-container input-container1" style={{margin:"25px 0 25px 0",display:"flex",flexDirection:"column"}}>
            <div className="description">
              {/* <FontAwesomeIcon
                style={{ margin: "0px 10px 0 0" }}
                icon={faAlignLeft}
              /> */}
              {/* <span> */}
               Descrpition
            </div>
            
            <textarea
              name="message"
              rows="3"
              cols="30"
              placeholder="About . . ."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="submit-button">
          <button className="Calendar-submit" type="submit" onClick={addEvent}>
            Create
          </button>
          </div>

          
        </form>
      </div>
    </div>
  );
}
