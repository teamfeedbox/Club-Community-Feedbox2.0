import { faArrowUpRightFromSquare, faUserGroup, faWandSparkles, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./HomePageProfile.css";

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

const HomePageProfile = (props) => {
  const [college, setCollege] = useState("");
  const [allClgs, setAllClgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [clgEvents, setClgEvents] = useState([]);
  const [clgUsers, setClgUsers] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [selected, setSelected] = useState(false);
  const [addclg, setaddclg] = useState();

  const role = JSON.parse(localStorage.getItem("user")).role
  const data=props.user; // current user
  const event = props.allEvents;

  useEffect(() => {
    getColleges();
    getAllUsers();
    setLoading(false);
  }, [college, loading,props]);

  console.log(`college: ${college}, loading: ${loading}, props: ${props}`)

  const getColleges = async () => {
    setLoading(true);
    const data = await fetch(`http://localhost:8000/colleges/get`);
    const res = await data.json();
    let val = [];
    res.map((data) => {
      val.push(data.name);
    });
    setAllClgs(val);
    setLoading(false);
  };

  // get all users
  const getAllUsers = async () => {
    let result = await fetch("http://localhost:8000/get");
    result = await result.json();
    setAllUsers(result);
  }

  const onAddCollege = (e) => {
    setaddclg(e.target.value);
  };

  // Add clg functionality for super admin
  const handleAddSubmit = async (e) => {
    setLoading1(true);
    e.preventDefault();
    if (addclg) {
      let val = {
        name: addclg,
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
      setaddclg("");
      alert(res);
      setLoading(true);
    }
    setLoading1(false);
  };

  const goToProfile = (name) => {
    if (name === "superAdmin") {
      window.location.href = "/dashboard"
    } else if (name === "user") {
      window.location.href = "/profile"
    }
  }

  const handleCollege = (e) => {
    setCollege(e.target.value)
    let clgEvents = [], usercount = 0;

    let today = new Date();

    if (e.target.value === "All") {
      setClgEvents(event)
      setClgUsers(allUsers.length)
    } else {
      event.map((eve) => {
        let eveDate = new Date(eve.eventDate + " " + eve.eventTime);
        if (eve.postedBy.collegeName === e.target.value) {
          clgEvents.push(eve)
        }
      })
      allUsers.map((user) => {
        if (user.collegeName === e.target.value) {
          usercount++;
        }
      })
      setClgEvents(clgEvents)
      setClgUsers(usercount)
    }
    props.sendData(e.target.value)
    setSelected(true);
  }

  return (
    <div className="HomePageProfile mt-[10px] md:mt-[20px] lg:mt-[20px] ">
      {/*-------------- for web and tab view------------- */}
      <div className="hidden md:block lg:block">
        <div className="home-profile-bg-doodle">
          <img src={"Images/doodle-profile-bg.png"} alt="" />
          <button className="home-profile-visit-profile" onClick={() => goToProfile('user')}>
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

        {/* not for super admin */}
        {role && (role === 'Admin' || role === 'Lead' || role === 'Club_Member')
          ?
          <div className="pb-3">
            <div className="home-profile-skill-div">
              <h6>Skills:</h6>
              <div className="home-profile-skills">
                {data &&
                  data.skills.map((item, index) => (
                    <div key={item._id} style={{ background: backColor[index], color: fColor[index] }}>
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
                <h6> {data && data.coins} </h6>
                <div>Coins Collected</div>
              </div>
            </div></div>
          : ''}

        {/* for super admin */}
        {role && role === 'Super_Admin'
          ? <div className="m-3 flex  flex-col pb-3">
            {/* <div className="mb-2">
              <form onSubmit={handleAddSubmit}>
                <input
                  type="text"
                  className="border rounded p-1 w-[210px] text-[1rem] font-[400]"
                  placeholder="Add College"
                  value={addclg}
                  required
                  onChange={onAddCollege}
                />
                <button
                  className=" p-1 rounded w-[60px] ml-2 bg-green-600 text-white font-[500] text-[1.05rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
                  type="submit"
                >
                  {loading1 ? (
                    <div
                      class="spinner-border text-white"
                      role="status"
                      style={{ height: "15px", width: "15px", marginLeft: "2px" }}
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
            </div> */}

            <div className="font-[700] text-[1.1rem]">Select College:</div>
            <div className=" ">
              <select
                name="College"
                id="College"
                className="border w-[280px] rounded p-1 mt-1 text-[1rem] font-[400]" onChange={handleCollege}
              >
                <option disabled selected className="hidden">
                  College
                </option>
                <option value="All">All</option>
                {allClgs.length > 0 &&
                  allClgs.map((clg) => <option value={clg}>{clg}</option>)}
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
                  <h className=" text-[1.1rem] md:text-[16px]   font-[600]">
                    Total Students:
                  </h>
                  <p className=" text-[1.5rem] font-[700] p-0 relative bottom-2">
                    {selected ? clgUsers ? clgUsers : 0 : allUsers.length > 0 && allUsers.length}
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
                  <h className=" text-[1.1rem] md:text-[16px]   font-[600]">
                    Total Events:
                  </h>
                  <p className=" text-[1.5rem] font-[700] p-0 relative bottom-2">{selected ? clgEvents.length > 0 ? clgEvents.length : 0 : event ? event.length : 0}</p>
                </div>
              </div>
            </div>
          </div>
          : ""}
      </div>

      {/* --------------------for mobile view (only for super admin) -------------------- */}
      {role && role === 'Super_Admin' ?
        <div className="block md:hidden lg:hidden px-3 pt-3 pb-3">
          {/* <div className="mb-2  w-[100%]">
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                className="border rounded p-1 w-[75%] text-[1rem] font-[400]"
                placeholder="Add College"
                value={addclg}
                required
                onChange={onAddCollege}

              />
              <button
                className=" p-1 rounded w-[22%] bg-green-600 ml-2 text-white font-[500] text-[1.05rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
                type="submit"
              >
                {loading1 ? (
                  <div
                    class="spinner-border text-white"
                    role="status"
                    style={{ height: "15px", width: "15px", marginLeft: "2px" }}
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
          </div> */}

          <div className=" ">
            <select
              name="College"
              id="College"
              className="border w-[100%] rounded p-1 text-[1rem] font-[400]" onChange={handleCollege}
            >
              <option disabled selected className="hidden">
                College
              </option>
              {allClgs.length > 0 &&
                allClgs.map((clg) => <option key={clg._id} value={clg}>{clg}</option>)}
            </select>
          </div>
        </div> : ''}
    </div>

  );
};

export default HomePageProfile;
