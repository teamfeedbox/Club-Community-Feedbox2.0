import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faImage,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);
  const [textDisplay, setTextDisplay] = useState(false);

  console.log(`kjbdkvjbl${file}`);
  let count = 0;

  function handleChange(e) {
    console.log(e.target.files);
    if (file.length == 5) {
      setTextDisplay(true);
      setTimeout(() => {
        setTextDisplay(false);
      }, 5000);
    }

    let limit= file.length+e.target.files.length;
    for (let i = count; i < e.target.files.length && i < 5 && file.length < 5 && limit<6; i++) {
      console.log(e.target.files[i]);
      setFile((arr) => [...arr, URL.createObjectURL(e.target.files[i])]);

      count++;
      console.log(`count : ${count}`);
      console.log(`i: ${i}`);
    }

    if (e.target.files.length > 5 || limit>=6) {
      setTextDisplay(true);
      setTimeout(() => {
        setTextDisplay(false);
      }, 3000);
    }

    console.log(`size array : ${file.length}`);

    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
    count--;
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

      <Modal
        show={show}
        onHide={handleClose}
        className="profile-section-overall"
      >
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
            rows="3"
            className="modal-input"
            placeholder="what do you want to talk about ?"
          ></textarea>
          <div className="image-chooosen-upload-overall-div">
            {file.map((files, index) => (
              <div className="image-chooosen-upload-div">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="fa-xmark-circle-create-post"
                  onClick={() => deleteFile(index)}
                />
                {/* <button type="button" className="btn-close"></button> */}
                <img src={files} className="image-chooosen-upload" />
              </div>
            ))}
          </div>

          {textDisplay ? (
            <div className="error-text-create-post">
              **upto 5 images can be uploaded.
            </div>
          ) : (
            <div></div>
          )}
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
              accept="image/*"
              multiple
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
