import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faXmark,
  faPodcast,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditProfile.css";

const EditProfile = ({ open, setOpen }) => {
  const [data, setData] = useState('');

  const [show, setShow] = useState(false);
  const [file, setFile] = useState("Images/girl.jpg");
  const [image, setImage] = useState(false);
  const [imgg, setImgg] = useState();
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
 

  // console.log(`prop : ${open}`);

  const handleClose = () =>{
    setOpen(false);
    uploadPic();


  } 
  const handleShow = () => setShow(true);
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImgg(e.target.files[0]);
    setImage(!image);
  }

  useEffect(()=>{
    if (url) {
     update(data);
    }
  },[url])

  useEffect(()=>{
    getUserDetails();
    updateDetail(data)
})

useEffect(()=>{
  handleClose()
},[])

  const update = async(data)=>{
    // console.log(data)
    let result = await fetch(`http://localhost:8000/updatePic/${data}`,{
      method:'put',
      body: JSON.stringify({url}),
      headers:{
          "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")

      }

  })

  result = await result.json();
 
  console.log(result)
  }


  const getUserDetails = async ()=>{
    // console.log(params)
    let result = await fetch(`http://localhost:8000/user/${data}`);
    result = await result.json();
setEmail(result.email);
setBio(result.bio);

}

  const updateDetail = async(data)=>{
    // console.log(data)
    let result = await fetch(`http://localhost:8000/updateDetail/${data}`,{
      method:'put',
      body: JSON.stringify({email,bio}),
      headers:{
          "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")

      }

  })

  result = await result.json();
 
  console.log(result)
  }


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
        console.log(data.url)
        setUrl(data.url);
        // console.log(data)
        // console.log(data.url)

      })
      .catch((err) => {
        console.log(err);
      });
  }


  

  useEffect(() => {
    getUser();
  },[]);
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result.email);
    setData(result._id);
    // if (result) {
    //   getUser();
    // }
  };

  return (
    <div>
      {open ? (
        <div style={{
            zIndex : '99999999'
        }}>
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>About </Form.Label>
                <Form.Control as="textarea" rows={3}
                 value={bio}
                 onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <div >
                  <label className="block">Profile Photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  style={{maxHeight:"250px",minHeight:"250px",width:"250px",margin:"0 auto"}}
                  >
                    {image ? (
                      <div >
                      <FontAwesomeIcon icon={faXmark}
                      onClick={()=>setImage(false)}
                      className="Edit-Profile-cancel"
                      />
                      <img src={file} style={{
                        maxHeight:"200px",minHeight:"200px",width:"200px",marginTop:"-25px"
                      }} />
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
                        <div className="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              onChange={handleChange}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
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
            <Button variant="primary" onClick={()=>{
              handleClose()
               updateDetail(data) 

            }}>
              Save Changes
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
