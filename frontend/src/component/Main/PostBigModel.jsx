import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import {Link} from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



function PostBigModel() {
    const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showAdd,setShowAdd]=useState('Hide-Comment-Add-Btn');
  const [showView,setShowView]=useState('Hide-Comment-View-Btn');

  const [showReplView,setReplyView]=useState('Hide-Reply-View')
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [newS,setNewS]=useState(false);
  // const [afterSubmit,setAfterSubmit]=useState("");

  const [tempComment,setTempComment]=useState('');
  const [tempReply,setTempReply]=useState('');
  const[showreply,setShowReply]=useState(false);

  const [reply,setReply]=useState('');
  const [comment,setComments] = useState([" How many times were you frustrated while looking out for a good collection of programming/algorithm /interview q", 
  "How many times were you frustrated while looking out for a good collection of programming/algorithm /interview questions? What did you expect and what did you get? This portal has been created to", 
  "How many times were you frustrated while looking out for a good collection of programming/algorithm.",
"How many times were you frustrated while looking"]);
function handleReply(){
    if(showAdd=="Show-Comment-Add-Btn")
    {
    setShowAdd('Hide-Comment-Add-Btn')
    }
    else
    {
      setShowAdd('Show-Comment-Add-Btn') 
    }
  }

  function handleView(){
    if(showView=="Show-Comment-View-Btn")
    {
    setShowView('Hide-Comment-View-Btn')
    }
    else
    {
      setShowView('Show-Comment-View-Btn') 
    }
  }
  function handleFormSubmit(event){
    event.preventDefault();

    if(tempComment!="")
    {
    setComments((comment) => [...comment, tempComment]);
    // console.log(tempComment)
    setTempComment("");
    }
  }
  function handleAfterReply(event){
    event.preventDefault();
    if(tempReply!="")
    {
      setReply(tempReply);
    }  
  }

  function showRep(){
    if(tempReply!="")
    {
      setReplyView("Show-Reply-View");
      setShowAdd("Hide-Comment-Add-Btn");
    }    
  }



  return (
    <>
          <div className="Post-Big-Model-container">
            {/* to close the model on click outof the post section */}
            <Link to="/main"
              className="Post-Big-Model-Close"
              
            ></Link>

            <div className="Post-Big-Model1">
              
              {/* Left side */}
        <div className="post-display2">
          <div className="post-display-center1">
            <div className="post-display-image ">
              </div>
              
              {/* *********************carousel for web view*************************** */}
              <div className="post-display-image flex justify-center">
              <div className="post-display-carousel-webview1 flex justify-center">
                <Carousel
                  thumbWidth={60}
                  className="w-[30vw]"
                  autoPlay
                  interval="5000"
                  infiniteLoop={true}

                  
                >
                  <div>
                    <img className="display-img" src="Images/alumni1.jpg" />
                  </div>
                  <div>
                    <img className="display-img" src="Images/alumni2.jpg" />
                  </div>
                  <div>
                    <img className="display-img" src="Images/alumni3.jpg" />
                  </div>
                  <div>
                    <img className="display-img" src="Images/l1.jpg" alt="" />
                  </div>
                  <div>
                    <img className="display-img" src="Images/l3.png" alt="" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

        </div>
      {/* </section> */}

              {/* Right side */}
              <section className="Post-Big-Model-Right">
                <div className="Post-Big-Model-Profile">
                  <div className="Post-Big-Pro">
                    <div style={{ display: "flex", flexDirection: "row",height:"fit-content",width:"95%" }}>
                      <div className="Post-Big-Pro-img">
                      <img src="Images/alumni2.jpg" alt="profile image"></img>
                      </div>
                      <div className="Post-Big-Title">
                        <div className="Post-Big-Title1">Isha Bam</div>
                        <div className="Post-Big-Title2">Feedbox Member</div>
                      </div>
                    </div>
                    <Link to="/main" className="Cancel-Icon-Container">
                      <FontAwesomeIcon className="fa-lg" icon={faXmark} onClick={() => setShowModal(false)} />
                    </Link>
                  </div>
                  {/* Description */}
                  <div className="Post-Big-Description">
                    MIUI 14 is the latest version of Xiaomi's custom Android
                    operating system, featuring a refreshed design and new
                    features.
                  </div>
                </div>

                {/* Line to seprate pofile and comment */}
                {/* <div className="Post-Big-Line"></div> */}

                {/* Comment part */}
                <div className="Post-Big-Comment">
                <Scrollbars className="Scrollbar-height" >
                  {/* Comment 1 */}
                  {
                    comment.map((data)=>(

                      <section className="Post-Comment-About">
                    
                      {/* Left part */}
                      <div className="Comment-Left">
                        <img src="Images/bandar.jpeg"></img>

                      </div>
                      
                      {/* Right part */}
                      <div className="Comment-Right">
  
                        <div className="Comment-Right-Top">
                          <div className="Comment-Right-User-Name">
                            Random Person
                          </div>
                          <div className="Right-Comment">
                          {data}
                          </div>
                        </div>
                        <div className="Comment-Right-Down">
                          <span className="Comment-Down-Other">22h</span>
                          <span className="Comment-Down-Other Comment-Down-Other1 " onClick={handleReply}>
                            reply 
                          </span>
                        </div>
                        <div className={showReplView}>
                          <div className="Comment-Right-User-Name">
                            Random Person
                          </div>
                          <div className="Right-Comment">
                            {
                             reply
                            }
                          </div>
                        </div>
                        <div className={showView}>
                        <div className="Comment-Right-User-Name">
                          Random Person
                        </div>
                        <div className="Right-Comment">
                          How many times were you frustrated while looking out
                          for a good collection of programming/algorithm
                          /interview questions? What did you expect and what did
                          you get? This portal has been created to provide well
                          written, well thought and well explained solutions for
                          selected questions.
                        </div>
                    </div>
                        <div className="Comment-Right-View-Reply" onClick={handleView}>
                        ---- View Reply
                      </div>
                        <div className={showAdd}>
                          <form onClick={handleAfterReply}>
                        <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                          <div
                            className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            
                          </div>
                          <input
                            className="block border-solid  mx-2 p-2.5 w-full text-sm text-green-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
                            placeholder="Add a comment..."
                            onChange={(event)=>
                              setTempReply(event.target.value)
                            }
                          
                          ></input>
                          <button onClick={()=>(showRep, setShowReply(true))}
                            type="submit"
                            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                          >
                           <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
  
                          </button>
                        </div>
                      </form>
                        
                      </div>
                      
                      </div>  
                    </section>
                    ))
                  }
                </Scrollbars>
                </div>

                <div className="Post-Big-Comment-Container">
                  <div className="Post-Big-Comment-Icons">
                    <span>
                      <span>
                        <FontAwesomeIcon
                          className="fa-lg"
                          icon={faHeart}
                          style={{ margin:
                            "0px 5px 0 10px",color:"black",cursor:"pointer"}}
                        />
                      </span>
                      <span>200 Likes</span>
                    </span>
                    <span>
                      <span>
                        <FontAwesomeIcon
                          className="fa-lg"
                          icon={faMessage}
                          style={{ margin: "0px 5px 0 20px",color:"black"}}
                        />
                      </span>
                      <span>50 Comments</span>
                    </span>
                  </div>


                  <div className="Comment-Add-Section">
                    <form onSubmit={handleFormSubmit}>
                      <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                        <div
                          className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          <img src="Images/alumni2.jpg"
                            aria-hidden="true"
                            class="w-10 h-8
                            p-0
                            rounded-full
                            "
                          >
                          </img>
                        </div>
                        <input
                          className="block mx-2 p-2.5 w-full text-sm rounded-lg border text-black" style={{border:"2px solid black"
                          }}
                          placeholder="Add a comment..."
                          onChange={(event)=> 
                            setTempComment(event.target.value)
                          }
                          // value={afterSubmit}
                        ></input>
                        <button
                          type="submit"
                          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        >
                         <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
  )
}

export default PostBigModel