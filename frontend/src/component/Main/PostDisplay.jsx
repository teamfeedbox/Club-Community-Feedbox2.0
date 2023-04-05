import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FcLike } from "react-icons/fc";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useState, useEffect, } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper";
import "./PostDisplay.css";
import PostBigModel from "./PostBigModel";
import Loader from '../Loader.jsx'
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

const PostDisplay = (userData) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState('Hide-Comment-Add-Btn');
  const [showView, setShowView] = useState('Hide-Comment-View-Btn');
  const [showReplView, setReplyView] = useState("Hide-Reply-View");
  const [id, setId] = useState("");
  const [tempComment, setTempComment] = useState('');
  const [tempReply, setTempReply] = useState('');
  // To open the Comment Model
  const [openComment, setOpenComment] = useState(false);
  const [reply, setReply] = useState('');
  const [comment, setComments] = useState([" How many times were you frustrated while looking out for a good collection of programming/algorithm /interview q",
    "How many times were you frustrated while looking out for a good collection of programming/algorithm /interview questions? What did you expect and what did you get? This portal has been created to",
    "How many times were you frustrated while looking out for a good collection of programming/algorithm.",
    "How many times were you frustrated while looking"]);
  const [loading, setLoading] = useState(false);

  function handleReply() {
    if (showAdd == "Show-Comment-Add-Btn") {
      setShowAdd('Hide-Comment-Add-Btn')
    }
    else {
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
  function handleAfterReply(event) {
    event.preventDefault();
    if (tempReply != "") {
      setReply(tempReply);
    }
  }
  function showRep() {
    if (tempReply != "") {
      setReplyView("Show-Reply-View");
      setShowAdd("Hide-Comment-Add-Btn");
    }
  }

  let user = userData && userData.userData;

  useEffect(() => {
    getList();
  }, []);

  // get All Post
  const getList = async () => {
    let result = await fetch("http://localhost:8000/getAllPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result.reverse());
  };

  // Like a post
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

  // Unlike a Post
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
      {!loading ?
        <div>
          {data.map((item, index) => (
            <div key={item._id} className="post-display1">
              <div className="post-display-head">
                <div className="post-display-profile">
                  <img src={item && item.postedBy && item.postedBy.img} alt="" />
                </div>
                <div className="post-display-heading">
                  <p className="post-head">
                    {item && item.postedBy && item.postedBy.name}
                  </p>

                  <div className="post-head-content">
                    <p className="post-display-heading-college">
                      {item && item.postedBy && item.postedBy.collegeName}
                    </p>
                    {/* <p className="post-display-heading-time">{item.postedDate}</p> */}
                    <p className="post-display-heading-time">{item.postedDate && timeAgo.format(new Date(item.postedDate).getTime() - 60 * 1000)}</p>
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
                      className="mySwiper">
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
                      {
                        item.img.length > 0 &&
                        item.img.map((data) => (
                          <div>
                            <img className="display-img" src={data} />
                          </div>
                        ))
                      }
                    </Carousel>
                  </div>
                </div>
              </div>

              <div className="post-display-bottom">
                {item.likes.includes(user && user._id) ? (
                  <div className="post-display-bottom-content">
                    <FcLike
                      size={28}
                      onClick={function () {
                        unlike(item && item._id);
                      }}
                    />
                    <span>{item.likes.length}</span>
                  </div>
                ) : (
                  <div className="post-display-bottom-content">
                    <FontAwesomeIcon className="fa-lg" icon={faHeart} style={{ fontSize: "25px" }}
                      onClick={function () {
                        like(item._id);
                      }}
                    />
                    <span>
                      {item.likes.length}
                    </span>

                  </div>
                )}
                <button onClick={() => {
                  setOpenComment(!openComment)
                  setId(item._id)
                }} className="post-display-bottom-content">
                  <img src="Images/message.svg" alt=""
                  />
                  {item.comment.length}
                </button>
              </div>
            </div>

          ))}
        </div>
        : <Loader />}
      <PostBigModel
        openComment={openComment}
        setOpenComment={setOpenComment}
        id={id}
      />
    </div>
  );

}
export default PostDisplay;
