import React, { useState } from "react";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import $, { cleanData } from "jquery";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faXmark,
  faPodcast,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./ReactBigCalendar.css";
import NavbarRes from "../navbar/NavbarRes";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [dates, setDates] = useState(0);
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [desc, setDesc] = useState("");
  const [scope, setScope] = useState();
  const [speaker, setSpeaker] = useState("");
  const [myEvent, setMyEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [deletebtn, setDeleteBtn] = useState(false);
  const [show, setShow] = useState(false);
  const [eventPre, setEventPre] = useState("Calendar-view-events-hide");
  const [postedBy, setPostedBy] = useState("");
  const [user, setUser] = useState();
  const [attendance, setAttendance] = useState([]);
  // state for Add Event pop up
  const [addEventModel, setAddEventModel] = useState(false);
  // State for preview Event
  const [preEventModel, setPreEventModel] = useState(false);
  // Show and hide interested button
  const [interestedBtn, setInterestedBtn] = useState(true);
  const [role, setRole] = useState('');
  const [showModal, setShowModal] = useState(false);

  let eventData = [];
  event &&
    event.map((data, i) => {
      const val = {
        id: i,
        title: data.title,
        start: new Date(data.eventDate),
        end: new Date(data.eventDate),
      };
      eventData.push(val);
    });

  let id;
  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    id = result._id;
    setUser(result);
    setRole(result.role);
  };

  useEffect(() => {
    const showEvent = async () => {
      let result = await fetch("http://localhost:8000/getAllEvent");
      result = await result.json();
      setEvent(result);
    };
    showEvent();
    getUser();
    setLoading(false);
  }, [myEvent,loading]);

  const attendanceUpdate = async (id) => {
    let result = await fetch(`http://localhost:8000/updateEvent/${id}`, {
      method: "put",
      body: JSON.stringify({ attendance }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(result);
  };

  // create event
  const addEvent = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8000/createEvent", {
      method: "post",
      body: JSON.stringify({
        title,
        eventDate,
        eventTime,
        venue,
        desc,
        postedBy,
        speaker,
        scope,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(result);
    setTitle("");
    setScope("");
    setEventDate("");
    setEventTime("");
    setVenue("");
    setDesc("");
    setSpeaker("");
    setAddEventModel(false);
    setLoading(true);
  };

  // handle event on select from react big calender
  const handleEvent = (val) => {
    setInterestedBtn(true);
    let start = val.start;
    let title = val.title;
    setPreEventModel(true);
    setEventPre("Calendar-view-events");
    var currEventDate =
      start.getDate() < 10 ? "0" + start.getDate() : start.getDate();
    var month =
      parseInt(start.getMonth()) + 1 < 10
        ? "0" + (parseInt(start.getMonth()) + 1)
        : parseInt(start.getMonth()) + 1;
    var year = parseInt(start.getFullYear());

    const startDate = year + "-" + month + "-" + currEventDate;
    let myEvent;
    event.map(function (val, index) {
      if (val.eventDate === startDate && val.title === title) {
        setMyEvent(val);
        myEvent = val;
      }
    });
    myEvent.attendance.map((data) => {
      if (data._id === user._id) {
        console.log(data._id, user._id);
        setInterestedBtn(false);
      }
    });
  };

  // Delete Event
  const cancelEvent = async (id) => {
    setLoading(true);
    let result = await fetch(`http://localhost:8000/deleteEvent/${id}`, {
      method: "delete",
    });
    result = await result.json();
    console.log(result);
    setDeleteBtn(false);
    setPreEventModel(false);
    setLoading(true);
  };


  return (
    <>
      <NavbarRes />
      <div className="Calendar-container">
        <div className="Calendar-left">

          {/* ----------------college dropdown for super admin--------------- */}

          <div className=" my-4 mx-1 ">
            <select className="p-2 border-2 font-semibold text-[#3174AD] border-[#3174AD] rounded-3xl sm:w-[40%] lg:w-[100%]">
              <option className=" " hidden selected disabled>College</option>
              <option>Shri Vaishnav Vidyapeeth Vishwavidyalaya</option>
              <option>IET-DAVV</option>
            </select>

          </div>

          {/* -----------Button to add event in calendar------------------*/}
          <div
            className="Calendar-add"
            onClick={() => {
              setAddEventModel(true);
            }}
          >
            <div>
              Create Event
              <FontAwesomeIcon
                style={{ margin: "0px 0px 0px 10px" }}
                icon={faCirclePlus}
              />
            </div>
          </div>

          {/* ------------Already created------------------------*/}
          <div className="Calendar-view">
            {preEventModel ? (
              <div
                className="Calendar-view-title"
                style={{ borderRadius: "30px 30px 0px 0px" }}
              >
                Events Preview
              </div>
            ) : (
              <div
                className="Calendar-view-title"
                style={{ borderRadius: "30px" }}
              >
                Events Preview
              </div>
            )}
          </div>

          {/* ------------Model to show already created event-------------------- */}
          {preEventModel ? (
            <div className="Calendar-view-events-container">
              <div className={eventPre}>
                <div className="event-pre-handle">
                  <div className="event-title">{myEvent && myEvent.title}</div>
                  <div
                    className="cancel-view-event"
                    onClick={() => {
                      setPreEventModel(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
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
                <div className="Pre-Event-desc">
                  <b>Descrpition</b>
                  <br />
                  {myEvent && myEvent.desc}
                </div>
                <div className="preview-button">
                  {interestedBtn ? (
                    <button
                      type="button"
                      onClick={() => {
                        attendanceUpdate(myEvent._id);
                        setInterestedBtn(false);
                      }}
                    >
                      Interested
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ pointerEvents: "none", backgroundColor: "gray" }}
                    >
                      Interested
                    </button>
                  )}

                  {role !== "Club_Member" ? (
                    <button
                      onClick={() => {
                        setDeleteBtn(true);
                      }}
                    >
                      Delete Event
                    </button>
                  ) : (
                    ""
                  )}

                  {deletebtn && (
                    <Modal
                      show={deletebtn}
                      onHide={() => setDeleteBtn(false)}
                      // className="profile-section-overall"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{color:"black",display:"flex"}}>
                      Do you really want to delete this Event ? This process cannot
                      be undone.
                      </Modal.Body>
                      <Modal.Footer style={{justifyContent:"right"}}>
                      {loading ? (
                         <div
                         class="spinner-border text-danger"
                         role="status"
                         style={{ height: "15px", width: "15px" }}
                       >
                         <span class="visually-hidden">Loading...</span>
                       </div>
                      ) : (
                        <Button variant="danger" onClick={()=>cancelEvent(myEvent._id)}>
                          Delete
                        </Button>
                      )}
                        
                        <Button
                          variant="light"
                          onClick={() => setDeleteBtn(false)}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  {role !== "Club_Member" ? (
                    <button>
                      <Link
                        to={"/attendance/" + (myEvent && myEvent.title)}
                        state={{ eventId: myEvent._id }}
                        onClick={() => {
                          setEventPre("Calendar-view-events-hide");
                        }}
                      >
                        {myEvent.attendanceSubmitted
                          ? "View Attendance"
                          : "Mark Attendance"}
                      </Link>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* -----------------Large right side Calendar------------------- */}
        <div className="React-Big-Calendar-Original">
          <Calendar
            views={["agenda", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventData}
            onSelectEvent={handleEvent}
            value={dates}
          />
        </div>

        {/* to show popup to add event (Add Event) */}
        {addEventModel ? (
          <div className="Calendar-add-drop-container">
            <div className="Calendar-add-drop">
              <form onSubmit={addEvent}>
                <div className="calender-add-title">
                  <span>Create an Event</span>

                  <div
                    className="cancel-button"
                    onClick={() => {
                      setAddEventModel(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                <div className="Calendar-title">
                  <span>Title</span>
                  <input
                    type="text"
                    required
                    placeholder="Add Event Title"
                    value={title}
                    maxlength="50"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    border: "1.5px solid black",
                    padding: "10px 10px 15px 10px",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>General</span>
                  <div className="input-container">
                    <FontAwesomeIcon
                      style={{ margin: "7px 10px 0 0" }}
                      icon={faFlag}
                    />
                    <select
                      name="type"
                      onChange={(e) => setScope(e.target.value)}
                    >
                      <option selected disabled hidden>
                        Select Community
                      </option>
                      <option value="public">Public</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
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
                      style={{ margin: "7px 10px 0 0" }}
                      icon={faClock}
                    />
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
                      placeholder="Add Venue...."
                      value={venue}
                      required
                      onChange={(e) => setVenue(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className="input-container input-container1"
                  style={{
                    margin: "25px 0 25px 0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="description">Descrpition</div>
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
        ) : (
          ""
        )}
      </div>
    </>
  );
}
