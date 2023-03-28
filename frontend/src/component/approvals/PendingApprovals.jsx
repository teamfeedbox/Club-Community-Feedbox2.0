import {
  faCircleCheck,
  faCircleXmark,
  faFileInvoice,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";

const pendingApproval = [
  {
    name: "Isha Bam",
    branch: "4th year-IT",
  },
  {
    name: "Anushka Shah",
    branch: "4th year-IT",
  },
  {
    name: "Khushi ",
    branch: "4th year-IT",
  },
  {
    name: "Shraddha Vishwakarama",
    branch: "4th year-IT",
  },
  {
    name: "Elena",
    branch: "3rd year-CS",
  },
];

const PendingApprovals = () => {
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
      setEnableSearch(true);
    }
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    pendingApproval &&
    pendingApproval.forEach((user) => {
        console.log(user.name, val);
        const value = user.name.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      });
    console.log(matched);
    setSearched(matched);
  };
  
  return (
    <div className="PendingApprovals ">
      <h4 className=" text-[1.7rem]">Pending Approvals</h4>
      {/* search */}
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              class="bg-transparent w-full  border-none mr-10 px-2 leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" class="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {/* table  */}
      <div className="lg:border"> 
      <Scrollbars style={{ height: "230px" }}>
        {!enableSearch &&
          <table class="table-auto w-full max-w-[1300px] ">
          <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
            {pendingApproval && pendingApproval.map((approval) => (
              <tr className="flex justify-between max-w-[1150px]">
                <td class="p-2  lg:w-[300px]">
                  <div className="flex items-center">
                    <img
                      class="rounded-full"
                      src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                      width="40"
                      height="40"
                      alt="Alex Shatov"
                    />

                    <div className="ml-2"> {approval.name} </div>
                  </div>
                </td>
                <td class="p-2 lg:flex items-center hidden md:block">
                  <div class="font-medium text-gray-800">{approval.branch}</div>
                </td>
                <td class="pt-2 pb-2 flex justify-end">
                  <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                    <button className="h-[30px] rounded-xl text-[#616161] font-bold hover:bg-gray-300 mr-2">
                      Ignore
                    </button>
                    <button className="h-[25px] w-[60px] rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]">
                      Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

        {enableSearch &&
          <table class="table-auto w-full max-w-[1300px]">
          <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
            {searched && searched.map((approval) => (
              <tr className="flex justify-between max-w-[1150px]">
                <td class="p-2  lg:w-[300px]">
                  <div className="flex items-center">
                    <img
                      class="rounded-full"
                      src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                      width="40"
                      height="40"
                      alt="Alex Shatov"
                    />

                    <div className="ml-2"> {approval.name} </div>
                  </div>
                </td>
                <td class="p-2 lg:flex items-center hidden md:block">
                  <div class="font-medium text-gray-800">{approval.branch}</div>
                </td>
                <td class="pt-2 pb-2 flex justify-end">
                  <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                    <button className="h-[30px] rounded-xl text-[#616161] font-bold hover:bg-gray-300 mr-2">
                      Ignore
                    </button>
                    <button className="h-[25px] w-[60px] rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]">
                      Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </Scrollbars>
      </div>
    </div>
  );
};

export default PendingApprovals;
