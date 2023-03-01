import React from 'react';
import "./landing.css";
import worldmap from "../../Images/landingworld.svg"
function Landing() {
  return (
    <div className='landing-container'>
        <div className='landing_head'>
            <div className='landing_head_left'>
                <div className='head'>
                    <b style={{backgroundColor:"#F06827",
                color:'white',
                padding:'10px 20px',
                marginRight:'20px'
                }}>Y</b>
                    <b>Startup School</b>
                </div>
                <p>
            
                Learn how to start a company,<br/> with help
                from the world's top<br/> startup accelerator -<br></br>
                Y Combinator.
                </p>
                <p style={{fontSize:"27px",marginTop:'30px'}}>
                <span style={{color:'#F06827',fontWeight:'500'}}>Startup School</span> is a free online course
                on how to start a startup.
                </p>
                <div className='lading-btn'>
                    <button className='signup-btn'>Signup</button>
                    <button className='signin-btn'>Signin</button>
                </div>
            </div>
            <div className='landing_head_right'>
            <img src={worldmap} alt="world map"></img>
            </div>
        </div>
        
    </div>
  )
}

export default Landing