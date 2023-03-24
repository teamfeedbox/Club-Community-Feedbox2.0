import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const Lead = [
  {
    name: "Isha Bam",
    desg : 'Event Co-ordinator',
  },
  {
    name: "Anushka Shah",
    desg : 'Event Speaker',
  },
  {
    name: "Khushi ",
    desg : 'Event Planner',
  },
  {
    name: "Shraddha Vishwakarama",
    desg : 'Co-ordinator',
  },
  {
    name: "Elena Gilbert",
    branch: "Designer",
  },
];

const Leads = () => {
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
    Lead &&
      Lead.forEach((user) => {
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
      <div className="lg:border">
        <Scrollbars style={{ height: "230px" }}>
          {!enableSearch && (
            <table class="table-auto w-full max-w-[1300px]">
              <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
                {Lead &&
                  Lead.map((member) => (
                    <tr className="flex justify-between max-w-[1150px]">
                      <td class="p-2 w-[200px] lg:w-[300px]">
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
                      <td class="p-2 lg:flex items-center hidden md:block">
                        <div class="font-medium text-gray-800">
                          {member.desg}
                        </div>
                      </td>
                      <td class="pt-2 pb-2 flex justify-end">
                        <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                          <button
                            onClick={handleShow}
                            className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]"
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Make Admin
                          </button>
                        </div>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          className="club-member-modal"
                        >
                          <form>
                            <Modal.Header
                              closeButton
                              className="club-member-modal-header"
                            >
                              Are you sure to make this lead as admin ?
                            </Modal.Header>
                            <Modal.Footer className="modal-footer club-member-modal-footer">
                              <div className="modal-footer-club-member-yes-no-div">
                                <div onClick={() => setConfirm(!confirm)}>
                                  Yes
                                </div>
                                <button>No</button>
                              </div>
                              {confirm ? (
                                <div className="club-member-modal-confirm">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Specify Position"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <button>Confirm</button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </Modal.Footer>
                          </form>
                        </Modal>
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
                      <td class="p-2 lg:flex items-center hidden md:block">
                        <div class="font-medium text-gray-800">
                          {member.desg}
                        </div>
                      </td>
                      <td class="pt-2 pb-2 flex justify-end">
                        <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                          <button
                            onClick={handleShow}
                            className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]"
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Make Admin
                          </button>
                        </div>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          className="club-member-modal"
                        >
                          <form>
                            <Modal.Header
                              closeButton
                              className="club-member-modal-header"
                            >
                              Are you sure to make this lead as admin ?
                            </Modal.Header>
                            <Modal.Footer className="modal-footer club-member-modal-footer">
                              <div className="modal-footer-club-member-yes-no-div">
                                <div onClick={() => setConfirm(!confirm)}>
                                  Yes
                                </div>
                                <button>No</button>
                              </div>
                              {confirm ? (
                                <div className="club-member-modal-confirm">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Specify Position"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <button>Confirm</button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </Modal.Footer>
                          </form>
                        </Modal>
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

export default Leads;
