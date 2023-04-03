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
  const [role, setRole] = useState('');
  const [user, setUser] = useState();

  const pull_data = (data) => {
      setCM(data);
  }

  useEffect(() => {
    getUser();
  },[]);
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);
    
    // console.log(id)
    setUser(result);

    // if (result) {
    //   getUser();
    // }
  };
  

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

            {role === 'Admin' || role === 'Super_Admin' ?
              <div
              className={
                tabs === "Admin"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => setTabs("Admin")}
            >
              Admins
            </div> : ''}

            {role === 'Super_Admin' ?
              <div
              className={
                tabs === "SuperAdmin"
                  ? "profile-tab-content profile-tab-content-highlight"
                  : "profile-tab-content"
              }
              onClick={() => setTabs("SuperAdmin")}
            >
              SuperAdmin
            </div> : ''}
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
