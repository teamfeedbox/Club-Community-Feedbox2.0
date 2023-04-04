import {
  faArrowUpRightFromSquare,
  faUserGroup,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./HomePageProfile.css";

import { useNavigate } from "react-router-dom";

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
  const [role, setRole] = useState("");

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
    setRole(result.role);
    setData(result);
  };

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
    window.location.reload(true);
  };

  const onAddCollege = (e) => {
    setCollege(e.target.value);
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
          {role === "Club_Member" ? (
            <p className="home-profile-name-section-desig"> Club Member </p>
          ) : role === "Super_Admin" ? (
            <p className="home-profile-name-section-desig"> Super Admin </p>
          ) : (
            <p className="home-profile-name-section-desig"> {role} </p>
          )}
          <p className="home-profile-name-section-desig"> </p>
        </div>
      </div>
      {/* not for super admin */}

      {role === "Club_Member" || role === "Admin" || role === "Lead" ? (
        <div>
          <div className="home-profile-skill-div">
            <h6>Skills:</h6>
            <div className="home-profile-skills">
              {data &&
                data.skills.map((item, index) => (
                  <div
                    key={item._id}
                    style={{
                      background: backColor[index],
                      color: fColor[index],
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <div className="home-profile-coin-section">
            <div className="home-profile-coins">
              <img src="Images/Money.png" alt="" />
            </div>
            <div className="home-profile-coins-content">
              <h6>40</h6>
              <div>Coins Collected</div>
            </div>
          </div>
        </div>
      ) : '' }
      
      {/* for super admin */}
      {role === 'Super_Admin'
       ? (
        <div className="m-3 flex  flex-col">
          <div className="mb-2">
            <form action="">
              <input
                type="text"
                className="border rounded p-1 w-[210px]"
                placeholder="Add College"
                required
                onChange={onAddCollege}
              />
              <button
                className=" p-1 rounded w-[60px] ml-2 bg-green-600 text-white font-[600] text-[1rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
                onClick={() => {
                  alert(`${college} added!!`);
                }}
              >
                Add
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
              <option value="IET-DAVV">IET-DAVV</option>
              <option value="Shri Vaishnav Vidyapeeth Vishwavidyalaya">
                Shri Vaishnav Vidyapeeth Vishwavidyalaya
              </option>
            </select>
          </div>

          <div className="mt-2">
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
                <p className=" text-[23px] font-bold p-0 relative bottom-2">
                  10
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default HomePageProfile;
