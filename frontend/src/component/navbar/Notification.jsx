import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = (props) => {

  const [notification, setNotification] = useState()
  const [currentUser, setcurrentUser] = useState()

  const handleClose = (e) => {
    e.preventDefault();
    props.props.handleCross(true);
  };

  // const user = localStorage.getItem("user")
  // setcurrentUser(user)

  const getData = async () => {
    let notifi = await fetch(`http://localhost:8000/getNotifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    notifi = await notifi.json();
    setNotification(notifi)
    // console.log(notifiaction);
  }
  useEffect(() => {
    getData()
    // console.log(notification)
    // console.log(currentUser.id)
  }, [])
  return (
    <div className="absolute top-[110%] right-5 bg-white rounded py-2 px-2.5 w-[23%] shadow max-h-[500px]  ">
      <div className="flex justify-between">
        <div className="text-[1.1rem] font-[700] ">Notification</div>
        <div className="" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>

      {/* ****************Show notification******************* */}

      <div className="notifiaction-div pb-1 max-h-[450px] overflow-y-scroll text-[1rem] font-[500]">

        {/* <div className="flex bg-green-300 mt-2 rounded-sm">
          <div className="bg-green-800 p-1 w-[5px] text-green-800"></div>
          <div className="p-1">Congrats! Now you are a Lead.</div>
        </div> */}



        {notification && notification.map((data) => {
          return (
            data.messageScope === "public" ?
            (<div key={data.message} className="flex bg-blue-200 mt-2 rounded-sm">
            <div className="bg-blue-800 p-1 w-[5px]  text-blue-800"></div>
            <div className="p-1">
              Alert: Join {data.message} on {data.date} at {data.venue}

            </div>
          </div>)
              
              :
              (<div key={data.message} className="flex bg-blue-200 mt-2 rounded-sm">
              <div className="bg-blue-800 p-1 w-[5px]  text-blue-800"></div>
              <div className="p-1">
                {data.message}

              </div>
            </div>)


          )
        })}
      </div>
    </div>
  );
};

export default Notification;
