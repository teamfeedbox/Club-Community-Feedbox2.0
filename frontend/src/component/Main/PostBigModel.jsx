import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link, useAsyncError } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./PostBigModel.css";
// Bootstrap
import Modal from "react-bootstrap/Modal";

function PostBigModel({ openComment, setOpenComment, id }) {

  const [tempReply, setTempReply] = useState("");
  const [deleteComId, setDeleteComId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [changeText, setText] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const [replyMsg, setReplyMsg] = useState("");
  const [postData, setPostData] = useState();
  const [commentId, setCommentId] = useState("");

  const [message, setMessage] = useState("");

  // To set state to show delete the comment
  const [show, setShow] = useState(false);

  // To store deleted comment
  const [deleteVar, setDeleteVar] = useState("");

  //To hide the reply button after the reply is added\
  const [replyBtn,setReplyBtn]=useState(true);

  // To show reply input field
  const [showReplyInputField, setShowReplyInputField] = useState(false);

  // To store the state of set reply input field button
  const [replyInputBtnId,setReplyInputBtnId]=useState("");

  // To show the reply written by user
  const [showReply,setShowReply]=useState(true);

  // To show and hide "view reply" 
  const [checkReply,setCheckreply]=useState(false);

  // To show and hide "hide reply" 
  const [hideReply,setHidereply]=useState(false);

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

  // function showRep() {
  //   if (tempReply != "") {
  //     setReplyView("Show-Reply-View");
  //     setShowAdd("Hide-Comment-Add-Btn");
  //   }
  // }
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
    console.log(result)
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
        // setPostData(result);
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
  // console.log(commentId, "", replyMsg);


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

  // console.log(deleteComId," ",id);

  //delete comment
  const deleteComment = async (deleteComId) => {
    console.log(deleteComId," ",id);
    let result = await fetch(`http://localhost:8000/commentDel/${deleteComId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({id}),
    });

    result = await result.json();
    console.log(result)
    setLoading(true);

    // if (result) {
    //   updateComment();
    // }
  };

  const deleteReply = async (replyId) => {
    console.log(replyId," ",id);
    let result = await fetch(`http://localhost:8000/replyDel/${replyId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({id,commentId}),
    });

    result = await result.json();
    console.log(result)
    setLoading(true);

    // if (result) {
    //   updateComment();
    // }
  };



  // To show and hide delete comment model
  const handleCloseDelete = () => setShow(false);
  const handleShowDelete = () => setShow(true);
  const handleShowDeleteReply = () => setShow(true);

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
               onClick={
                ()=>{
                  
                  deleteComment(deleteComId)
                  handleCloseDelete()
                }

              }
            >
              Delete
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleShowDeleteReply}
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
               onClick={
                ()=>{
                  
                  deleteReply(replyId)
                  handleCloseDelete()
                }

              }
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

                {/* ********carousel for web view********** */}
                <div className="post-display-image flex justify-center">
                  <div className="post-display-carousel-webview1 flex justify-center">
                    <Carousel
                      thumbWidth={60}
                      className="w-[30vw]"
                      autoPlay
                      interval="5000"
                      infiniteLoop={true}
                    >
                      {
                        user && user.img.map((data)=>
                        <div key={data._id}>
                        <img className="display-img" src={data} />
                      </div>
                        )
                      }
                      

                      {/* <div>
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
                      </div> */}

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
                                  setDeleteComId(item._id);
                                  console.log(item._id)

                                }}
                                style={{ marginLeft: "20px" }}
                              >
                                edit
                            </span>

                            {
                                // replyBtn==true?(
                              <span
                                className="Comment-Down-Other Comment-Down-Other1 "
                                onClick={() => {
                                  setShowReplyInputField(!showReplyInputField)
                                    // alert(showReplyInput)
                                  setCommentId(item._id);
                                  console.log(item._id);
                                }}
                              >
                                reply
                              </span>
                              // ):("")
                            }
                              
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


                  {/* *** Section which will contain the reply on a comment****** */}

                        {
                          showReply==true && commentId==item._id?(
                            <section style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                           {
                            item && item.reply.map((data)=>
                            <div key={data._id} className="Comment-Right">
                              <div className="Comment-Right-Top">
                              <div className="Comment-Right-User-Name">
                                {data && data.postedBy && data.postedBy.name}
                              </div>
                              <div className="Right-Comment"> {data && data.replyMsg}</div>
                            </div>

                            <div className="Comment-Right-Down">
                              <span className="Comment-Down-Other">22h</span>
                              <span
                                className="Comment-Down-Other Comment-Down-Other1"
                                onClick={() => {
                                  handleShowDeleteReply();
                                  setReplyId(data._id);

                                }}
                                style={{ marginLeft: "20px" }}
                              >
                                edit
                              </span>
                          </div>
                          </div>
                            )
                           }   
                            

                         

                          

                          </section>
                            ):("")
                        }
                          {/* *******Hide and show reply******* */}

                          {
                          checkReply? (
                            <span onClick={()=>{
                              setShowReply(true)
                              setCheckreply(false)
                              setHidereply(true);
                            
                            }}
                            style={{
                              cursor:"pointer",
                              marginLeft:"20px"
                            }}
                            >
                              ---- View Reply
                            </span>
                          ):("")
                          }
                           {
                              hideReply?(<>
                             <span onClick={()=>{
                              setHidereply(false)
                              setCheckreply(true)
                              setShowReply(false)

                             }}
                             style={{
                              cursor:"pointer",
                              marginLeft:"20px"
                             }}
                             >
                                ---- Hide Reply
                              </span>
                              
                              <span
                                onClick={() => {
                                }}
                                style={{ marginLeft: "20px" ,color:"color:#838181;"}}
                              >
                                edit
                              </span> 
                              </>):("")
                             }

                          {showReplyInputField === true && item._id === commentId ? (
                            <div className="Show-comment-Add-Btn">
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                 
                                }}
                              >
                                <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                                  <div className="rounded-lg cursor-pointer hover:text-black-900 hover:bg-gray-100 dark:text-black-400 dark:hover:text-black dark:hover:bg-gray-600"></div>
                                  <input
                                    className="block border-solid  mx-2 p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
                                    placeholder="Reply..."
                                    value={replyMsg}
                                    onChange={(event) =>
                                      setReplyMsg(event.target.value)
                                    }
                                    
                                 
                                  ></input>
                                  <button
                                    onClick={() => {
                                  updateReply();

                                      setShowReplyInputField(false)
                                      setReplyInputBtnId(item._id)
                                      // setCommentId("")
                                      setReplyBtn(false)
                                      setShowReply(false)
                                      if(replyMsg!="")
                                      {
                                        setCheckreply(true)
                                      }
                                    }  
                                    }
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
                      if(message=="")
                      {

                      }
                      else
                      {
                        updateComment();
                      }
                     
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