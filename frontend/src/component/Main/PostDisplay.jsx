import React, { useEffect, useState } from "react";
import "./PostDisplay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Scrollbars } from "react-custom-scrollbars";


const PostDisplay = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAdd,setShowAdd]=useState('Hide-Comment-Add-Btn');
  const [showView,setShowView]=useState('Hide-Comment-View-Btn');
  
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

  useEffect(() => {
    // const getList = async (e) => {
    //   //  e.preventDefault();
    //   let result = await fetch("http://localhost:8000/getAllPost",{
    //   headers:{
    //     "Authorization":"Bearer "+localStorage.getItem("jwt")
    //   }
    // });
    //   result = await result.json();
    //   // console.log(result)
    //   setData(result);
    //   // if(result.desc)
    //   // {
    //   //   getList();
    //   // }
    // };
    getList();
  });

  // const getList = async (e) => {
  //   //  e.preventDefault();
  //   let result = await fetch("http://192.168.1.42:8000/getAllPost");
  //   result = await result.json();
  //   console.log(result)
  //   setData(result);
  //   // if(result.desc)
  //   // {
  //   //   getList();
  //   // }
  // };

  const getList = async (e) => {
    //  e.preventDefault();
    let result = await fetch("http://localhost:8000/getAllPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    setData(result);
    if (result.desc) {
      getList();
    }
  };

  return (
    <div>
      {showModal ? (
        <>
          <div className="Post-Big-Model-container">
            {/* to close the model on click outof the post section */}
            <div
              className="Post-Big-Model-Close"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="Post-Big-Model">
              {/* Left side */}
              <section className="Post-Big-Model-Left">
                <img src="Images/alumni2.jpg" alt="image1"></img>
              </section>

              {/* Right side */}
              <section className="Post-Big-Model-Right">
                <div className="Post-Big-Model-Profile">
                  <div className="Post-Big-Pro">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img src="Images/alumni1.jpg" alt="profile image"></img>
                      <div className="Post-Big-Title">
                        <div className="Post-Big-Title1">Aditya Pandey</div>
                        <div className="Post-Big-Title2">Feedbox Member</div>
                      </div>
                    </div>
                    <div className="Cancel-Icon-Container">
                      <FontAwesomeIcon className="fa-lg" icon={faXmark} onClick={() => setShowModal(false)} />
                    </div>
                  </div>
                  {/* Description */}
                  <div className="Post-Big-Description">
                    MIUI 14 is the latest version of Xiaomi's custom Android
                    operating system, featuring a refreshed design and new
                    features.
                  </div>
                </div>

                {/* Line to seprate pofile and comment */}
                <div className="Post-Big-Line"></div>

                {/* Comment part */}
                <div className="Post-Big-Comment">
                <Scrollbars className="Scrollbar-height" style={{height:"49vh"}}>
                  {/* Comment 1 */}
                  <section className="Post-Comment-About">
                    <div className="Comment-Left">
                      <img src="Images/alumni2.jpg "></img>
                    </div>
                    <div className="Comment-Right">
                      <div className="Comment-Right-Top">
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
                      <div className="Comment-Right-Down">
                        <span className="Comment-Down-Other">22h</span>
                        <span className="Comment-Down-Other Comment-Down-Other1 " onClick={handleReply}>
                          reply 
                        </span>
                      </div>
                      <div className={showAdd}>
                        <form>
                      <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                        <div
                          className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          
                        </div>
                        <textarea
                          id="chat"
                          rows="1"
                          className="block mx-2 p-2.5 w-full text-sm text-green-600 bg-gray rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add a comment..."
                        ></textarea>
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


                  {/* Comment 2 */}
                  <section className="Post-Comment-About">
                    <div className="Comment-Left">
                      <img src="Images/alumni2.jpg "></img>
                    </div>
                    <div className="Comment-Right">
                      <div className="Comment-Right-Top">
                        <div className="Comment-Right-User-Name">
                          Random Person
                        </div>
                        <div className="Right-Comment">
                          How many times were you frustrated while looking out
                          for a good collection of programming/algorithm
                          /interview questions? What did you expect and what did
                          you get? This portal has been created to
                        </div>
                      </div>
                      <div className="Comment-Right-Down">
                        <span className="Comment-Down-Other">22h</span>
                        <span className="Comment-Down-Other Comment-Down-Other1 " onClick={handleReply}>
                          reply 
                        </span>
                      </div>
                      <div className={showAdd}>
                        <form>
                      <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                        <div
                          className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          
                        </div>
                        <textarea
                          id="chat"
                          rows="1"
                          className="block mx-2 p-2.5 w-full text-sm text-green-600 bg-gray rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add a comment..."
                        ></textarea>
                        <button
                          type="submit"
                          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        >
                         <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>

                        </button>
                      </div>
                    </form>
                      
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
                    </div>

                  </section>
                  {/* Comment 3 */}
                  <section className="Post-Comment-About">
                    <div className="Comment-Left">
                      <img src="Images/alumni2.jpg "></img>
                    </div>
                    <div className="Comment-Right">
                      <div className="Comment-Right-Top">
                        <div className="Comment-Right-User-Name">
                          Random Person
                        </div>
                        <div className="Right-Comment">
                          How many times were you frustrated while looking out
                          for a good collection of programming/algorithm.
                        </div>
                      </div>
                      <div className="Comment-Right-Down">
                        <span className="Comment-Down-Other">22h</span>
                        <span className="Comment-Down-Other Comment-Down-Other1">
                          reply
                        </span>
                      </div>

                      
                    </div>

                    
                  </section>
                  {/* Comment 4 */}
                  <section className="Post-Comment-About">
                    <div className="Comment-Left">
                      <img src="Images/alumni2.jpg "></img>
                    </div>
                    <div className="Comment-Right">
                      <div className="Comment-Right-Top">
                        <div className="Comment-Right-User-Name">
                          Random Person
                        </div>
                        <div className="Right-Comment">
                          How many times were you frustrated while looking
                        </div>
                      </div>
                      <div className="Comment-Right-Down">
                        <span className="Comment-Down-Other">22h</span>
                        <span className="Comment-Down-Other Comment-Down-Other1">
                          reply
                        </span>
                      </div>
                      <div className="Comment-Right-View-Reply">
                        ---- View Reply
                      </div>
                    </div>
                  </section>
                  </Scrollbars>
                </div>

                <div className="Post-Big-Comment-Container">
                  <div className="Post-Big-Comment-Icons">
                    <span>
                      <spna>
                        <FontAwesomeIcon
                          className="fa-lg"
                          icon={faHeart}
                          style={{ margin:
                            "0px 5px 0 10px",color:"black",cursor:"pointer"}}
                        />
                      </spna>
                      <spna>200 Likes</spna>
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
                    <form>
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
                        <textarea
                          id="chat"
                          rows="1"
                          className="block mx-2 p-2.5 w-full text-sm text-green-600 bg-gray rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add a comment..."
                        ></textarea>
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
      ) : null}





      {data.map((item, index) => (
        <div className="post-display">
          <div className="post-display-head">
            <div className="post-display-profile">
              <img src="Images/girl.jpg" alt="" />
            </div>
            <div className="post-display-heading">
              {/* <h3>{item.postedBy.name}</h3>   */}
              {/* <p>{item.postedBy.collegeName}</p> */}
            </div>
          </div>
          <div className="post-display-center">
            <div className="post-display-content">{item.desc}</div>
            <div className="post-display-image">
              <img src={item.img} alt="" />
            </div>
          </div>
          <div className="post-display-bottom">
            <img src="Images/heart.svg" alt="" />
            <img
              src="Images/message.svg"
              alt=""
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default PostDisplay;
