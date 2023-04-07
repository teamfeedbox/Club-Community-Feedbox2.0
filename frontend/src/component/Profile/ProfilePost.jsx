import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import ProfileBigModel from "./ProfileBigModel";

const ProfilePost = (prop) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newS, setNewS] = useState(false);
  const [id, setId] = useState("");

  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false)

  // <------------ To show and hide comment model--------------->
  const [openComment,setOpenComment]=useState(false);


  useEffect(() => {
    myPost();
  }, []);

  const myPost = async () => {
    let result = await fetch("http://localhost:8000/myPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);  
    setPost(result);
  };


  const deletePost = async(id)=>{
    // console.log(id)
    let result = await fetch(`http://localhost:8000/deletePost/${id}`, {
      method: "delete",
    });

    result = await result.json();
    console.log(result)


    if (result) {
      myPost();
    }
  }

  return (
    <div>
      {post.length>0 && post.map((item) => (
        <div className="post-display">
          <div className="flex justify-between">
            <p className="post-display-heading-time"> Posted</p>
            <div>
              <div 
              onClick={() => {setOpen(!open)}}
              className=" w-7 h-7 rounded-full hover:bg-blue-200 transition-all duration-100">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="mx-[11.5px]"
                />
              </div>
               { open && <div
                class=" absolute   bg-white/40 rounded-lg shadow ">
                <ul class="py-3 px-3  flex flex-col gap-3">
                  {/* <li class="cursor-pointer bg-sky-400 p-2 rounded-md hover:opacity-90 text-white flex items-center justify-around font-[500]">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </li> */}
                  <li class="cursor-pointer bg-red-400 p-2 rounded-md hover:opacity-90 text-white"
                  onClick={() => deletePost(item._id)}
                  >
                     <FontAwesomeIcon icon={faTrash} /> Delete
                  </li>
                </ul>
              </div>}
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

            
              
              <div key={data._id} className="post-display-image flex justify-center">
              <div className="post-display-carousel-webview flex justify-center">
                <Carousel
                  thumbWidth={60}
                  width={380}
                  className="ml-auto mr-auto "
                  autoPlay
                  interval="5000"
                  infiniteLoop={true}
                >

{
                        item.img.length > 0 &&
                        item.img.map((data) => (
                          <div key={data._id} >
                            <img className="display-img" src={data} />
                          </div>
                          ))
                      }
               
                </Carousel>
              </div>
            </div>
              
            
            
          </div>

          <div className="post-display-bottom">
            <div className="post-display-bottom-content">
              <img src="Images/heart.svg" alt="" />
              {item.likes.length}
            </div>
            <button className="post-display-bottom-content"
            onClick={()=>{
              setOpenComment(!openComment)
              setId(item._id)

            
            }}
            >
              <img src="Images/message.svg" alt=""
              />
             {item.comment.length}
            </button>
          </div>
        </div>
      ))}
      <ProfileBigModel
      openComment={openComment}
      setOpenComment={setOpenComment}
      id={id}

      />
    </div>
  );
};

export default ProfilePost;
