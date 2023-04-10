import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
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
import NavbarRes from "../navbar/NavbarRes";

const RescourcesTable = (props) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const location = useLocation();
  const propsData = location.state;
  let skillName = propsData.name;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState(false);
  const [title, setTitle] = useState();
  const [pdfFile, setPdfFile] = useState();
  const [author, setAuthor] = useState();
  const [data, setData] = useState([]);
  const [duplicateData, setDuplicateData] = useState([]);
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState("");
  const [img, setImg] = useState();
  const [pdfLink, setPdfLink] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [mypdf, setMyPdf] = useState(false);
  const [filename, setFileName] = useState("");

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let tableData = data && data.slice(startIndex, endIndex);
  let searchData = searched && searched.slice(startIndex, endIndex);

  function goToPrev() {
    setCurrentPage((page) => page - 1);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
  }

  const totalPages = Math.ceil(data && data.length / itemsPerPage);

  let id;
  useEffect(() => {
    if (searchval == "") {
      getList(skillName);
    }
    getUser();
  }, [skillName]);

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setImg(result.img)
    id = result._id;
    setRole(result.role);
    setUser(result);
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPdfFile(e.target.files[0]);
    setMyPdf(true);
    setFileName(e.target.files[0].name);
  }

  const handleClose = () => {
    setTitle("");
    setFile("");
    setPdfFile("");
    setPdfLink("");
    setFileName("");
    setLink(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const AddResource = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("pdfLink", pdfLink);
    formData.append("title", title);
    formData.append("author", id);
    formData.append("skill", skillName);

    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    if (response) {
      // PDF file uploaded successfully
      setLoading(false);
      alert("File uploaded successfully");
      setTitle("");
      setFile("");
      setPdfFile("");
      setPdfLink("");
      setFileName("");
      setLink(false);
      setShow(false);
    } else {
      // Error uploading PDF file
      console.log("error");
      setLoading(false);
    }

  };

  const getList = async (skillName) => {
    console.log("l,mnuhgftr");
    let result = await fetch(
      `http://localhost:8000/getAllResource/${skillName}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    result = await result.json();
    setData(result);
    setDuplicateData(result)
  };

  const searchHandler = (e) => {

    let val = e.target.value;
    setSearchVal(e.target.value)
    if (e.target.value !== "") {

      let matched = [];
      duplicateData.length > 0 &&
        duplicateData.forEach((user) => {
          const value = user.title.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setData(matched)
    } else {
      setData(duplicateData)
    }
  };

  return (
    <>
      <div className="Res-table-display pt-[60px] md:pt-[100px]">
        <div className="RescourcesTable">
          <div className="res-table-heading">
            <div className="res-heading-left"> {skillName} Documents </div>
            {/* <div className="res-heading-left">{propsData.name} </div> */}
            <div className="res-heading-right">
              <div
                class="form-inline my-2 my-lg-0"
                className="res-table-search"
              >
                <input
                  class="form-control mr-sm-2"
                  type="text"
                  value={searchval}
                  onChange={searchHandler}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-primary">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              {role !== "Club_Member" ? (
                <button
                  onClick={handleShow}
                  className="btn btn-primary res-add-btn"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
              ) : (
                ""
              )}

              {/* modal popup to add rescources  */}

              <Modal
                show={show}
                onHide={handleClose}
                className="profile-section-overall"
              >
                <form onSubmit={AddResource} encType="multipart/form-data">
                  <Modal.Header closeButton>
                    <Modal.Title> <div className="res_modal_header">Add Resource</div> </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-body">
                    <div className="modal-profile-section">
                      <div className="modal-profile-section-image">
                        <img src={img} alt="" />
                      </div>
                      <div className="modal-add-res-section-profile relative bottom-2">
                        <h5>{user && user.name}</h5>
                        <p className="text-gray-500 bottom-3 relative pl-3 text-[0.8rem] font-[600]">
                          {" "}
                          {skillName}{" "}
                        </p>
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
                      <div className="res-add-modal-footer-upload">
                        Upload :{" "}
                      </div>
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
                          accept=".pdf, .doc, .docx"
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

                          <input type="text" placeholder="Enter Link"
                            value={pdfLink}
                            onChange={(e) => setPdfLink(e.target.value)}
                            name="pdfLink"

                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {
                        mypdf ? (
                          <div className="w-fit text-[.8rem] mt-2">{filename}</div>
                        ) :
                          (
                            ""
                          )
                      }
                    </div>

                    <div>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        variant="primary"
                      >
                        {loading ? (
                          <div
                            class="spinner-border text-white"
                            role="status"
                            style={{
                              height: "15px",
                              width: "15px",
                              marginLeft: "2px",
                            }}
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <div>Add</div>
                        )}
                      </button>

                    </div>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>

          {/* table to display rescources */}

          <div class="overflow-x-auto p-3">
            <table class="table-auto w-full">
              <thead class="uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th class="p-2">
                    <div class="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">Download</div>
                  </th>
                  <th class="p-2">
                    <div class="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">Resource Title</div>
                  </th>
                  <th class="p-2">
                    <div class="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">Created </div>
                  </th>
                  <th class="p-2">
                    <div class="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">Author</div>
                  </th>
                </tr>
              </thead>

              <tbody class="text-sm divide-y divide-gray-100">
                {

                  tableData && tableData.length > 0 ?
                    tableData.map((item) => (
                      <tr key={item._id}>
                        <td class="p-2">
                          <a
                            href={(item && item.url) || (item && item.link)}
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
                          <div class="font-[500] text-[1rem] text-black">
                            {item && item.title}
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-left text-blue-600 font-[500] text-[1rem]">
                            {item && item.date && timeAgo.format(new Date(item.date).getTime() - 60 * 1000)}
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-left text-black font-[500] text-[1rem]">
                            {item && item.author && item.author.name}
                          </div>
                        </td>
                      </tr>
                    ))
                    :
                    <tbody>
                      <tr>
                        <td colspan="4">
                          <div>No Resources Added yet !</div>
                        </td>
                      </tr>
                    </tbody>
                }

              </tbody>
            </table>
          </div>
          <div className="res-navigation">
            <div>
            </div>
            {
              (tableData && tableData.length > 0) ?
                <nav className="d-flex">
                  <ul className="res-paginate">
                    <button
                      onClick={goToPrev}
                      className="prev"
                      disabled={currentPage === 1}
                    >
                      <GrFormPrevious size="25" />
                    </button>
                    <p className="nums">
                      {tableData && tableData.length > 0
                        ? `${currentPage}/${totalPages}`
                        : "0/0"}

                    </p>
                    <button
                      onClick={goToNext}
                      className="prev"
                      disabled={currentPage >= totalPages}
                    >
                      <GrFormNext size="25" />
                    </button>
                  </ul>
                </nav>
                : ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RescourcesTable;
