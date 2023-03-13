import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";

const PendingApprovals = () => {
  return (
    <div className="PendingApprovals">
      <div className="pending-approval-top">Pending Approvals</div>
      <Scrollbars style={{ height: 250 }}>
        <div className="pending-approval-bottom">
          <div className="pending-approval-div">
            <div className="pending-approval-left">
              <div className="pending-approval-image">
                <img src="Images/girl.jpg" alt="" />
              </div>
              <div className="pending-approval-content">
                <div>Isha Bam</div>
                <div className="lead-position-modal">4th-IT</div>
              </div>
            </div>
            <div className="pending-approval-right">
              <button className="pending-approval-button-accept">
                {" "}
                <FontAwesomeIcon icon={faCircleCheck} /> Accept{" "}
              </button>
              <button className="pending-approval-button-decline">
                {" "}
                <FontAwesomeIcon icon={faCircleXmark} /> Decline{" "}
              </button>
            </div>
          </div>

          <div className="pending-approval-div">
            <div className="pending-approval-left">
              <div className="pending-approval-image">
                <img src="Images/girl.jpg" alt="" />
              </div>
              <div className="pending-approval-content">
                <div>Isha Bam</div>
                <div className="lead-position-modal">4th-IT</div>
              </div>
            </div>
            <div className="pending-approval-right">
              <button className="pending-approval-button-accept">
                {" "}
                <FontAwesomeIcon icon={faCircleCheck} /> Accept{" "}
              </button>
              <button className="pending-approval-button-decline">
                {" "}
                <FontAwesomeIcon icon={faCircleXmark} /> Decline{" "}
              </button>
            </div>
          </div>

          <div className="pending-approval-div">
            <div className="pending-approval-left">
              <div className="pending-approval-image">
                <img src="Images/girl.jpg" alt="" />
              </div>
              <div className="pending-approval-content">
                <div>Isha Bam</div>
                <div className="lead-position-modal">4th-IT</div>
              </div>
            </div>
            <div className="pending-approval-right">
              <button className="pending-approval-button-accept">
                {" "}
                <FontAwesomeIcon icon={faCircleCheck} /> Accept{" "}
              </button>
              <button className="pending-approval-button-decline">
                {" "}
                <FontAwesomeIcon icon={faCircleXmark} /> Decline{" "}
              </button>
            </div>
          </div>

          <div className="pending-approval-div">
            <div className="pending-approval-left">
              <div className="pending-approval-image">
                <img src="Images/girl.jpg" alt="" />
              </div>
              <div className="pending-approval-content">
                <div>Isha Bam</div>
                <div className="lead-position-modal">4th-IT</div>
              </div>
            </div>
            <div className="pending-approval-right">
              <button className="pending-approval-button-accept">
                {" "}
                <FontAwesomeIcon icon={faCircleCheck} /> Accept{" "}
              </button>
              <button className="pending-approval-button-decline">
                {" "}
                <FontAwesomeIcon icon={faCircleXmark} /> Decline{" "}
              </button>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default PendingApprovals;
