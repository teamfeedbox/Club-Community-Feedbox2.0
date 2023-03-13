import React, { useState } from "react";
import "./ClubMember.css";
import { faUser, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { Scrollbars } from "react-custom-scrollbars";

const ClubMember = () => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="PendingApprovals">
      <div className="pending-approval-top">Club Members</div>
      <Scrollbars style={{'height' : '250px'}} >
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
            <button className="club-memeber-to-lead-btn" onClick={handleShow}>
              <FontAwesomeIcon className="make-lead-icon" icon={faUser} />
              Make Lead
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
            <button className="club-memeber-to-lead-btn">
              <FontAwesomeIcon className="make-lead-icon" icon={faUser} />
              Make Lead
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
            <button className="club-memeber-to-lead-btn">
              <FontAwesomeIcon className="make-lead-icon" icon={faUser} />
              Make Lead
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
            <button className="club-memeber-to-lead-btn">
              <FontAwesomeIcon className="make-lead-icon" icon={faUser} />
              Make Lead
            </button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} backdrop="static" className="club-member-modal">
          <form>
            <Modal.Header closeButton className="club-member-modal-header">
              Are you sure to make this club member as lead ?
            </Modal.Header>
            <Modal.Footer className="modal-footer club-member-modal-footer">
              <div className="modal-footer-club-member-yes-no-div">
                <div onClick={() => setConfirm(!confirm)}>Yes</div>
                <button>No</button>
              </div>
              {confirm ? (
                <div className="club-member-modal-confirm">
                  <div>
                    <input type="text" placeholder="Specify Position" required />
                  </div>
                  <div>
                    <button>Confirm</button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      </Scrollbars>
    </div>
  );
};

export default ClubMember;
