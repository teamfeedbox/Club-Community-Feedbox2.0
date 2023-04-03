import React, { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import "./AttendanceSheet.css";
import NavbarRes from "../navbar/NavbarRes";

const AttendanceSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const eventId = location.state.eventId;

  useEffect(() => {
    getEvent();
    setLoading(false);
  }, [loading])

  const getEvent = async () => {
    let result = await fetch(`http://localhost:8000/getEvent/${eventId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    result = await result.json();
    setCurrentEvent(result[0]);
    setData(result[0].attendance);
    setValue(result[0].attendance)
  };

  const searchHandler = (e) => {
    if (e.target.value != "") {
      let val = e.target.value;
      let matched = [];
      value.length > 0 &&
        value.forEach((user) => {
          const data = user.name.toLowerCase().includes(val.toLowerCase());
          if (data) {
            matched.push(user);
          }
        });
      setData(matched);
    } else {
      setData(value)
    }
  };

  const handleCheckbox = (value) => {
    if (value.checked) {
      if (!checkedUsers.includes(value.val)) {
        setCheckedUsers(arr => [...arr, value.val])
      }
    } else {
      if (checkedUsers.includes(value.val)) {
        setCheckedUsers(checkedUsers.filter(item => item != value.val))
      }
    }
  }

  const handleSubmit = async (e) => {
    console.log(checkedUsers);
    if (checkedUsers.length > 0) {
      let absentees = [];
      let attendees = [];
      data.map((val) => {
        if (!checkedUsers.includes(val._id)) {
          absentees.push(val._id);
        } else {
          let obj = {
            id: val._id,
            coins: val.coins ? val.coins + 10 : 10,
          }
          attendees.push(obj)
        }
      })
      // console.log(absentees);
      // console.log(attendees);
      // console.log(currentEvent)


      // delete absentee from events attendance array
      // let result = await fetch(`http://localhost:8000/update/event/${currentEvent._id}`, {
      //   method: "PUT",
      //   body: JSON.stringify({absentees}),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + localStorage.getItem("jwt"),
      //   },
      // });
      // const res = await result.json();
      // console.log(res)

      // update users coins and events aaray
      // let userData = await fetch(`http://localhost:8000/update/coins/events`, {
      //   method: "PUT",
      //   body: JSON.stringify({attendees,currentEvent}),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + localStorage.getItem("jwt"),
      //   },
      // });
      // const res = await result.json();
      // console.log(res)
      setSubmitted(true);
      setLoading(true)
    }

  }

  return (
    <>
      <NavbarRes />
      <div className="attendance">
        <div className="attendance-right">
          <h1>Attendance Sheet</h1>

          {/* ****************search functionality***************** */}
          <form className="form-inline my-2 my-lg-0 res-table-search">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search by name"
              aria-label="Search"
              onChange={searchHandler}
            />
            <button className="btn btn-primary my-0 my-sm-0" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* ***********attendance sheet display in the form of table************** */}
          <div className="attendance-sheet">
            <table className="table table-hover" rowKey="name">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Attendee</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Year</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>


                {data.length > 0 &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row"> {index + 1} </th>
                      <td> {item.name} </td>
                      <td>{item.branch}</td>
                      <td>{item.collegeYear}</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={item._id}
                            id="flexCheckDefault"
                            onChange={(e) => handleCheckbox({ checked: e.target.checked, val: e.target.value })}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>
          {
            data.length > 0 ?
              <div className="attendance-count">
                <div>
                  Total Attendee: <span>{checkedUsers.length > 0 ? checkedUsers.length : 0}</span>
                </div>
                <div>
                  Total Enrolled: <span>{data.length > 0 && data.length}</span>
                </div>
              </div> : "No Interested Students"
          }
        </div>
      </div>
      {data.length > 0 ? <div className="flex justify-between mx-12 my-5">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/calendar");
          }}
        >
          Back
        </button>
        <button
          onClick={() => { handleSubmit() }}
          className="btn btn-primary">Submit</button>
      </div> : ""}
    </>
  );
};

export default AttendanceSheet;
