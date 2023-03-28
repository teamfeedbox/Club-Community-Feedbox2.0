// import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useRef, useState, useEffect } from "react";
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

const PostDisplay = () => {
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
      {data.map((item, index) => (
        <div className="post-display1">
          <div className="post-display-head">
            <div className="post-display-profile">
              <img src="Images/girl.jpg" alt="" />
            </div>
            <div className="post-display-heading">

              

              <p className="post-head">{item && item.postedBy &&item.postedBy.name}</p>

              <div className="post-head-content" style={{ display: "flex" }}>
                <p className="post-display-heading-college">{item && item.postedBy &&item.postedBy.collegeName}</p>
                <p className="post-display-heading-time">19 hours ago</p>
              </div>
            </div>
          </div>

          <div className="post-display-center">
            <div className="post-display-content">{item.desc}</div>
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
            <div className="post-display-bottom-content">
              <img src="Images/heart.svg" alt="" />
              500
            </div>
            <Link to="/comment" className="post-display-bottom-content">
              <img src="Images/message.svg" alt="" 
              // onClick={() => setShowModal(true)}
              />
              100
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDisplay;
