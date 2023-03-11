import React from "react";
import "./Rescources.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Rescources = () => {
  return (
    <>
      <Navbar />
      <div className="Rescources">
        <h1>RESOURCES</h1>
        <div className="Rescources-overall-card">
          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/web-development.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Web Development</div>
            </div>
          </Link>

          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/app-dev.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>App Development</div>
            </div>
          </Link>


          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/search-engine-optimization.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Search Engine Optimization</div>
            </div>
          </Link>


          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/smo.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Social Media Optimization</div>
            </div>
          </Link>


          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/graphic.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Graphic Designing</div>
            </div>
          </Link>


          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/video.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Video Editing</div>
            </div>
          </Link>

          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/time.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Time Managment</div>
            </div>
          </Link>


          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/digital.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Digital Marketing</div>
            </div>
          </Link>

          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/content.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Content Writing</div>
            </div>
          </Link>

          <Link to='/rescourcesDisplay' className="Rescources-card">
            <div className="Rescources-card-img">
              <img src="Images/performance.png" alt="" />
            </div>
            <div className="Rescources-card-content">
              <div>Performance Marketing</div>
            </div>
          </Link>



        </div>
      </div>
    </>
  );
};

export default Rescources;
