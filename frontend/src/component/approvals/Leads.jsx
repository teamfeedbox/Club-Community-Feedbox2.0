import { faSearch, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const Leads = (props) => {
  const [searchval, setSearchVal] = useState("");
  const [show, setShow] = useState(false);
  const [delshow, setDelShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [lead, setLead] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState();
  const [id, setId] = useState();

  const role = JSON.parse(localStorage.getItem("user")).role
  console.log(role);

  const handleClose = () => { setShow(false); setConfirm(false) };
  const handleShow = () => setShow(true);
  const handleDelShow = () => setDelShow(true);
  const handleDelClose = () => setDelShow(false);

  console.log(props, "props")

  const getUser = async () => {
    const result = await fetch(`http://localhost:8000/get`);
    const res = await result.json();
    let lead = [];
    res && res.map((data) => {
      if (data.role === 'Lead') {
        lead.push(data)
      }
    })
    let clgSel = [];
    if (props.clg) {
      if (props.clg === "All") {
        setLead(lead.reverse());
        setData(lead.reverse());
      } else {
        lead.map(data => {
          if (data.collegeName === props.clg) {
            clgSel.push(data)
          }
        })
        setLead(clgSel.reverse());
        setData(clgSel.reverse());
      }
    } else {
      setLead(lead.reverse());
      setData(lead.reverse());
    }
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [loading, props])

  // search user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value !== "") {
      let matched = [];
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setLead(matched);
    } else {
      setLead(data);
    }
  };

  // submit handler for making club member as lead
  const submitHandler = async () => {
    setLoading(true);
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'Admin', position: position })
    })
    const res = await data.json();
    console.log(res);

    // Generate Notification
    var date = new Date();
    const notifi =
    {
      type: "role",
      message: "You are upgraded from Lead to Admin!",
      date: date,
      status: "unseen"
    }


    const generateNotifi = await fetch(
      `http://localhost:8000/user/user/addnotifi/${id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifi),
      }

    );
    console.log(notifi);
    setConfirm(false);
    setShow(false);
    setLoading(false);
  }

  const handleDeleteAdmin = async () => {
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'Club_Member' })
    })
    const res = await data.json();
    console.log(res)
    setDelShow(false)
    setLoading(true)
  }

  return (
    <div>
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              class="bg-transparent w-full text-[1rem] font-[400]  border-none mr-10 px-2 leading-tight focus:outline-none"
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

      <div className="lg:border">
        <Scrollbars style={{ height: "250px" }}>
          <table class="table-auto w-full max-w-[1300px]">
            <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
              {lead.length > 0 ?
                lead.map((member) => (
                  <tr className="flex justify-between max-w-[1150px]">
                    <td class="p-2 w-[120px]  lg:w-[300px]">
                      <div className="flex items-center">
                        <img
                          class="rounded-full w-[40px] h-[40px] object-center"
                          src={member.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />

                        <div className="ml-2  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]  font-[400]"> {member.name} </div>
                      </div>
                    </td>
                    <td class="p-2 lg:flex items-center hidden md:block  w-[10%]">
                      <div class=" text-gray-800 text-[1rem] font-[400]">
                        {member.position}
                      </div>
                    </td>
                    {role && role === 'Admin' || role == 'Super_Admin' ?
                      <td class="pt-2 pb-2 flex  justify-end ">
                        <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                          <button
                            onClick={() => { setId(member._id); handleShow() }}

                            className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#00D22E] text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]  font-[500] hover:bg-[#03821f]"
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
                                <button onClick={(e) => { e.preventDefault(); setShow(false); setConfirm(false) }}>No</button>
                              </div>
                              {confirm ? (
                                <form className="club-member-modal-confirm">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Specify Position"
                                      required onChange={(e) => setPosition(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <button onClick={(e) => { e.preventDefault(); submitHandler() }}>Confirm</button>
                                  </div>
                                </form>
                              ) : (
                                ""
                              )}
                            </Modal.Footer>
                          </form>
                        </Modal>

                        <Modal show={delshow} onHide={handleDelClose} className="club-member-modal" >
                          <form>
                            <Modal.Header
                              closeButton
                              className="club-member-modal-header"
                            >
                              Are you sure to make this Lead as Club Member ?
                            </Modal.Header>
                            <Modal.Footer className="modal-footer club-member-modal-footer">
                              <div className="modal-footer-club-member-yes-no-div">
                                <div onClick={handleDeleteAdmin}>
                                  Yes
                                </div>
                                <button onClick={(e) => { e.preventDefault(); setDelShow(false); }}>No</button>
                              </div>
                            </Modal.Footer>
                          </form>
                        </Modal>
                      </td>
                      : ''}
                    <td className=" my-auto " style={{ marginRight: "10px" }}>
                      <div className="">
                        <button
                          onClick={() => { setId(member._id); handleDelShow() }}

                          className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#ff0000]  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[500] hover:bg-[#bf1004]"
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                )) :
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">No Lead Members !!</div>
                </div>
              }
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Leads;
