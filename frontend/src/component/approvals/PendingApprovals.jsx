import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";

const PendingApprovals = (props) => {
  const [data, setData] = useState([]);
  const [searchval, setSearchVal] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [val, setVal] = useState(false);
  const [id, setId] = useState();
  const [did, setDid] = useState();
  const [load, setload] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  const currentCollege = JSON.parse(localStorage.getItem("user")).college;
  const role = JSON.parse(localStorage.getItem("user")).role;

  const getUser = async () => {
    console.log("dlkcnus");
    setLoading3(true);
    const result = await fetch(`http://localhost:8000/get`);
    const res = await result.json();
    let user = [];
    res &&
      res.map((data) => {
        if (data.role == "user") {
          user.push(data);
        }
      });
    user = user.reverse();

    if (role === "Super_Admin") {
      let clgSel = [];
      if (props.clg) {
        if (props.clg === "All") {
          setPendingUsers(user);
          setData(user);
        } else {

          const getData = (async()=>{

            await user.map(data => {
              
              if (data.collegeName === props.clg) {
                clgSel.push(data)
              }
            })
          })
          getData().then(()=>{
            setPendingUsers(clgSel);
            setData(clgSel);
          })
        }
      } else {
        setPendingUsers(user);
        setData(user);
      }
    } else {
      console.log("2");
      let clg = [];
      user.map(data => {
        if (data.collegeName === currentCollege) {
          clg.push(data)
        }
      })
      setPendingUsers(clg);
      setData(clg);
    }
    setDeclineLoading(false);
    setId('')
    setDid('')
    setLoading3(false);
  };

  useEffect(() => {
    getUser();
    // setLoading(false)
    setload(false)
  }, [props, load]);

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
  const handleDecline = async (id, i) => {
    setDeclineLoading(true);
    setLoading(true);
    setDid(i)
    const data = await fetch(`http://localhost:8000/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    // setLoading(false);
    setload(true);
  };

  const handleEmail = async (id) => {
    setLoading(true);
    const data = await fetch(`http://localhost:8000/sendmail/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
  };

  // Accept request for club member
  const handleAccept = async (id, i) => {
    setLoading(true)
    setId(i)
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Club_Member" }),
    });
    const res = await data.json();
    handleEmail(id);
    setVal(!val);
    props.func(!val);
    // setLoading(false);
    setload(true);
    setLoading(false);
  };

  return (
    <div className="PendingApprovals ">
      <div className="flex flex-col lg:flex-row md:flex-row justify-between">
        <div>
          <h4 className=" text-[1.5rem] font-[700] mt-3 lg:mt-1  my-0 lg:my-3">Pending Approvals</h4>

        </div>
      </div>
      {/* search */}
      <div className="pending-approval-search">
        <div className="relative text-lg bg-transparent text-gray-800">
          <div className="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              className="bg-transparent w-full text-[1rem] font-[400]  border-none mr-10 px-2 leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" className="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:border">
        <Scrollbars style={{ height: "250px" }}>
          <table className="table-auto w-full max-w-[1300px] ">
            <tbody className="text-sm divide-y divide-gray-100 max-w-[1150px]">
              {
              loading3?
               <div
               className="spinner-border text-blue"
               role="status"
               style={{
                 height: "35px",
                 width: "35px",
                 marginTop: "15px",
                 marginLeft:"75px"
               }}
             >
               <span className="visually-hidden">
                 Loading...
               </span>
             </div>
              :
              pendingUsers.length > 0 ? (
                pendingUsers.map((approval, index) => (
                  <tr className="flex justify-between max-w-[1150px]">
                    <td className="p-2  lg:w-[300px]">
                      <div className="flex items-center">
                        <img
                          className="rounded-full w-[40px] h-[40px] object-center"
                          src={approval.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                        <div className="ml-2  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[400]"> {approval.name} </div>
                      </div>
                    </td>
                    <td className="p-2 lg:flex items-center hidden md:block">
                      <div className="text-gray-800 text-[1rem] font-[400]">
                        {approval.collegeYear} year-{approval.branch}
                      </div>
                    </td>
                    <td className="pt-2 pb-2 flex justify-end">
                      <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">


                        {id !== index ?

                          <button 
                          // className="h-[25px] w-[80px] rounded-xl  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[500]  text-white bg-[#00D22E] hover:bg-[#03821f]"
                          className="h-[30px] rounded-xl text-[#616161] text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]  font-[500] hover:bg-gray-300 mr-2 w-[80px]"
                          >

                          {declineLoading && id === index  ? (
                            <div
                              className="spinner-border text-black"
                              role="status"
                              style={{ height: "15px", width: "15px" }}
                            >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div onClick={() => handleDecline(approval._id, index)}>
                              Decline
                            </div>
                          )}
                        </button>: ''}

                        {did !== index ?
                          <button className="h-[25px] w-[80px] rounded-xl  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[500]  text-white bg-[#00D22E] hover:bg-[#03821f]">
                          {loading && id === index ? (
                            <div
                              className="spinner-border text-white"
                              role="status"
                              style={{ height: "15px", width: "15px" }}
                            >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div onClick={() => handleAccept(approval._id, index)}>
                              Accept
                            </div>
                          )}
                        </button> : ''}

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">No Pending Requests !</div>
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
