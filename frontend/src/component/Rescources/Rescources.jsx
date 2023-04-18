import React, { useState } from "react";
import "./Rescources.css";
import { Link } from "react-router-dom";
import RescourcesTable from "./RescourcesTable";
import NavbarRes from "../navbar/NavbarRes";

const Rescources = () => {
 
  const [temp,setTemp]=useState(0);
  const [name, setName] = useState("");
  const [skill, setSkills] = useState([
    { name: "Web Development", img: "Images/web-development.png" },
    { name: "App Development", img: "Images/app-dev.png" },
    { name: "Search Engine Optimization", img: "Images/search-engine-optimization.png" },
    { name: "Social Media Optimization", img: "Images/smo.png" },
    { name: "Graphic Designing", img: "Images/graphic.png" },
    { name: "Video Editing", img: "Images/video.png" },
    { name: "Time Management", img: "Images/time.png" },
    { name: "Digital Marketing", img: "Images/digital.png" },
    { name: "Content Writing", img: "Images/content.png" },
    { name: "Performance Marketing", img: "Images/performance.png" }
  ]);
  

  return (
    <>
      <div className="Rescources">
        <h1>RESOURCES</h1>

        {/* ----------------college dropdown for super admin--------------- */}

        {/* <div className=" my-4 mx-1 ">
            <select className="p-2 border-2 font-[700] text-[1rem] border-[#000] rounded-3xl w-[90%] md:w-[20%]">
              <option className=" " selected disabled hidden>College</option>
              <option>Shri Vaishnav Vidyapeeth Vishwavidyalaya</option>
              <option>IET-DAVV</option>
            </select>

          </div> */}

        <div className="Rescources-overall-card">
          
          {
            skill.map((item)=>
            <Link to="/rescourcesDisplay" className="Rescources-card" state={item}
            >
            <div className="Rescources-card-img">
              <img src={item.img} alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>{item.name}</div>
            </div>
          </Link>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Rescources;
