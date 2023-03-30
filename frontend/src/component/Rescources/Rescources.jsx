import React, { useState } from "react";
import "./Rescources.css";
import { Link } from "react-router-dom";
import RescourcesTable from "./RescourcesTable";

const Rescources = () => {
  //   const getText = (e)=>{
  // console.log(e)
  //   }
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

        <div className="Rescources-overall-card">
          
          {
            skill.map((item)=>
            <Link to="/rescourcesDisplay" className="Rescources-card" state={item}
            // onClick={()=>alert(item.name)
            // }
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

          
          


{/* 
          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/app-dev.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>App Development</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/search-engine-optimization.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Search Engine Optimization</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/smo.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Social Media Optimization</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/graphic.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Graphic Designing</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/video.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Video Editing</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/time.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Time Management</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/digital.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Digital Marketing</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/content.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Content Writing</div>
            </div>
          </Link>

          <Link to="/rescourcesDisplay" className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/performance.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Performance Marketing</div>
            </div> */}
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Rescources;
