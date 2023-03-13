import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactBigCalendar from "./ReactBigCalendar";
import { useEffect } from 'react';
import $ from "jquery";
import { faCircle,faLocationDot,faClock,faCirclePlus,faCalendarAlt, faAlignLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const[count1,setCount1]=useState(0);
  const[count2,setCount2]=useState(0);
  
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
    useEffect(()=>{
      if(count1==0)
      {
        $(".Calendar-add-drop").hide();
        
      }
      else
      {
        $(".Calendar-add-drop").show();
      }

    })
  
  const handleEvent=(event)=>{
    // alert(event.title+"_______"+event.start+"________"+event.end);
    if(count2==0)
    {
      $(".Calendar-view-title").css("border-radius","20px 20px 0px 0px");
      $(".Calendar-view-events").delay("slow").show();
      setCount2(1);
    }
    else
    {
      $(".Calendar-view-title").css({"border-radius":"20px 20px 20px 20px"});
      $(".Calendar-view-events").hide();
      setCount2(0);
    }

  }

  const handleSelect3 = ({ start, end }) => {
    
      if(count1==0)
      {
        $(".Calendar-add-drop").show();
        setCount1(1)
      }
      else
      {
        $(".Calendar-add-drop").hide();
        setCount1(0)
      }
  }
  const handleSelect1 = ({ start, end }) => {
    setCount1(0)
  }

  const handleSelect = ({ start, end }) => {
    
    setCount1(1)
    // if(count1==0)
    //   {
    //     $(".Calendar-add-drop").hide();
        
    //   }
    //   else
    //   {
    //     $(".Calendar-add-drop").show();
    //   }

    // const title = window.prompt("Enter Event name");
    // if (title)
    //   setEventsData([
    //     ...eventsData,
    //     {
    //       start,
    //       end,
    //       title,
    //     }
    //   ]);
  };
  return (
    <div className='Calendar-container'>
    <div className='Calendar-left'>
      <div className='Calendar-add' onClick={handleSelect3}
      // onClick={callIt}
      >
        <div>Create Event
        <FontAwesomeIcon  style={{'margin' : '0px 0px 0px 10px'}} icon={faCirclePlus} />
        </div>
      </div>
      
      <div className='Calendar-view'>
        <div className='Calendar-view-title'>
          Events Preview
        </div>
        <div className='Calendar-view-events'>
          <div className='event-title'>
            {"Web Development"}
          </div>
          <div className='event-profile'>
            <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faCircle} />
              {"Yash Kulshrestha"}
          </div>
          <div className='event-minor'>
          <div>
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faLocationDot} />
            {'Google meet'}
          </div> 
          
          <div>
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faCalendarAlt} />
            {'27/5/2023'}
          </div>

          <div>
          
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faClock} />
            {'09:40 am to 12:00 pm'}
          </div> 
          
          </div>  
          <div>
            <b>Descrpition</b><br/>
            {"In this session you will learn about how to start the journey to become a UI/UX developer. In this session you will learn how to do research and test the market credibility of the project you are taking on and what are the regular pain of users from the competitor"}
          </div> 
          <button>Interested</button>    
          <button>Cancel Event</button>    
        </div>
      </div>
      
    </div>
    {/* <ReactBigCalendar className="ReactBigCalendar" /> */}
    <div className="ok" style={{width:"98vw",margin:"0 20px 0 0"}}>
      <Calendar
        views={["agenda", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={handleEvent}
         
        onSelectSlot={handleSelect}
      />
    </div> 
    <div className='Calendar-add-drop'>
        <form>
        <div className="Calendar-title" style={{display:"flex",flexDirection:"row-reverse"}}>
        <div className="cancel-button" onClick={handleSelect1}>X</div>
         <input type='text' id=''placeholder='Add Event Title' />
         </div>
         <div className='input-container'>
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faCalendarAlt} />
          <input type="date"></input>
          </div>
          <div className='input-container'>
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faClock} />
            <input type="time"></input>
          </div>
          <div className='input-container'>
          <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faLocationDot} />
          <input type="text" placeholder='Add place name..'/>
          </div>
         <div className='input-container'>
         <FontAwesomeIcon style={{margin:"0 10px 0 0"}} icon={faAlignLeft} />
          Descrpition:
          <textarea name="message" rows="4" cols="30" 
          style={{margin:"5px 0px 0px 25px",
          padding:"px 0px 0px 0px",
          fontSize:"13px",}}
          placeholder="About . . ."
          >
          </textarea>
          </div>
          <button className="Calendar-submit" type="submit">Add</button>
        </form>
      </div>
    </div>   
  );
}
