import React, { useEffect } from 'react'
import { Carousel } from "react-responsive-carousel";
import  {useState } from "react";
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
import "./ProfilePost.css";

const ProfilePost = (prop) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newS,setNewS]=useState(false);

const[post,setPost] = useState([]);

useEffect(()=>{
  myPost();
},[])

const myPost = async()=>{
  let result = await fetch("http://localhost:8000/myPost", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  result = await result.json();
  // console.log(result);
  setPost(result);
}


  return (


    <div>
      
     {
      
      post.map((item)=>
      <div className="post-display">
      <div className="post-display-head">
        <div className="post-display-profile">
          <img src="Images/girl.jpg" alt="" />
        </div>
        <div className="post-display-heading">
          <p className="post-head" 
          onClick={()=>{setNewS(true)}}>{item && item.postedBy && item.postedBy.name}</p>
          <div className="post-head-content" style={{ display: "flex" }}>
            <p className="post-display-heading-college">{item && item.postedBy && item.postedBy.collegeName}</p>
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
              className="ml-auto mr-auto "
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
          {item.likes.length}
        </div>
        <Link to="/ProfileComment" className="post-display-bottom-content">
          <img src="Images/message.svg" alt="" 
          // onClick={() => setShowModal(true)}
          />
          100
        </Link>
      </div>
    </div>

      )
     }
        
    


    </div>

    
  )
}

export default ProfilePost