import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  //   useEffect(()=>{
  //     const auth = localStorage.getItem('users'); // this is done to prevent going to login page again using url
  //     if(auth)
  //     {
  //         navigate('/signup')
  //     }
  // },[])


    const loginHandle = async (e) => {
      e.preventDefault();
      console.log( email, password);

      //this is called login api integration which is created in backend index.js file
      let result = await fetch('http://localhost:8000/login',{
          method:'post',
          body: JSON.stringify({email,password}),
          headers:{
              "Content-Type":"application/json"
          }
      });
      result = await result.json();
      console.log(result)
      console.log("first")

      if(result.name){
          localStorage.setItem('users',JSON.stringify(result));
          // navigate('/signup')
          alert("welcome")
      }
      else{
          alert("Please enter valid login credentials")
      }
  }



  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-main-page">
        <p>Welcome to your professional community</p>
        <form action="">
          <div className="login-input">
            <input type="email" required placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-input">
            <input
              type={eye ? "text" : "password"}
              required
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => {
                setEye(!eye);
              }}
              style={{'margin' : '8px'}}
            >
              {eye ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          <button type="submit" onClick={loginHandle}>Sign in</button>
        </form>
        <button className="joinnow-login-button" onClick={() => navigate('/signup')}>New to LinkedIn? Join now</button>
       
      </div>
      <div className="login-image">
        <img src="Images/loginImage.png" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
