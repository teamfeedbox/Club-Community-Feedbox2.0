import React from "react";
import "./CreateRes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChain,
  faFaceSmile,
  faFile,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const CreateRes = () => {
  return (
    <div className="CreateRes">
      <form action="">
        <h2>Add Docs</h2>
        <div className="create-res-div">
          <input
            type="text"
            placeholder="ENTER TITLE"
            title="Enter your rescource title."
          />
          <div className="create-res-icon-div">
            <div className="create-res-icon" title="Upload Link">
              <label for="files" class="btn">
                <FontAwesomeIcon
                  icon={faChain}
                  className="fa-xl"
                ></FontAwesomeIcon>
              </label>
              <input id="files" style={{ display: "none" }} type="file" />
            </div>

            <div className="create-res-icon" title="Upload Document">
              <label for="files" class="btn">
                <FontAwesomeIcon
                  icon={faFile}
                  className="fa-xl"
                ></FontAwesomeIcon>
              </label>
              <input id="files" style={{ display: "none" }} type="file" />
            </div>
          </div>
          <div className="create-rescource-post-button">
          <button className="btn btn-primary">Post</button>
        </div>
        </div>

        {/* <div className="create-rescource-post-button">
          <button className="btn btn-primary">Post</button>
        </div> */}
      </form>
    </div>
  );
};

export default CreateRes;
