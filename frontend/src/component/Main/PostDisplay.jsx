import React, { useEffect, useState } from "react";
import "./PostDisplay.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const PostDisplay = () => {
  const [data, setData] = useState([]);

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
      {
        data.map((item, index) =>
        <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <p className="post-head">Isha Bam</p>
            <div className="post-head-content" style={{ display: "flex" }}>
              <p className="post-display-heading-college">SVVV</p>
              <p className="post-display-heading-time">19 hours ago</p>
            </div>
          </div>
        </div>

        <div className="post-display-center">
          <div className="post-display-content">
            {item.desc}
          </div>
          <div className="post-display-image flex justify-center">
            <Carousel thumbWidth={60} width={400} className="ml-auto mr-auto">
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

        <div className="post-display-bottom">
          <div className="post-display-bottom-content">
            <img src="Images/heart.svg" alt="" />
            500
          </div>
          <div className="post-display-bottom-content">
            <img src="Images/message.svg" alt="" />
            100
          </div>
        </div>
      </div>)}



      <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <p className="post-head">Isha Bam</p>
            <div className="post-head-content" style={{ display: "flex" }}>
              <p className="post-display-heading-college">SVVV</p>
              <p className="post-display-heading-time">19 hours ago</p>
            </div>
          </div>
        </div>

        <div className="post-display-center">
          <div className="post-display-content">
            Cyber attacks are on the rise in India, and business leaders need to
            take immediate action to combat malicious threats, reports The
            Economic Times, citing IBM X-Force Threat Intelligence Index.
          </div>
          <div className="post-display-image flex justify-center">
            <Carousel thumbWidth={60} width={400} className="ml-auto mr-auto">
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

        <div className="post-display-bottom">
          <div className="post-display-bottom-content">
            <img src="Images/heart.svg" alt="" />
            500
          </div>
          <div className="post-display-bottom-content">
            <img src="Images/message.svg" alt="" />
            100
          </div>
        </div>
      </div>

      <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <p className="post-head">Isha Bam</p>
            <div className="post-head-content" style={{ display: "flex" }}>
              <p className="post-display-heading-college">SVVV</p>
              <p className="post-display-heading-time">19 hours ago</p>
            </div>
          </div>
        </div>

        <div className="post-display-center">
          <div className="post-display-content">
            Cyber attacks are on the rise in India, and business leaders need to
            take immediate action to combat malicious threats, reports The
            Economic Times, citing IBM X-Force Threat Intelligence Index.
          </div>
        </div>

        <div className="post-display-bottom">
          <div className="post-display-bottom-content">
            <img src="Images/heart.svg" alt="" />
            500
          </div>
          <div className="post-display-bottom-content">
            <img src="Images/message.svg" alt="" />
            100
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
