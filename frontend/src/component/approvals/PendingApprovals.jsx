import {
  faCircleCheck,
  faCircleXmark,
  faFileInvoice,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
 
const PendingApprovals = (props) => {
  const [data, setData] = useState([]);
  const [searchval, setSearchVal] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [load,setload]=useState(false);

  const getUser = async () => {
    const result = await fetch(`http://localhost:8000/get`);
    const res = await result.json();
    let user = [];
    res &&
      res.map((data) => {
        if (data.role == "user") {
          user.push(data);
        }
      });
    setPendingUsers(user);
    setData(user.reverse());
  };

  useEffect(() => {
    getUser();
    setload(false)
  },[load]);

  // search for a pending user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    if (e.target.value != "") {
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setPendingUsers(matched);
    } else {
      setPendingUsers(data.length > 0 && data);
    }
  };

  // Decline request for club member
  const handleDecline = async (id) => {
    setLoading(true);
    console.log(id);
    const data = await fetch(`http://localhost:8000/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    setLoading(false);
  };

  const handleEmail = async (id) => {
    setLoading(true);
    const data = await fetch(`http://localhost:8000/sendmail/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ role: "Club_Member" }),
    });
    const res = await data.json();
    setEmail(res);
  };

  // Accept request for club member
  const handleAccept = async (id, i) => {
    setLoading(true)
    setId(i);
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Club_Member" }),
    });
    const res = await data.json();
    handleEmail(id);
    setVal(!val);
    props.func(!val);
    setLoading(false);
    setload(true);
  };

  return (
    <div className="PendingApprovals ">
      <div className="flex flex-col lg:flex-row md:flex-row justify-between">
        <div>
          <h4 className=" text-[1.5rem] font-[700]  my-0 lg:my-3">Pending Approvals</h4>

        </div>
      </div>
      {/* search */}
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
        <Scrollbars style={{ height: "230px" }}>
          <table class="table-auto w-full max-w-[1300px] ">
            <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
              {pendingUsers.length > 0 ? (
                pendingUsers.map((approval, index) => (
                  <tr className="flex justify-between max-w-[1150px]">
                    <td class="p-2  lg:w-[300px]">
                      <div className="flex items-center">
                        <img
                          class="rounded-full"
                          src={approval.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                        <div className="ml-2 text-[1rem] font-[400]"> {approval.name} </div>
                      </div>
                    </td>
                    <td class="p-2 lg:flex items-center hidden md:block">
                      <div class="text-gray-800 text-[1rem] font-[400]">
                        {approval.collegeYear} year-{approval.branch}
                      </div>
                    </td>
                    <td class="pt-2 pb-2 flex justify-end">
                      <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                        <button
                          className="h-[30px] rounded-xl text-[#616161] text-[1.05rem] font-[500] hover:bg-gray-300 mr-2"
                          onClick={() => handleDecline(approval._id)}
                        >
                          Decline
                        </button>
                        <button className="h-[25px] w-[80px] rounded-xl text-[1.05rem] font-[500]  text-white bg-[#00D22E] hover:bg-[#03821f]">
                          {loading && id === index ? (
                            <div
                              class="spinner-border text-white"
                              role="status"
                              style={{ height: "15px", width: "15px" }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div
                            //  style={{marginTop:"-10px"}}
                              onClick={() => handleAccept(approval._id, index)}
                            >
                              Accept
                            </div>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">No Pending Requests !!</div>
                 </div>
              )}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default PendingApprovals;
