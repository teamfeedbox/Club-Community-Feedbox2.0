import React, { useEffect, useState } from "react";
import PendingApprovals from "./PendingApprovals";
import ClubMember from "./ClubMember";
import Lead from "./Leads";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";
import NavbarRes from "../navbar/NavbarRes";

const Approvals = () => {
  const [tabs, setTabs] = useState("club");
  const [cM,setCM]=useState(false);
  const [click,setClick]=useState(false);

  const pull_data = (data) => {
      setCM(data);
  }
  

  return (
    <>
    <NavbarRes />
    <div className="pb-9 pt-[70px]" >
      <PendingApprovals func={pull_data}/>

      <div className="mt-9">
        <div className="overall-profile-tabs  ">
          <div className="text-sm profile-tabs">
            <div
              className={
                tabs === "club"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => setTabs("club")}
            >
              Club Members
            </div>

            <div
              className={
                tabs === "Lead"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => {setClick(true); setTabs("Lead")}}
            >
              Leads
            </div>

            <div
              className={
                tabs === "Admin"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => setTabs("Admin")}
            >
              Admins
            </div>

            <div
              className={
                tabs === "SuperAdmin"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => setTabs("SuperAdmin")}
            >
              SuperAdmin
            </div>
          </div>

          <div className="profile-tab-data">
            <div className={tabs === "club" ? "" : "profile-tab-data-hide"}>
              <ClubMember props={cM?true:false} />
            </div>

            <div className={tabs === "Lead" ? "" : "profile-tab-data-hide"}>
              <Lead props={click && true} />
            </div>

            <div className={tabs === "Admin" ? "" : "profile-tab-data-hide"}>
              <Admin props={click && true}/>
            </div>

            <div
              className={tabs === "SuperAdmin" ? "" : "profile-tab-data-hide"}
            >
              <SuperAdmin />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Approvals;
