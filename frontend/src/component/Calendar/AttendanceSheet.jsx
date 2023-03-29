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
import NavbarRes from "../navbar/NavbarRes";
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
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);

  const navigate = useNavigate();

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
      setEnableSearch(true);
    }
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    array &&
      array.forEach((user) => {
        console.log(user.name, val);
        const value = user.name.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      });
    console.log(matched);
    setSearched(matched);
  };

  return (
    <>
    <NavbarRes />
      <div className="attendance">
        <div className="attendance-right">
          <h1>Attendance Sheet</h1>

          {/* ****************search functionality***************** */}
          <form class="form-inline my-2 my-lg-0" className="res-table-search">
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by name"
              aria-label="Search"
              onChange={searchHandler}
            />
            <button class="btn btn-primary my-0 my-sm-0" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* ***********attendance sheet display in the form of table************** */}

          <div className="attendance-sheet">
            {!enableSearch && (
              <table class="table table-hover" rowKey="name">
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
                  {array &&
                    array.map((arr) => (
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
            )}

            {enableSearch && (
              <table class="table table-hover" rowKey="name">
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
                  {searched &&
                    searched.map((arr) => (
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
            )}
          </div>

          {/* ***************attendance count**************** */}

          <div className="attendance-count">
            <div>
              Total Attendee: <span>20</span>     
            </div>
            <div>
              Total Enrolled: <span>30</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-12 my-5">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/calendar");
          }}
        >
          Back
        </button>
        <button
        onClick={() => {
          navigate("/calendar")
        }} 
        className="btn btn-primary">Submit</button>
      </div>
    </>
  );
};

export default AttendanceSheet;
