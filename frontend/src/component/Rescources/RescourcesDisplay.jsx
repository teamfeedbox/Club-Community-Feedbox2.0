import React from "react";
import "./RescourcesDisplay.css";
import Navbar from "../Navbar";
// import CreateRes from "./CreateRes";
import RescourcesTable from "./RescourcesTable";

const RescourcesDisplay = () => {
  return (
    <>
      <Navbar />
      <div className="RescourcesDisplay">
        {/* <CreateRes /> */}
        <RescourcesTable />
      </div>
    </>
  );
};

export default RescourcesDisplay;
