import React from 'react';
import "./Landing.css";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Curriculum from './Curriculum';
=======
>>>>>>> 9c5aa865e1fcbe482a86a74796752eee022f8962
function Landing() {
  return (
    <div className='landing-container'>
        <div className='landing_head'>
            <div className='landing_head_left'>
                <div className='head'>
                    <b style={{backgroundColor:"#232234",
                color:'white',
                padding:'10px 20px',
                marginRight:'20px'
                }}>F</b>
                    <b>Feedbox School</b>
                </div>
                <p>
            
                Learn how to start a company, with help
                from the world's top startup accelerator -<br></br>
                <b>Y Combinator</b>.
                </p>
                <p className="landing-heaad-text">
                <span >Startup School</span> is a free online course
                on how to start a startup.
                </p>
                <div className='landing-btn-container'>
                    <Link to="/login" className='login-btn'>Log in</Link>
                    <Link to="/register" className='register-btn'>Register</Link>
                </div>
            </div>
            <div className='landing_head_right'>
            
         <img src='Images/landingworld.svg' alt="world map" 
            className='right-img'
            ></img> 
            </div>
        </div>
        <div className='landing-text'>
        Get advice based on 15 years of YC's knowledge, stay accountable for weekly progress, and find your co-founder.
        </div>


        {/* second section */}
        <div className='landing-second-section'>
            <b className='landing-second-head'>
            How Startup School works
            </b>
            <div className='landing-second'>
                <li className='landing-second-con'>Get the essential advice for ambitious startup
                     founders, taught by Y Combinator partners and 
                     industry leaders.
                </li>
                <li className='landing-second-con'>Go at your own pace. It will take approximately 
                    7 weeks if you spend 1-2 hours/week.
                </li>
            </div>
            <b className='landing-second-head'>
            Who is Startup School for?
            </b>
            <div className='landing-second'>
                <li className='landing-second-con'>It’s for anyone at the early stages of building
                     a startup, turning a side project into a company, 
                     or anyone curious to learn about becoming a founder.
                </li>
               
            </div>
        </div>
    </div>
  )
}

export default Landing