import React from "react";
import "./Admin.css";
import { Scrollbars } from "react-custom-scrollbars";


const Admin = () => {
  return (
    <div className="admin-overall">
      <div className="admin-top">Current Admin</div>
      <Scrollbars style={{'height' : '300px'}}>
      <div className="admin-bottom">
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

export default Admin;
