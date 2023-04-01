import React, { useState,useEffect } from 'react';
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCirclePlus, faCoins,faRightFromBracket, faEnvelope, faEnvelopeSquare, faGraduationCap, faIdCard, faStaffSnake, faStarHalfAlt, faUniversalAccess, faUniversity, faUserTag } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";

const backColor = ['#EDC7E2', '#C7EDCF','#EDE7C7', '#EDC7C7', '#B5A6E1', '#B4B4B4', '#72C4FF', '#e9f5db', '#fad643' ,'#E3B47C' ]

const fColor = ['#9B0483', '#2AA100', '#A67904', '#A10000', '#5C0684', '#363636', '#035794', '#718355', '#76520E', '#744E37']


function Overview(prop) {
  const [skills,setSkills]=useState([])

  const [showModal, setShowModal] = useState(false);
  const [profileSubmit,SetProfileSubmit]=useState(false);
  const [email,setEmail]=useState("");
  // for edit profile
  const [show, setShow] = useState(false);
  // for skills
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [value,setValue]=useState("")

  const [file, setFile] = useState('Images/girl.jpg')
  const [image, setImage] = useState(false);
  // const [skills, setSkills] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function callIt(){
    const newSkill=prompt("Enter New Skill");
    if(newSkill!="")
    {
    setSkills((skills)=>[...skills,newSkill]);
    }
  }  

  function updateProfile(){
      setValue("")
  }

  function getChanges(){

  }

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(!image);
  }
    
  let onSelectNames = (skills) => {
    setSkills(skills);
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/');
    localStorage.clear();
  };


  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
  };

  

  return (
    <>
    <div className='Overview-Container'>
        {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group>
            <div>
              <label className="block">
                Profile Photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {image ? 
                <img src={file} />
                :
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="True">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input onChange={handleChange}
                       id="file-upload" name="file-upload" type="file" className="sr-only"/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>}
              </div>
            </div>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}



      <div className='Overview-Left'>
        {/* Custom Tag */}

        <form onSubmit={updateProfile}>
          {
            profileSubmit?
            (
            <textarea className='Overview-Left-input'
            rows="3"
            placeholder=''
            // value={value
            onChange={getChanges}
            >
              
            </textarea>
            )
            :
            <p className='Overview-Left-P' onClick={() => SetProfileSubmit(true)}>
            {
              data && data.bio
            }
            </p>
          }
        
        <div className='Overview-Detail'>
          <section>
            <div className='Detail-icon1'>
            <FontAwesomeIcon className="fa-lg" icon={faEnvelope} />
            </div>
            <div className='Profile-Edit-Mail'>
              <div>
                <span>Email:</span>
                
                { 
                  profileSubmit?
                  (
                  <input className='Overview-Left-input Overview-Left-input1'
                  // rows="3"
                  placeholder=''
                 
                  onChange={getChanges}
                  >
                  </input>
                  )
                  :
                  <p className='Overview-Left-P' onClick={() => SetProfileSubmit(true)}>
                  {
                    data && data.email
                  }
                  </p>
                }
               
              </div>
              {
                profileSubmit?(
                <button type="submit" 
                
                >Save</button>
                ):null
              }
            </div>
          </section>
          
          
          
          <section>
            <div className='Detail-icon2'>
            <FontAwesomeIcon className="fa-lg" icon={faIdCard} />
            </div>
            <div>
              <span onClick={handleShow}>Unique Id: </span>
              <p>2019SVV0565</p>
            </div>
          </section>
          <section>
            <div className='Detail-icon3'>
            <FontAwesomeIcon className="fa-lg" icon={faUniversity} />
            </div>
            <div>
              <span>University:</span>
              <p>{data && data.collegeName}</p>
            </div>
          </section>
          <section>
            <div className='Detail-icon4'>
            <FontAwesomeIcon className="fa-lg" icon={faGraduationCap} />
            </div>
            <div>
              <span>Year:</span>
              <p>{data && data.collegeYear}</p>
            </div>
          </section>
        </div>
        </form>
        <div className='Overview-Skills'>
          <div className='Skills-Title'>Skills:</div>
          <div className='Overview-Sub-Skills'>
            {
              data && data.skills && data.skills.map((data,index)=>(
                <span style={{ background: backColor[index] , color: fColor[index] }} key={index} className='Skills'>{data}</span>
              ))
            }
          <span className='Add-Event' onClick={handleShow1}>
            <FontAwesomeIcon className="fa-lg" icon={faAdd} />
          </span>
          </div> 
        </div>
 {/* ********************************************logout***************************************** */}
        {/* <button 
        className='text-white bg-red-600 text-[1.2rem] p-2 mt-3 rounded hover:bg-red-700 ease-in duration-100	ml-5 lg:ml-0 '
        onClick={logoutHandler}>
          Logout <FontAwesomeIcon icon={faRightFromBracket}  />
        </button> */}

      </div>

{/* modal to add skills */}

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Multiselect
                value={skills}
                onChange={(e) => console.log()}
                // onChange={(e)=>setSkills[...skills,e.target.value]}
                placeholder="Add Skill"
                // style={{paddingLeft:"50px"}}
                displayValue=""
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={onSelectNames}
                options={[
                  "Web Development",
                  "App Development",
                  "SEO",
                  "Linkedin Optimization",
                  "Graphic Design",
                  "Video Editing",
                  "Time Management",
                  "Digital Marketing",
                  "Content Writing",
                  "Ads",
                ]}
                selectedValues={{}}
              />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose1}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
     







     
      <div className='Overview-Right'>
        <div className='Overview-Right-Statistics'>
          <h5>
            Community Statistics:
          </h5>
          <div className='statistics'>
          <section>
            <div className='Detail-icon5'>
              <img src="Images/Money.png"></img>
            </div>
            <div className='Right-Sub'>
              <span>40</span>
              <p>Coins Collected</p>
            </div>
          </section>

          <section>
            <div className='Detail-icon Detail-icon6'>
            <img src="Images/Stars.png"></img>
            </div>
            <div className='Right-Sub'>
              <span>05</span>
              <p>Sessions Attended</p>
            </div>
          </section>
          </div>
        </div>  
        
        <div className='Overview-Right-Statistics Overview-Right-Statistics1'>
        <h5>
          Enrolled Sessions:
          <div></div>
        </h5>
        <section className='Enrolled-Section'>
        
        <div className='Sessions-Section'>
        <div style={{color:"#848283"}}>TUE</div>
        <div style={{color:"#010001"}}>21 March</div>
        <div style={{color:"#ff5a5f"}}>ONLINE</div>
        </div>
        <div className='Sessions-Section'>
        <div style={{color:"#848283"}}>TUE</div>
        <div style={{color:"#010001"}}>21 March</div>
        <div style={{color:"#ff5a5f"}}>ONLINE</div>
        </div>
        <div className='Sessions-Section'>
        <div style={{color:"#848283"}}>TUE</div>
        <div style={{color:"#010001"}}>21 March</div>
        <div style={{color:"#ff5a5f"}}>ONLINE</div>
        </div>

        <div className='Sessions-Section'>
        <div style={{color:"#848283"}}>TUE</div>
        <div style={{color:"#010001"}}>21 March</div>
        <div style={{color:"#ff5a5f"}}>ONLINE</div>
        </div>
        <div className='Add-Event-Cont'>
        <div className='Add-Event1' >
        <FontAwesomeIcon className="fa-lg" icon={faAdd} />
        </div>
        </div>
        </section>        

        </div>    
      <div>

        </div>
      </div>
    </div>

    </>
  )
}

export default Overview