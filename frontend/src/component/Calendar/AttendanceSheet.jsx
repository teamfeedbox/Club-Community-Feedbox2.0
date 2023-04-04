import React, { useEffect, useState } from "react";
import {
  faCircle,
  faLocationDot,
  faClock,
  faCalendarAlt,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams,useNavigate } from 'react-router-dom';

import "./AttendanceSheet.css";
// import { useNavigate } from "react-router-dom";
import NavbarRes from "../navbar/NavbarRes";

// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

// const array = [
//   {
//     index: 1,
//     name: "Isha Bam",
//     branch: "IT",
//     year: "4th",
//   },
//   {
//     index: 2,
//     name: "Anushka Shah",
//     branch: "IT",
//     year: "4th",
//   },
//   {
//     index: 3,
//     name: "Khushi ",
//     branch: "IT",
//     year: "4th",
//   },
//   {
//     index: 4,
//     name: "Shraddha",
//     branch: "IT",
//     year: "4th",
//   },
//   {
//     index: 5,
//     name: "Isha Bam",
//     branch: "IT",
//     year: "4th",
//   },
// ];

const AttendanceSheet = () => {
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [data, setData] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);
  
  // Bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const params = useParams();



 useEffect(()=>{
  getEvent();
 })

  const getEvent = async () => {
    // console.log(params.name)
    //  e.preventDefault();
    let result = await fetch(`http://localhost:8000/getEvent/${params.name}`,
     {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }
    );
    result = await result.json();
    // console.log(result[0].attendance)
    setData(result[0].attendance);
    // if (result) {
    //   getEvent();
    // }
  };

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
      setEnableSearch(true);
    }
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    data &&
      data.forEach((user) => {
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
    
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleClose}>
        <Modal.Header >
          <Modal.Title>Are you sure you want to submit</Modal.Title>
          <FontAwesomeIcon
                      className="fa-lg"
                      icon={faXmark}
                      onClick={handleClose}
                      style={{cursor:"pointer"}}
                    />
        </Modal.Header>
        <Modal.Body>
        <input
          className="block border-solid p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
          placeholder="Event duration in minute"
          type="number"
          min={1}
          name="number"
          required
        ></input>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center w-[100vw]">
            
            <button className="attendance-model-btn " type="submit">Submit Attendence</button>

            {/* <button className="attendance-model-btn" onClick={handleClose}>Close</button> */}
          </div>
         
        </Modal.Footer>
        </form>
      </Modal>
      
      <div className="attendance">
        <div className="attendance-right">
          <h1>Attendance Sheet</h1>


        {/* *********Containing Title of event and search functionality********* */}


          <section className="attendence-title">
            {/* *****************Event title******************** */}
            <h5 className="ml-4 mt-2 pl-2">
              Web Development 
            </h5>

          {/* ****************search functionality***************** */}
          <form class="form-inline my-2 my-lg-0" className="res-table-search ">
            <input
              class=" mr-sm-2 form-control"
              type="text"
              placeholder="Search by name"
              aria-label="Search"
              onChange={searchHandler}
            />
            
              <button class="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            
           
          </form>
          </section>
          

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


                  {data &&
                    data.map((item,index) => (
                      <tr>
                        <th scope="row"> {index+1} </th>
                        <td> {item.name} </td>
                        <td>{item.branch}</td>
                        <td>{item.collegeYear }</td>
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
              Total Enrolled: <span>{data && data.length}</span>
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
          
          handleShow()
        }} 
        className="btn btn-primary"
        
        >Submit</button>
      </div>
        </div>
      </div>
      
    </>
  );
};

export default AttendanceSheet;
