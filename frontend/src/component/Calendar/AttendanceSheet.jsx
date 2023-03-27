import React, { useState } from "react";
import {
  faCircle,
  faLocationDot,
  faClock,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AttendanceSheet.css";
import { useNavigate } from "react-router-dom";
import { useTableSearch } from "./useTableSearch";
// import axios from 'axios';

const array = [
  {
    index: 1,
    name: "Isha Bam",
    branch: "IT",
    year: "4th",
  },
  {
    index: 2,
    name: "Anushka Shah",
    branch: "IT",
    year: "4th",
  },
  {
    index: 3,
    name: "Khushi ",
    branch: "IT",
    year: "4th",
  },
  {
    index: 4,
    name: "Shraddha",
    branch: "IT",
    year: "4th",
  },
  {
    index: 5,
    name: "Isha Bam",
    branch: "IT",
    year: "4th",
  },
];

const AttendanceSheet = () => {
  const [searchVal, setSearchVal] = useState(null);

  // const fetchUsers = async () => {
  //   const { data } = await axios.get(
  //     "https://jsonplaceholder.typicode.com/users/"
  //   );
  //   return { data };
  // };

  const { filteredData, loading } = useTableSearch({
    searchVal,
    // retrieve: fetchUsers
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="attendance">
        {/* <div className="Calendar-left">
          <div className="Calendar-add">Active Event</div>

          <div className="Calendar-view">
            <div className="Calendar-view-title">Events Preview</div>
            <div className="Calendar-view-events">
              <div className="event-title">{"Web Development"}</div>
              <div className="event-profile">
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faCircle}
                />
                {"Yash Kulshrestha"}
              </div>
              <div className="event-minor">
                <div>
                  <FontAwesomeIcon
                    style={{ margin: "0 10px 0 0" }}
                    icon={faLocationDot}
                  />
                  {"Google meet"}
                </div>

                <div>
                  <FontAwesomeIcon
                    style={{ margin: "0 10px 0 0" }}
                    icon={faCalendarAlt}
                  />
                  {"27/5/2023"}
                </div>

                <div>
                  <FontAwesomeIcon
                    style={{ margin: "0 10px 0 0" }}
                    icon={faClock}
                  />
                  {"09:40 am to 12:00 pm"}
                </div>
              </div>
              <div>
                <b>Descrpition</b>
                <br />
                {
                  "In this session you will learn about how to start the journey to become a UI/UX developer. In this session you will learn how to do research and test the market credibility of the project you are taking on and what are the regular pain of users from the competitor"
                }
              </div>
              <button>Mark Attendance</button>
              <button
                onClick={() => {
                  navigate("/calendar");
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div> */}

        <div className="attendance-right">
          <h1>Attendance Sheet</h1>

          {/* ****************search functionality***************** */}
          <form class="form-inline my-2 my-lg-0" className="res-table-search">
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by name"
              aria-label="Search"
              onChange={(e) => setSearchVal(e.target.value)}
              // onChange={searchHandler}
            />
            <button class="btn btn-primary my-0 my-sm-0" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* ***********attendance sheet display in the form of table************** */}

          <div className="attendance-sheet">
            <table
              class="table table-hover"
              rowKey="name"
              dataSource={filteredData}
              loading={loading}
            >
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
                {array.map((arr) => (
                  <tr>
                    <th scope="row"> {arr.index} </th>
                    <td> {arr.name} </td>
                    <td>{arr.branch}</td>
                    <td>{arr.year}</td>
                    <td>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ***************attendance count**************** */}

          <div className="attendance-count">
            <div>
              Total Attendee: <span>20</span>{" "}
            </div>
            <div>
              Total Enrolled: <span>30</span>{" "}
            </div>
          </div>
        </div>
        
      </div>
      <button className="Attendance-Sheet-Button"
                onClick={() => {
                  navigate("/calendar");
                }}
              >
                Back
              </button>
    </>
  );
};

export default AttendanceSheet;
