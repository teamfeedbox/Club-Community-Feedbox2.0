import { faEnvelope, faLockOpen, faPhone, faSchool, faSuitcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";

const SignupPage = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [phone,setPhone] = useState("");
const [college,setCollege] = useState("");
const [job,setJob] = useState("");


// useEffect(()=>{
//   const auth = localStorage.getItem('users');
  
// })


const collectData = async (e) => {
  e.preventDefault();
  console.log(name, email, password, phone, college, job);
 let result = await fetch('http://localhost:8000/register',{
  method:'post',       // post method because we want to save the data
  body:JSON.stringify({name,email,password,phone, college, job}),
  headers:{
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
  },

 })
 result = await result.json()
 console.log(result)
 localStorage.setItem('user',JSON.stringify(result));
 
}


  
  return (
    <div className="signup-page">
      <div className="signup-page-img">
        <img src="Images/signIn.png" alt="" />
      </div>
      <div className="signup-page-main">
        <form class="">
          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}} icon={faUser} />
            <div class="form-outline flex-fill mb-0">
              <input type="text" id="name" class="form-control" placeholder="Your Name" 
              required value={name} onChange={(e) => setName(e.target.value)} autoComplete="new-password"/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}} icon={faEnvelope} />
            <div class="form-outline flex-fill mb-0">
              <input type="email" id="email" class="form-control" placeholder="Your Email" 
              value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-password"/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}} icon={faLockOpen} />
            <div class="form-outline flex-fill mb-0">
              <input type="password" id="password" class="form-control" placeholder="Your Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}} icon={faPhone} />
            <div class="form-outline flex-fill mb-0">
              <input type="tel" id="contactNumber" class="form-control" placeholder="Your Contact Number"
              value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="new-password"/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}}  icon={faSchool} />
            <div class="form-outline flex-fill mb-0">
              <input type="text" id="university" class="form-control" placeholder="Your University"
              value={college} onChange={(e) => setCollege(e.target.value)} required autoComplete="new-password"/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <FontAwesomeIcon style={{'margin' : '10px'}}  icon={faSuitcase} />
            <div class="form-outline flex-fill mb-0">
              <input type="text" id="job" class="form-control" placeholder="Your Designation"
              value={job} onChange={(e) => setJob(e.target.value)} required autoComplete="new-password"/>
            </div>
          </div>

          {/* <div class="form-check d-flex justify-content-center mb-5">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example3c"
            />
            <label class="form-check-label" for="form2Example3">
              I agree all statements in <a href="#!">Terms of service</a>
            </label>
          </div> */}

          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" class="btn btn-primary btn-lg" onClick={collectData}  >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
