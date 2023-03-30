import React, { useState } from "react";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactBigCalendar from "./ReactBigCalendar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import $, { cleanData } from "jquery";
import {
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faXmark,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './ReactBigCalendar.css';
import NavbarRes from "../navbar/NavbarRes";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [dates, setDates] = useState(0);

  const [event, setEvent] = useState([]);

  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [desc, setDesc] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [myEvent, setMyEvent] = useState();

  const [eventPre,setEventPre]=useState("Calendar-view-events-hide");
  const [eventBtn,setEventBtn]=useState("Calendar-view-title");

  const [postedBy, setPostedBy] = useState("");


  const cancelEvent = async(id)=>{
    // console.log(id)
    let result = await fetch(`http://localhost:8000/deleteEvent/${id}`, {
      method: "delete",
    });

    result = await result.json();
    console.log(result)
    setCount2(0);

    // if (result) {
    //   // this is done to get back the product list re render after any product is deleted
    //   // if we do not call this function here the product will be deleted but it is visible on the
    //   //screen and then when we refresh it disappears. so to avoid that bug we have called that function
    //   getList();
    // }
  }


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


  const [user, setUser] = useState();
  const [attendance, setAttendance] = useState([]);






  let id;
  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
   
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
     id = result._id

    setUser(result);
   
  };

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

    
  }, []);

  const attendanceUpdate = async (id)=>{
   
    let result = await fetch(`http://localhost:8000/updateEvent/${id}`,{
        method:'put',
        body: JSON.stringify({attendance}),
        headers:{
            "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")

        }

    })

    result = await result.json();
   
    console.log(result)

}


  const addEvent = async (e) => {
    e.preventDefault();
    // const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:8000/createEvent", {
      method: "post",
      body: JSON.stringify({ title, eventDate, eventTime, venue, desc,postedBy,
        attendance, 
        speaker }),
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
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
      setEventPre("Calendar-view-events");
      setEventBtn("Calendar-view-title-css");

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
       
        // console.log(val)
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
    <>
    <NavbarRes />
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
          <div className={eventBtn}>Events Preview</div>
                
          <div className={eventPre}>
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
            <button onClick={()=>{attendanceUpdate(myEvent._id)}}>Interested</button>

            <button onClick={ ()=>{
              setEventPre("Calendar-view-events-hide");
              setEventBtn("Calendar-view-title");
              cancelEvent(myEvent._id)
            }}>Cancel Event</button>

            </div>
            <div style={{textAlign:"center"}}>
            {/* <button onClick={() => {
              setEventPre("Calendar-view-events-hide");

            navigate('/attendance')
            }}>Mark Attendance</button> */}

<button><Link to={"/attendance/" + (myEvent && myEvent.title)} onClick={() => {
              setEventPre("Calendar-view-events-hide");

            // navigate('/attendance')
            }}>Mark Attendance</Link></button>

            </div>
          </div>
        </div>
      </div>

      
      {/* <ReactBigCalendar className="ReactBigCalendar" /> */}
      <div className="React-Big-Calendar-Original">
         {eventData.length>0 && <Calendar
          views={["agenda", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventData}
          onSelectEvent={handleEvent}
          value={dates}
          onSelectSlot={handleSelect}
        />
        }
      </div>

      <div className="Calendar-add-drop">
        <form onSubmit={addEvent}>
          <div className="calender-add-title">
            <span>Create an Event</span>
            <div className="cancel-button" onClick={() => { setCount1(0) }}>
            <FontAwesomeIcon
             icon={faXmark} />
            </div>
            </div>
          <div className="Calendar-title" >
            <span>Title</span>
            <input
              type="text"
              required
              placeholder="Add Event Title"
              value={title}
              maxLength="50"
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
              placeholder="Add Speaker Name"
              value={speaker}
              required
              onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </div>

          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "7px 10px 0 0" }}
              icon={faCalendarAlt}
            />
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <FontAwesomeIcon
             style={{ margin: "7px 10px 0 0" }} icon={faClock} />
            <input
              type="time"
              required
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
              required
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          </div>

          <div className="input-container input-container1" style={{margin:"25px 0 25px 0",display:"flex",flexDirection:"column"}}>
            <div className="description">
               Descrpition
            </div>
            
            <textarea
              name="message"
              rows="3"
              cols="30"
              placeholder="About . . ."
              value={desc}
              required
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="submit-button">
          <button className="Calendar-submit" type="submit">
            Create
          </button>
          </div>

          
        </form>
      </div>
    </div>
    </>
  );
}
