import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const Admins = [
  {
    name: "Isha Bam",
    desg : 'President',
  },
  {
    name: "Anushka Shah",
    desg : 'Vice President',
  }
];

const SuperAdmin = () => {
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
      setEnableSearch(true);
    }
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    Admins &&
      Admins.forEach((user) => {
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
    <div>
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
      <div className="">
        <Scrollbars style={{ height: "230px" }}>
          {!enableSearch && (
            <table class="table-auto w-full max-w-[1300px]">
              <tbody class="text-sm divide-y  divide-gray-100 max-w-[1150px]">
                {Admins &&
                  Admins.map((member) => (
                    <tr className="flex justify-between ">
                      <td class="p-2 w-[200px] lg:w-[400px]">
                        <div className="flex items-center">
                          <img
                            class="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />

                          <div className="ml-2"> {member.name} </div>
                        </div>
                      </td>
                      <td class="p-2 lg:flex items-center mr-8">
                        <div class="font-medium text-gray-800">
                          {member.desg}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {enableSearch && (
            <table class="table-auto w-full max-w-[1300px]">
              <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
                {searched &&
                  searched.map((member) => (
                    <tr className="flex justify-between max-w-[1150px]">
                      <td class="p-2 w-[200px]  lg:w-[300px]">
                        <div className="flex items-center">
                          <img
                            class="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />

                          <div className="ml-2"> {member.name} </div>
                        </div>
                      </td>
                      <td class="p-2 lg:flex  items-center  md:block">
                        <div class="font-medium text-gray-800">
                          {member.desg}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </Scrollbars>
      </div>
    </div>
  );
};

export default SuperAdmin;
