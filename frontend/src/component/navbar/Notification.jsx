import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Notification.css";

const Notification = (props) => {
  const handleClose = (e) => {
    e.preventDefault();
    props.props.handleCross(true);
  };
  
  return (
    <div className="absolute top-[110%] right-5 bg-white rounded py-2 px-2.5 w-[23%] shadow max-h-[500px]  ">
      <div className="flex justify-between">
        <div className="font-semibold">Notification</div>
        <div className="" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>

      {/* ****************Show notification******************* */}

      <div className="notifiaction-div pb-1 max-h-[450px] overflow-y-scroll text-[1rem] font-[500]">
        <div className="flex bg-green-300 mt-2 rounded-sm">
          <div className="bg-green-800 p-1 w-[5px] text-green-800"></div>
          <div className="p-1">Congrats! Now you are a Lead.</div>
        </div>

        <div className="flex bg-blue-200 mt-2 rounded-sm">
          <div className="bg-blue-800 p-1 w-[5px]  text-blue-800"></div>
          <div className="p-1">
            UI/UX Development event is scheduled. Check your calender.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
