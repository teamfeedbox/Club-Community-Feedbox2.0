import React from "react";
import "./Approvals.css";
import PendingApprovals from "./PendingApprovals";
import ClubMember from "./ClubMember";
import Leads from "./Leads";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";

const Approvals = () => {
  return (
    <>
      <div className="approvals-overall">
        <div className="approvals-left">
          <PendingApprovals />
          <ClubMember />
          <Leads />
        </div>
        <div className="approvals-right">
          <SuperAdmin />
          <Admin />
        </div>

      </div>
    </>
  );
};

export default Approvals;
