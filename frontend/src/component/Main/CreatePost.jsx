import React, { useState } from "react";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="CreatePost">
      <div className="create-post-profile">
        <img src="Images/girl.jpg" alt="" />
      </div>
      <div className="create-post-start" onClick={handleShow}>
        <div className="create-post-start-content">Start a post</div>
        <div className="create-post-start-content-icon">
          <FontAwesomeIcon
            className="fa-xl"
            style={{ margin: "0px 15px" }}
            icon={faImage}
          />
          <FontAwesomeIcon className="fa-xl" icon={faFaceSmile} />
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className='profile-section-overall'>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="modal-profile-section">
            <div className="modal-profile-section-image">
              <img src="Images/girl.jpg" alt="" />
            </div>
            <div className="modal-profile-section-content">
              <h5>Isha Bam</h5>
              <select name="type">
                <option value="public">Public</option>
                <option value="community">Community</option>
              </select>
            </div>
          </div>
          <textarea
            type="text"
            rows="5"
            className="modal-input"
            placeholder="what do you want to talk about ?"
          ></textarea>
          <img 
            src={file}  
            className={file ? 'image-chooosen-upload' : 'image-chooosen-upload image-chooosen-upload-display'}
            
          />
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="modal-footer-upload">
            <label for="files" class="btn">
              <FontAwesomeIcon
                icon={faImage}
                className="fa-xl"
              ></FontAwesomeIcon>
            </label>
            <input
              id="files"
              style={{ visibility: "hidden" }}
              type="file"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button variant="primary" onClick={handleClose}>
              Post
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
