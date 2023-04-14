import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditProfile.css";

const EditProfile = ({ Userbio,Username,Useryear, open, setOpen }) => {
  const role = JSON.parse(localStorage.getItem("user")).role;
  // const [dataChanges, setDataChanges] = useState('nnnnn');
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("Images/girl.jpg");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgg, setImgg] = useState();
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [collegeYear, setCollegeYear] = useState("");

  const [bio, setBio] = useState('');

  
  const handleClose = () => {
    setOpen(false);
    setImage(false)
    // uploadPic();
    setBio(Userbio);
    setName(Username);
    setCollegeYear(Useryear);
  };

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImgg(e.target.files[0]);
    setImage(!image);
  }

  useEffect(() => {
    getUserDetails();
    getUser();
    if (url) {
      update(data);
    }
  }, [data,url]);

  const update = async (data) => {
    // console.log(data)
    let result = await fetch(`http://localhost:8000/updatePic/${data}`, {
      method: "put",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    result = await result.json();

    console.log(result)
  };

  const getUserDetails = async () => {
    // console.log(params)
    let result = await fetch(`http://localhost:8000/user/${data}`);
    result = await result.json();
    setEmail(result.email);
  };

  const updateDetail = async (data) => {
    console.log(collegeYear, name, bio);
    // console.log(data)
    setLoading(true);
    let result = await fetch(`http://localhost:8000/updateDetail/${data}`, {
      method: "put",
      body: JSON.stringify({ bio,name, collegeYear }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    result = await result.json();

    setLoading(false);
    setOpen(false);
  
  };


// update(data);
  const uploadPic  = ()=>{
    const data = new FormData();
    data.append("file", imgg);
    data.append("upload_preset", "feedbox-community-web");
    data.append("cloud_name", "feedbox-community-web");
    fetch(
      "https://api.cloudinary.com/v1_1/feedbox-community-web/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data.url)
        setLoading(false);
        setOpen(false);
        alert("Profile updated successfully!");
        window.location.href="/profile"
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(result);
    setData(result._id);
    setBio(bio === '' ? result.bio : bio);
    setName(name === '' ? result.name : name);
    setCollegeYear(collegeYear === '' ? result.collegeYear : collegeYear);
    // if(bio===''){
    //   setBio(result.bio)
    // }
    // if(name===''){
    //   setName(result.name)
    // }
    // if(collegeYear===''){
    //   setCollegeYear(result.collegeYear)
    // }
  };

  

  return (
    <div>
      {open ? (
        <div
          style={{
            zIndex: "99999999",
          }}
        >
          <Modal show={open}>
            <Modal.Header>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
              {role === 'Super_Admin'? '' :<Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
                }

                {role === 'Super_Admin'? '' : <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Year </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCollegeYear(e.target.value)}
                    value={collegeYear}
                  />
                </Form.Group>
                }

                {role === 'Super_Admin'? '' :<Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>About </Form.Label>
                  <Form.Control
                    as="textarea"
                    // rows={3}
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  />
                </Form.Group>}

                <Form.Group>
                  <div>
                    <label className="block">Profile Photo</label>
                    <div
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      style={{
                        maxHeight: "200px",
                        minHeight: "200px",
                        width: "250px",
                        margin: "0 auto",
                      }}
                    >
                      {image ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setImage(false)}
                            className="Edit-Profile-cancel"
                          />
                          <img
                            src={file}
                            alt=""
                            style={{
                              maxHeight: "175px",
                              minHeight: "175px",
                              width: "200px",
                              marginTop: "-35px",
                            }}
                            className="object-cover	"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="True"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600  justify-center">
                            <label
                              for="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span className="flex justify-center">
                                Upload a file
                              </span>
                              <input
                                onChange={handleChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only "
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">
              {loading ? (
                <div
                  className="spinner-border text-white"
                  role="status"
                  style={{ height: "15px", width: "15px" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Button
                  
                  onClick={() => {
                    // handleClose();
                    updateDetail(data);
                    //  update(data)
                    uploadPic();
                  }}
                >
                  Save Changes
                </Button>
              )}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditProfile;