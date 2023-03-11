import React from "react";
import "./SuperAdmin.css";
import { Scrollbars } from "react-custom-scrollbars";


const SuperAdmin = () => {
  return (
    <div className="admin-overall">
      <div className="admin-top">Current Super-Admin</div>
      <Scrollbars style={{'height' : '195px'}}>
      <div className="admin-bottom">
        <div className="admin-bottom-div">
          <div className="admin-bottom-image">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="admin-bottom-content">
            <div>Isha Bam</div>
            <div className="admin-position">
              <p>4th-CS</p>
              <span>C.E.O</span>
            </div>
          </div>
        </div>

        <div className="admin-bottom-div">
          <div className="admin-bottom-image">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="admin-bottom-content">
            <div>Isha Bam</div>
            <div className="admin-position">
              <p>4th-CS</p>
              <span>Club Vice-President</span>
            </div>
          </div>
        </div>

        <div className="admin-bottom-div">
          <div className="admin-bottom-image">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="admin-bottom-content">
            <div>Isha Bam</div>
            <div className="admin-position">
              <p>4th-CS</p>
              <span>Club Vice-President</span>
            </div>
          </div>
        </div>
      </div>
      </Scrollbars>
    </div>
  );
};

export default SuperAdmin;
