import React from 'react';
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCoins, faEnvelope, faEnvelopeSquare, faGraduationCap, faIdCard, faStaffSnake, faStarHalfAlt, faUniversalAccess, faUniversity, faUserTag } from "@fortawesome/free-solid-svg-icons";
function Overview() {
  function callIt(){
    alert("Clicked")
  }
  return (
    <div className='Overview-Container'>
      <div className='Overview-Left'>
        {/* Custom Tag */}
        <p className='Overview-Left-P'>
          I converted Top MBA Calls in 2019, but decided upon continuing with
          my startup, Feedbox. We help businesses reach out to people through
          digital means and help them grow their online presence.
        </p>
        <div className='Overview-Detail'>
          <section>
            <div className='Detail-icon1'>
            <FontAwesomeIcon className="fa-lg" icon={faEnvelope} />
            </div>
            <div>
              <span>Email:</span>
              <p>xyzperson@gmail.com</p>
            </div>
          </section>
          <section>
            <div className='Detail-icon2'>
            <FontAwesomeIcon className="fa-lg" icon={faIdCard} />
            </div>
            <div>
              <span>Unique Id:</span>
              <p>2019SVV0565</p>
            </div>
          </section>
          <section>
            <div className='Detail-icon3'>
            <FontAwesomeIcon className="fa-lg" icon={faUniversity} />
            </div>
            <div>
              <span>University:</span>
              <p>Shri Vaishnav Vidyapeeth</p>
            </div>
          </section>
          <section>
            <div className='Detail-icon4'>
            <FontAwesomeIcon className="fa-lg" icon={faGraduationCap} />
            </div>
            <div>
              <span>Year:</span>
              <p>4th Year</p>
            </div>
          </section>
        </div>
        <div className='Overview-Skills'>
          <div className='Skills-Title'>Skills:</div>
          <div className='Overview-Sub-Skills'>
          <span className='Skills'>Graphics Designing</span>
          <span className='Skills'>Content Writing</span>
          <span className='Skills'>Search Engine Optimization</span>
          <span className='Skills'>Time Management </span>
          <span className='Add-Event' onClick={callIt}>
            <FontAwesomeIcon className="fa-lg" icon={faAdd} />
          </span>
          </div> 
        </div>
      </div>

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
        <div className='Add-Event1' onClick={callIt}>
        <FontAwesomeIcon className="fa-lg" icon={faAdd} />
        </div>
        </div>
        </section>        

        </div>    
      <div>

        </div>
      </div>
    </div>
  )
}

export default Overview