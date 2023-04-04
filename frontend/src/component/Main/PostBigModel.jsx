import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./PostBigModel.css";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PostBigModel({ openComment, setOpenComment, id }) {
  // console.log(id);

  const [showModal, setShowModal] = useState(true);

  const [data, setData] = useState([]);

  const [showAdd, setShowAdd] = useState("Hide-Comment-Add-Btn");
  const [showView, setShowView] = useState("Hide-Comment-View-Btn");

  const [showReplView, setReplyView] = useState("Hide-Reply-View");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [newS, setNewS] = useState(false);
  // const [afterSubmit,setAfterSubmit]=useState("");

  const [tempComment, setTempComment] = useState("");
  const [tempReply, setTempReply] = useState("");

  const [showReply, setShowReply] = useState(true);
  const [changeText, setText] = useState(true);
  const [user, setUser] = useState();
  const [showViewReply, setShowViewReply] = useState(
    "Comment-Right-View-Reply-Hide"
  );
  const [loading, setLoading] = useState(false);

  const [replyMsg, setReplyMsg] = useState("");
  const [postData, setPostData] = useState();
  const [commentId, setCommentId] = useState("");

  const [message, setMessage] = useState("");

  // To set state to show delete the comment
  const [show, setShow] = useState(false);

  // To store deleted comment
  const [deleteVar, setDeleteVar] = useState("");

  function handleReply() {
    if (showAdd == "Show-Comment-Add-Btn") {
      setShowAdd("Hide-Comment-Add-Btn");
    } else {
      setShowAdd("Show-Comment-Add-Btn");
    }
  }

  function handleView() {
    if (changeText == true) {
      setText(false);
    } else {
      setText(true);
    }

    if (showView == "Show-Comment-View-Btn") {
      setShowView("Hide-Comment-View-Btn");
    } else {
      setShowView("Show-Comment-View-Btn");
    }
  }

  // function handleFormSubmit(event){

  //   event.preventDefault();

  //   if(tempComment!="")
  //   {
  //   setComments((comment) => [...comment, tempComment]);
  //   // console.log(tempComment)
  //   setTempComment("");
  //   }
  // }

  function handleAfterReply(event) {
    event.preventDefault();
    if (tempReply != "") {
      // setReply(tempReply);
    }
  }

  function showRep() {
    if (tempReply != "") {
      setReplyView("Show-Reply-View");
      setShowAdd("Hide-Comment-Add-Btn");
    }
  }
  // to show and hide whole component
  const handleClose = () => {
    setOpenComment(false);
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
    setLoading(false);
  }, [id, loading]);

  const getPost = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/userPost/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    setUser(result);
    // if(result._id===id){
    //   getPost()
    // }
  };

  const updateComment = () => {
    console.log(id, "", message);
    fetch("http://localhost:8000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, message }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPostData(result);
        console.log(result);
        setLoading(true);
        setMessage("");

        // const newData = data.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateReply = () => {
    console.log(commentId, "", replyMsg);
    fetch(`http://localhost:8000/reply/${commentId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, replyMsg }),
    })
      .then((res) => res.json())
      .then((result) => {
        // setPostData(result)
        console.log(result);
        setLoading(true);
        setReplyMsg("");

        // const newData = data.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // To show and hide delete comment model
  const handleCloseDelete = () => setShow(false);
  const handleShowDelete = () => setShow(true);

  return (
    <>
      {/* Model to delete the comment */}
      <Modal
        show={show}
        onHide={handleCloseDelete}
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
              //  onClick={
              //   ()=>{
              //     handleCloseDelete()
              //     let array=[];
              //     comment.map((item)=>{
              //     if(item!=deleteVar){
              //       array.push(item)
              //     }
              //     });
              //     setComments(array);
              //   }

              // }
            >
              Delete
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {openComment ? (
        <div className="Post-Big-Model-container">
          {/* to close the model on click outof the post section */}
          <div className="Post-Big-Model-Close" onClick={handleClose}></div>

          <div className="Post-Big-Model1">
            {/* Left side */}
            <div className="post-display2">
              <div className="post-display-center1">
                <div className="post-display-image "></div>

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
                        <img
                          className="display-img"
                          src="Images/l1.jpg"
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          className="display-img"
                          src="Images/l3.png"
                          alt=""
                        />
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "fit-content",
                      width: "95%",
                    }}
                  >
                    <div className="Post-Big-Pro-img">
                      <img
                        src={user && user.postedBy && user.postedBy.img}
                        alt="profile image"
                      ></img>
                    </div>
                    <div className="Post-Big-Title">
                      <div className="Post-Big-Title1">
                        {user && user.postedBy && user.postedBy.name}
                      </div>
                      <div className="Post-Big-Title2">Feedbox Member</div>
                    </div>
                  </div>
                  <Link
                    to="/main"
                    className="Cancel-Icon-Container"
                    style={{ textDecoration: "none" }}
                  >
                    <FontAwesomeIcon
                      className="fa-lg"
                      icon={faXmark}
                      onClick={handleClose}
                    />
                  </Link>
                </div>
                {/* Description */}
                <div className="Post-Big-Description">{user && user.desc}</div>
              </div>

              {/* Line to seprate pofile and comment */}
              {/* <div className="Post-Big-Line"></div> */}

              {/* Comment part */}
              <div className="Post-Big-Comment">
                <Scrollbars className="Scrollbar-height">
                  {/* Comment 1 */}
                  {user &&
                    user.comment.map((item) => (
                      <section className="Post-Comment-About" key={item._id}>
                        {/* Left part */}
                        <div className="Comment-Left">
                          <img
                            src={item && item.postedBy && item.postedBy.img}
                          ></img>
                        </div>

                        {/* Right part */}
                        <div className="Comment-Right">
                          <div className="Comment-Right-Top">
                            <div className="Comment-Right-User-Name">
                              {item && item.postedBy && item.postedBy.name}
                            </div>
                            <div className="Right-Comment">{item.message}</div>
                          </div>

                          <div className="Comment-Right-Down">
                            <span className="Comment-Down-Other">22h</span>
                            <span
                                className="Comment-Down-Other Comment-Down-Other1"
                                onClick={() => {
                                  handleShowDelete();
                                }}
                                style={{ marginLeft: "20px" }}
                              >
                                edit
                              </span>
                            {showReply == true ? (
                              <span
                                className="Comment-Down-Other Comment-Down-Other1 "
                                onClick={() => {
                                  handleReply();
                                  setCommentId(item._id);
                                  console.log(item._id);
                                }}
                              >
                                reply
                              </span>
                            ) : (
                              <span style={{ display: "none" }}></span>
                            )}
                          </div>
                          {/* <div className={showReplView}>
                    <div className="Comment-Right-User-Name">
                      {user && user.postedBy && user.postedBy.name}
                    </div>
                    <div className="Right-Comment">
                      {
                       user && user.reply && user.reply.replyMsg
                      }
                    </div>
                  </div> */}

                          <div className={showView}>
                            <div className="Comment-Right-User-Name">
                              Random Person
                            </div>
                            <div className="Right-Comment"></div>
                          </div>

                          {changeText == true ? (
                            <div className={showViewReply} onClick={handleView}>
                              ---- View Reply
                            </div>
                          ) : (
                            <>
                              <span
                                className={showViewReply}
                                onClick={handleView}
                              >
                                ---- Hide Reply
                              </span>
                              <span
                                className="Comment-Down-Other Comment-Down-Other1"
                                onClick={() => {
                                  handleShowDelete();
                                }}
                                style={{ marginLeft: "20px" }}
                              >
                                edit
                              </span>
                            </>
                          )}

                          {showReply === true && item._id === commentId ? (
                            <div className={showAdd}>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  // setReply(e.target[0].value)
                                  updateReply();
                                  // updateComment()
                                  // console.log(e.target[0].value)
                                }}
                              >
                                <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                                  <div className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"></div>
                                  <input
                                    className="block border-solid  mx-2 p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
                                    placeholder="Reply..."
                                    value={replyMsg}
                                    onChange={(event) =>
                                      setReplyMsg(event.target.value)
                                    }
                                  ></input>
                                  <button
                                    onClick={() => (
                                      showRep,
                                      setShowReply(true),
                                      setShowViewReply(
                                        "Comment-Right-View-Reply"
                                      ),
                                      setShowReply(false)
                                    )}
                                    type="button"
                                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-6 h-6 rotate-90"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </section>
                    ))}
                </Scrollbars>
              </div>

              <div className="Post-Big-Comment-Container">
                {/* <div className="Post-Big-Comment-Icons">
                    <span>
                      <span>
                        <FontAwesomeIcon
                          className="fa-lg"
                          icon={faHeart}
                          style={{ margin:
                            "0px 5px 0 10px",color:"black",cursor:"pointer"}}
                        />
                      </span>
                      <span>{user && user.likes.length}</span>
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
                  </div> */}

                <div className="Comment-Add-Section">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // setMessage(e.target[0].value)
                      updateComment();
                      // console.log(e.target[0].value)
                    }}
                  >
                    <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                      <div className="rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <img
                          src="Images/alumni2.jpg"
                          aria-hidden="true"
                          className="w-10 h-8
                            p-0
                            rounded-full
                            "
                        ></img>
                      </div>
                      <input
                        className="block mx-2 p-2.5 w-full text-sm rounded-lg border text-black"
                        style={{ border: "2px solid black" }}
                        placeholder="Add a comment..."
                        // type='button'
                        value={message}
                        onChange={
                          (event) => setMessage(event.target.value)
                          //  console.log(event.target.value)
                        }
                        // value={afterSubmit}
                      ></input>
                      <button
                        type="submit"
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 rotate-90"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PostBigModel;
