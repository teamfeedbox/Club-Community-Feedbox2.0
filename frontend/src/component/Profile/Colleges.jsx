import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



const Colleges = () => {
  const [loading1, setLoading1] = useState(false);
  const [deletebtn, setDeleteBtn] = useState(false);
  const [loading, setLoading] = useState(false);



  return (
    <div className="w-[100%]  lg:w-[75%]">
      {/* add college */}
      <div className="p-2 pt-3 m-auto">
        <form action="">
          <input
            required
            className="border rounded p-1.5 w-[82%]"
            type="text"
            placeholder="Add College"
          />
          <button
            className=" p-1.5 rounded w-[15%] ml-2 bg-green-600 text-white font-[500] text-[1.05rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
            type="submit"
          >
            {loading1 ? (
              <div
                class="spinner-border text-white"
                role="status"
                style={{ height: "15px", width: "15px", marginLeft: "2px" }}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>Add</div>
            )}
          </button>
        </form>
      </div>

      {/* table to display college */}
      <div>
        <div className="overflow-x-auto p-2">
          <table className="table-auto w-full">
            <thead className=" uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-center">
                    S. No.
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-center">
                    College
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-center">
                    Action
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100">
              <tr>
                <td className="p-2  w-[12%]">
                  <div className=" text-gray-800 font-[500] text-[1rem] text-center">
                    1.
                  </div>
                </td>
                <td className="p-2  w-[63%]">
                  <div className=" text-gray-800 font-[500] text-[1rem] text-center">
                    Shri vaishnav vidyapeeth vishwavidyalaya
                  </div>
                </td>
                <td className="p-2  w-[25%]">
                  <div className="flex justify-center">
                    <button onClick={() => {
                        setDeleteBtn(true);
                      }}>
                      <svg
                        className="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>

                    {/* delete modal */}

                    {deletebtn && (
                    <Modal show={deletebtn} onHide={() => setDeleteBtn(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: "black", display: "flex" }}>
                        Do you really want to delete this College ? This process
                        cannot be undone.
                      </Modal.Body>
                      <Modal.Footer style={{ justifyContent: "right" }}>
                        <Button variant="danger">
                          {loading ? (
                            <div
                              class="spinner-border text-white"
                              role="status"
                              style={{ height: "15px", width: "15px" }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div >
                              Delete
                            </div>
                          )}
                        </Button>

                        <Button
                          variant="light"
                          onClick={() => setDeleteBtn(false)}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
