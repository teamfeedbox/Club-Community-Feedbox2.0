import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage, faXmark, } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FcDataBackup } from "react-icons/fc";
import axios from "axios"

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);
  const [textDisplay, setTextDisplay] = useState(false);

  const [image, setImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [scope, setScope] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  let count = 0;

  function handleChange(e) {
    if (file.length == 5) {
      setTextDisplay(true);
      setTimeout(() => {
        setTextDisplay(false);
      }, 5000);
    }

    let limit = file.length + e.target.files.length;
    for (let i = count; i < e.target.files.length && i < 5 && file.length < 5 && limit < 6; i++) {
      setFile((arr) => [...arr, URL.createObjectURL(e.target.files[i])]);
      setImage(arr => [...arr, e.target.files[i]]);
      count++;
    }

    if (e.target.files.length > 5 || limit >= 6) {
      setTextDisplay(true);
      setTimeout(() => {
        setTextDisplay(false);
      }, 3000);
    }
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    count--;
  }

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);
    setUser(result);
    
    // if (result) {
      //   getUser();
      // }
      console.log(`lihjcnok ${result}`);
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [loading]);

  const postDetails = () => {
    const promises = image.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "feedbox-community-web");
      // formData.append("cloud_name", "feedbox-community-web");
      return axios.post(
        "https://api.cloudinary.com/v1_1/feedbox-community-web/image/upload",
        formData
      );
    });
    Promise.all(promises)
      .then((responses) => {
        const urls = responses.map(
          (res) => res.data.secure_url
        );
        CreatePost(urls);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const CreatePost = (urls) => {
    const data = fetch("http://localhost:8000/create-post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        desc,
        scope,
        collegeName: user && user.collegeName,
        img: urls,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("error");
        } else {
          alert("Posted Successfully...")
          setImage([]);
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="CreatePost">
        <div className="create-post-profile">
          <img src={user && user.img} alt="" />
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
                <img src={user && user.img} alt="" />
              </div>
              <div className="modal-profile-section-content">
                {/* <h5>{JSON.parse(auth).name}</h5> */}
                <h5>{user && user.name}</h5>

                <select name="type" onChange={(e) => {setScope(e.target.value) }}>
                  <option disabled hidden selected value="Select">Select</option>
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
              <Button
                variant="primary"
                onClick={function (event) {
                  handleClose();
                  postDetails();
                }}
              >
                Post
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreatePost;
