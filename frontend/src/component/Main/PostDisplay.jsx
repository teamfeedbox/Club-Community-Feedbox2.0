// import React, { useEffect, useState } from "react";


import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";

import { FcLike,FcLikePlaceholder } from "react-icons/fc";

import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useRef, useState, useEffect,} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import Comment from "./Comment";
import "./PostDisplay.css";
import PostBigModel from "./PostBigModel";

const PostDisplay = () => {
 

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showAdd,setShowAdd]=useState('Hide-Comment-Add-Btn');
  const [showView,setShowView]=useState('Hide-Comment-View-Btn');

  const [showReplView, setReplyView] = useState("Hide-Reply-View");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [newS, setNewS] = useState(false);
  // const [afterSubmit,setAfterSubmit]=useState("");

  const [tempComment,setTempComment]=useState('');
  const [tempReply,setTempReply]=useState('');
  const[showreply,setShowReply]=useState(false);

  // To open the Comment Model
  const[openComment,setOpenComment]=useState(false);

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


  function handleView() {
    if (showView == "Show-Comment-View-Btn") {
      setShowView("Hide-Comment-View-Btn");
    } else {
      setShowView("Show-Comment-View-Btn");
    }
  }
  function handleFormSubmit(event) {
    event.preventDefault();

    if (tempComment != "") {
      setComments((comment) => [...comment, tempComment]);
      // console.log(tempComment)
      setTempComment("");
    }
  }
  function handleAfterReply(event) {
    event.preventDefault();
    if (tempReply != "") {
      setReply(tempReply);
    }
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
  

  useEffect(() => {
 
    getList();
    getUser();
  });



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

  const [user, setUser] = useState();


  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
    setUser(result._id);
    // if (result) {
    //   getUser();
    // }
  };

  const like = (id) => {
    fetch("http://localhost:8000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlike = (id) => {
    fetch("http://localhost:8000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {data.map((item, index) => (
        <div className="post-display1">
          <div className="post-display-head">
            <div className="post-display-profile">
              <img src="Images/girl.jpg" alt="" />
            </div>
            <div className="post-display-heading">
              <p className="post-head">
                {item && item.postedBy && item.postedBy.name}
              </p>

              <div className="post-head-content" style={{ display: "flex" }}>
                <p className="post-display-heading-college">
                  {item && item.postedBy && item.postedBy.collegeName}
                </p>
                <p className="post-display-heading-time">{item.date}</p>
              </div>
            </div>
          </div>

          <div className="post-display-center">
            <div className="post-display-content">{item.desc}</div>
            <div className="post-display-image ">
              {/* *****************carousel for mobile view********************* */}
              <div className="post-display-carousel-mobileview">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                  
                >
                  <SwiperSlide>
                    <img className="display-img" src="Images/alumni1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="display-img" src="Images/alumni1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="display-img" src="Images/alumni1.jpg" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* *********************carousel for web view*************************** */}
            <div className="post-display-image flex justify-center">
              <div className="post-display-carousel-webview flex justify-center">
                <Carousel
                  thumbWidth={60}
                  width={380}
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

          <div className="post-display-bottom">
            {item.likes.includes(user) ? (
              <div className="post-display-bottom-content">
                <FcLike
                 size={25}
                  onClick={function () {
                    unlike(item._id);
                    // unlike(item._id);
                  }}
                />
                {/* <FcLike size={25}  onClick={function () {
                like(item._id);
                // unlike(item._id);
              }}/> */}

                {item.likes.length}
              </div>
            ) : (
              <div className="post-display-bottom-content">
                {/* <FontAwesomeIcon className="fa-lg" icon={faHeart} style={{color:"red"}}/> */}
                <FcLikePlaceholder
                  size={25}
                  onClick={function () {
                    like(item._id);
                    // unlike(item._id);
                  }}
                />

                {item.likes.length}
              </div>
            )}

           
            <button onClick={()=>setOpenComment(!openComment) } className="post-display-bottom-content">
              <img src="Images/message.svg" alt="" 
              />
              100
            </button>
          </div>
        </div>
        
      ))}
      <PostBigModel 
            openComment={openComment}
            setOpenComment={setOpenComment}
      />
       
    </div>
  );
  
  }
export default PostDisplay;
