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
  // const [updateSkills, setUpdateSkills] = useState([]);
  const [userId, setUserId] = useState('');

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
    
  }, []);

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
    setUserId(result._id)
  };


  const updateSkill = async(userId)=>{
    let result = await fetch(`http://localhost:8000/updateDetail/${userId}`,{
      method:'put',
      body: JSON.stringify({skills}),
      headers:{
          "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")

      }

  })

  result = await result.json();
  if(result){
    getUser()
  }
 
  // console.log(result)
  }
  

  
  const noRefCheck = ()=>{
// console.log(skills)
  }

  return (
    <>
    <div className='Overview-Container'>

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
              <p>{data && data.uniqueId}</p>
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
                onRemove={noRefCheck()}
                onSearch={function noRefCheck() {}}
                onSelect={onSelectNames}
                selectedValues={data && data.skills }
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
                // selectedValues={{}}
              />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{
            handleClose1()
            updateSkill(userId)
            }}>
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
              <span> {data && data.coins} </span>
              <p>Coins Collected</p>
            </div>
          </section>

          <section>
            <div className='Detail-icon Detail-icon6'>
            <img src="Images/Stars.png"></img>
            </div>
            <div className='Right-Sub'>
              <span> {data && data.events.length} </span>
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