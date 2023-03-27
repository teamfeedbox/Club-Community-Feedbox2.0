import React from 'react'
import { Carousel } from "react-responsive-carousel";
import  {useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import "./ProfilePost.css";

const ProfilePost = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newS,setNewS]=useState(false);
  return (
    <div>
     
        <div className="post-display">
          <div className="post-display-head">
            <div className="post-display-profile">
              <img src="Images/girl.jpg" alt="" />
            </div>
            <div className="post-display-heading">
              <p className="post-head" 
              onClick={()=>{setNewS(true)}}>Isha Bam</p>
              <div className="post-head-content" style={{ display: "flex" }}>
                <p className="post-display-heading-college">SVVV</p>
                <p className="post-display-heading-time">19 hours ago</p>
              </div>
            </div>
          </div>

          <div className="post-display-center">
            <div className="post-display-content">sasd fbgh   gfh</div>
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
              500
            </div>
            <div className="post-display-bottom-content">
              <img src="Images/message.svg" alt="" onClick={() => setShowModal(true)}/>
              100
            </div>
          </div>
        </div>
    


    </div>
  )
}

export default ProfilePost