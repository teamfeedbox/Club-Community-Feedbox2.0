import React, { useEffect, useState } from "react";
import "./PostDisplay.css";



const PostDisplay = () => {

  const[data,setData] = useState([])

  useEffect(()=>{
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
  })

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
    let result = await fetch("http://localhost:8000/getAllPost",{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  });
    result = await result.json();
    // console.log(result)
    setData(result);
    if(result.desc)
    {
      getList();
    }
  };
  



  return (
    <div>

      {
        data.map((item,index)=>
        <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            {/* <h3>{item.postedBy.name}</h3>  
            <p>{item.postedBy.collegeName}</p> */}
          </div>
        </div>
        <div className="post-display-center">
          <div className="post-display-content">
           {item.desc}
          </div>
          <div className="post-display-image">
            <img src={item.img} alt="" />
          </div>
        </div>
        <div className="post-display-bottom">
          <img src="Images/heart.svg" alt="" />
          <img src="Images/message.svg" alt="" />

         
        </div>
      </div>
        )
      }




      {/* <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <h3>Isha Bam</h3>
            <div style={{'display' : 'flex'}}>
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
          <div className="post-display-image">
            <img src="Images/post-image.jpeg" alt="" />
          </div>
        </div>
        <div className="post-display-bottom">
          <img src="Images/heart.svg" alt="" />
          <img src="Images/message.svg" alt="" />

         
        </div>
      </div> */}

{/* 
      <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <h3>Isha Bam</h3>
            <div style={{'display' : 'flex'}}>
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
          <img src="Images/heart.svg" alt="" />
          <img src="Images/message.svg" alt="" />

     
        </div>
      </div>

      <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <h3>Isha Bam</h3>
            <div style={{'display' : 'flex'}}>
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
          <img src="Images/heart.svg" alt="" />
          <img src="Images/message.svg" alt="" />

     
        </div>
      </div>

      <div className="post-display">
        <div className="post-display-head">
          <div className="post-display-profile">
            <img src="Images/girl.jpg" alt="" />
          </div>
          <div className="post-display-heading">
            <h3>Isha Bam</h3>
            <div style={{'display' : 'flex'}}>
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
          <div className="post-display-image">
            <img src="Images/post-image.jpeg" alt="" />
          </div>
        </div>
        <div className="post-display-bottom">
          <img src="Images/heart.svg" alt="" />
          <img src="Images/message.svg" alt="" />

         
        </div>
      </div> */}
      
    </div>
  );
};

export default PostDisplay;
