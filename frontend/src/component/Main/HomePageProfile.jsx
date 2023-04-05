import {
  faArrowUpRightFromSquare,
  faHandSparkles,
  faUserGroup,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./HomePageProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import {
//   faCalendar,
//   faUniversity,
//   faUserGroup,
// } from "@fortawesome/free-solid-svg-icons";

const backColor = [
  "#EDC7E2",
  "#C7EDCF",
  "#EDE7C7",
  "#EDC7C7",
  "#B5A6E1",
  "#B4B4B4",
  "#72C4FF",
  "#e9f5db",
  "#fad643",
  "#E3B47C",
];

const fColor = [
  "#9B0483",
  "#2AA100",
  "#A67904",
  "#A10000",
  "#5C0684",
  "#363636",
  "#035794",
  "#718355",
  "#76520E",
  "#744E37",
];

const HomePageProfile = () => {
  const auth = localStorage.getItem("user");
  const [data, setData] = useState();
  const [college, setCollege] = useState("");
  const [allClgs, setAllClgs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    getColleges();
    // setLoading(false);
  });

  const getColleges = async () => {
    const data = await fetch(`http://localhost:8000/colleges/get`);
    const res = await data.json();
    console.log(res);
    let val = [];
    res.map((data) => {
      val.push(data.name);
    });
    setAllClgs(val);
  };

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
  };

  const goToProfile = () => {
    window.location.href = "/profile";
  };

  const onAddCollege = (e) => {
    setCollege(e.target.value);
  };

  const handleAddSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(college);
    if (college) {
      let val = {
        name: college,
      };
      let data = await fetch(`http://localhost:8000/college/add`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const res = await data.json();
      setCollege("");
      alert(res);
    }
    setLoading(false);
  };

  return (
    <div className="HomePageProfile pb-3">
      {/* profile section */}
      <div className="home-profile-bg-doodle">
        <img src={"Images/doodle-profile-bg.png"} alt="" />
        <button className="home-profile-visit-profile" onClick={goToProfile}>
          <FontAwesomeIcon
            className="home-profile-visit-profile-icon"
            icon={faArrowUpRightFromSquare}
          />
        </button>
      </div>
      <div className="home-profile-main-info">
        <div className="home-profile-main-photo">
          <img src={data && data.img} alt="" />
        </div>
        <div className="home-profile-name-section">
          <p className="home-profile-name-section-name">{data && data.name}</p>
          <p className="home-profile-name-section-desig">
            {data && data.role == "Super_Admin"
              ? "Super Admin"
              : data && data.role == "Club_Member"
              ? "Club Member"
              : data && data.role}
          </p>
        </div>
      </div>

      <div className="m-3 flex  flex-col">
        <div className="mb-2">
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              className="border rounded p-1 w-[210px]"
              placeholder="Add College"
              value={college}
              required
              onChange={onAddCollege}
            />
            <button
            className=" p-1 rounded w-[60px] ml-2 bg-green-600 text-white font-[600] text-[1rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
            type="submit"
            >
            {loading ? (
              <div
                class="spinner-border text-white"
                role="status"
                style={{ height: "15px", width: "15px",marginLeft:"2px"}}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              
            ) : (
              <div>
                Add
              </div>
            )}
            </button>
            
          </form>
        </div>

        <div className="font-[700] text-[1.1rem]">Select College:</div>
        <div className=" ">
          <select
            name="College"
            id="College"
            className="border w-[280px] rounded p-1 mt-1"
          >
            <option disabled selected className="hidden">
              College
            </option>
            {allClgs.length > 0 &&
              allClgs.map((clg) => <option value={clg}>{clg}</option>)}
          </select>
        </div>

        <div className="mt-2">
          {/* <div className="m-2 border rounded p-2 w-fit">
            <p className="m-0">Total Students:</p>
            <p className="m-0">100</p>
          </div>
          <div className="m-2 border rounded p-2 w-fit">
            <p className="m-0">Total Students:</p>
            <p className="m-0">100</p>
          </div> */}

          <div className="flex mt-2 w-[280px] rounded shadow-sm h-[60px] ">
            <div className=" w-[45px] h-[45px] mt-1  ml-3 rounded bg-blue-200">
              <FontAwesomeIcon
                className="w-[25px] h-[25px] m-2.5 text-blue-800"
                icon={faUserGroup}
              />
            </div>
            <div className=" flex flex-col  pl-2">
              <h className=" text-[18px] md:text-[16px]   font-semibold">
                Total Students:
              </h>
              <p className=" text-[23px] font-bold p-0 relative bottom-2">
                1,190
              </p>
            </div>
          </div>

          <div className="flex mt-2 w-[280px] rounded shadow-sm h-[60px] ">
            <div className=" w-[45px] h-[45px] mt-1  ml-3 rounded bg-green-200">
              <FontAwesomeIcon
                className="w-[25px] h-[25px] m-2.5 text-green-800"
                icon={faWandSparkles}
              />
            </div>
            <div className=" flex flex-col  pl-2">
              <h className=" text-[18px] md:text-[16px]   font-semibold">
                Total Events:
              </h>
              <p className=" text-[23px] font-bold p-0 relative bottom-2">10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageProfile;
