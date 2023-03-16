import React, { useState } from 'react'
import { faEnvelope,faAt,faBuildingColumns,faGraduationCap,faLightbulb,faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activities from './Activities';


function Detail() {
  const [skills , setSkills] = useState(["UI/UX", "Illustrator", "HTML", "CSS"]);

  const [count,setCount]=useState(0);
  
  function addSkills(){
    const enteredSkill =  prompt('please enter your skill');
    console.log(enteredSkill);

    setSkills((skills) => [...skills, enteredSkill])
  }

  return (
      <div className='detail'>

          {/* top */}
          <div className='detail-top'>
            <div style={{display:"flex",flexDirection:"row"}}>
              <FontAwesomeIcon style={{margin:"5px 10px 0 0",fontSize:'25px'}} icon={faEnvelope} />
              <div>Email:<p style={{marginTop:"5px"}}>ishabam09@gmail.com</p></div>
                
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
              <FontAwesomeIcon style={{margin:"5px 10px 0 0",fontSize:'25px'}} icon={faAt}/>
              <div>UNIQUE ID:<p style={{marginTop:"5px"}}>svvv123</p></div>    
            </div>
          </div>



          {/* Down */}
          <div className='detail-down'>
            <div>
              <div style={{display:"flex",flexDirection:"row"}}>
                <FontAwesomeIcon style={{margin:"5px 10px 0 0",fontSize:'25px'}} icon={faBuildingColumns} />
                <div>University:<p style={{marginTop:"5px"}}>Shri Vaishnav Vidyapeeth Vishwavidyalaya</p></div>
              </div>
            </div>
            <div>
              <div style={{display:"flex",flexDirection:"row"}}>
                <FontAwesomeIcon style={{margin:"5px 10px 0 0",fontSize:'25px'}} icon={faGraduationCap} />
                <div>Year:<p style={{marginTop:"5px"}}>4th</p></div>      
              </div>
            </div>
          </div>


            
          {/* Skills */}
          <div className='detail-bottom'>
            <div><FontAwesomeIcon style={{margin:"5px 10px 0 0",fontSize:'25px'}} icon={faLightbulb}/>Skills:</div>
              <div className='skills'>
                {
                  skills.map((a, i) => (
                  <span key={i}>
                  {a}
                  </span>
                  ))
                }
                <div className='skill-add' onClick={addSkills} >
                  <FontAwesomeIcon icon={faCirclePlus}/>
              </div> 
            </div>
          </div>


          {/* Sepration line */}
          <div className='line'></div>

          
           {/* Past post, resources, events */}
          
          <Activities/>
     </div>
  )
}

export default Detail