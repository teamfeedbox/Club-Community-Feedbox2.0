import React, { useState, useEffect } from "react";
import "./RescourcesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChain,
  faFileLines,
  faPlus,
  faSearch,
  faImage,
  faFile,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const RescourcesTable = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState(false);
  const [title, setTitle] = useState();
  const [pdfFile, setPdfFile] = useState();
  const [author, setAuthor] = useState();
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);
  const [user, setUser] = useState();


let id;
  useEffect(() => {
    getList();
  }, []);


  useEffect(() => {
    getUser();
  });
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
    // console.log(result);
     id = result._id
    // console.log(id)
    setUser(result);
    // if (result) {
    //   getUser();
    // }
  };


  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPdfFile(e.target.files[0]);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AddResource = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("title", title);
    formData.append('author', id);

    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
      headers: {
   
      "Authorization":"Bearer "+localStorage.getItem("jwt")

      },
      // mode: 'cors',
    });
// console.log(response)
    if (response.ok) {
      // PDF file uploaded successfully
      console.log("uploaded");
    } else {
      // Error uploading PDF file
      console.log("error");
    }
  };

 
  const getList = async (e) => {
    //  e.preventDefault();
    let result = await fetch("http://localhost:8000/getAllResource", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    // console.log(result[0].url)
    setData(result);
    if (result) {
      getList();
    }
  };

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setEnableSearch(false);
    } else {
      setEnableSearch(true);
    }
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    data &&
      data.forEach((user) => {
        console.log(user.title, val);
        const value = user.title.toLowerCase().includes(val.toLowerCase());
        if (value) {
          matched.push(user);
        }
      });
    console.log(matched);
    setSearched(matched);
  };

  return (
    <div className="Res-table-display">
      <div className="RescourcesTable">
        <div className="res-table-heading">
          <div className="res-heading-left">Documents </div>
          <div className="res-heading-right">
            <form class="form-inline my-2 my-lg-0" className="res-table-search">
              <input
                class="form-control mr-sm-2"
                type="text"
                value={searchval}
                onChange={searchHandler}
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-primary " type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <button
              onClick={handleShow}
              className="btn btn-primary res-add-btn"
            >
              <FontAwesomeIcon icon={faPlus} /> Add
            </button>

            {/* modal popup to add rescources  */}

            <Modal
              show={show}
              onHide={handleClose}
              className="profile-section-overall"
            >
              <form onSubmit={AddResource} encType="multipart/form-data">
                <Modal.Header closeButton>
                  <Modal.Title>Add Rescource</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                  <div className="modal-profile-section">
                    <div className="modal-profile-section-image">
                      <img src="Images/girl.jpg" alt="" />
                    </div>
                    <div className="modal-add-res-section-profile">
                      <h5>{user && user.name}</h5>
                    </div>
                  </div>
                  <div className="res-add-modal-title">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      value={title}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <div className="res-add-modal-footer">
                    <div className="res-add-modal-footer-upload">Upload : </div>
                    <div>
                      <label for="files" class="btn">
                        <FontAwesomeIcon
                          icon={faFile}
                          className="fa-xl"
                        ></FontAwesomeIcon>
                      </label>
                      <input
                        id="files"
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        // value={image}
                        onChange={handleChange}
                        accept="application/pdf"
                      />
                    </div>

                    <div
                      className="modal-footer-link"
                      onClick={() => {
                        setLink(!link);
                      }}
                    >
                      <FontAwesomeIcon icon={faChain} className="fa-xl" />
                    </div>

                    {link ? (
                      <div className="add-res-add-link">
                        <input type="text" placeholder="Enter Link" />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      variant="primary"
                      onClick={handleClose}
                    >
                      Add
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>

        {/* table to display rescources */}

        <div class="overflow-x-auto p-3">
          {!enableSearch &&
            <table class="table-auto w-full">
            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th class="p-2">
                  <div class="font-semibold text-left">Download</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Resource Title</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Date Created</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Author</div>
                </th>
              </tr>
            </thead>

            <tbody class="text-sm divide-y divide-gray-100">
              {data && data.map((item) => (
                <tr>
                  <td class="p-2">
                    <a
                      href={item && item.url}
                      target="_blank"
                      className="text-black"
                    >
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                      />
                    </a>
                  </td>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">
                      {item && item.title}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left text-blue-600 font-bold">
                      {item && item.date}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left text-black font-medium">{item && item.author && item.author.name}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}

          {enableSearch &&
            <table class="table-auto w-full">
            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th class="p-2">
                  <div class="font-semibold text-left">Download</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Resource Title</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Date Created</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Author</div>
                </th>
              </tr>
            </thead>

            <tbody class="text-sm divide-y divide-gray-100">
              { searched && searched.map((item) => (
                <tr>
                  <td class="p-2">
                    <a
                      href={item && item.url}
                      target="_blank"
                      className="text-black"
                    >
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                      />
                    </a>
                  </td>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">
                      {item && item.title}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left text-blue-600 font-bold">
                      {item && item.date}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left text-black font-medium">{item && item.author && item.author.name}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }


        </div>
        <div className="res-navigation">
          Viewing&nbsp;<span>1</span>-<span>6</span>&nbsp; of &nbsp;
          <span>6</span>
          &nbsp;page
        </div>
      </div>
    </div>
  );
};

export default RescourcesTable;
