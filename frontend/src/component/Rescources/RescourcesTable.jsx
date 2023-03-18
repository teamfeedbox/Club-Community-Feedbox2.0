import React, { useState } from "react";
import "./RescourcesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChain,
  faFileLines,
  faPlus,
  faSearch,
  faImage,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const RescourcesTable = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState(false);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="Res-table-display">
    <div className="RescourcesTable">
      <div className="res-table-heading">
        <div className="res-heading-left">Documents </div>
        <div className="res-heading-right">
          <form class="form-inline my-2 my-lg-0" className="res-table-search">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-primary my-2 my-sm-0" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <button onClick={handleShow} className="btn btn-primary res-add-btn">
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>

          {/* modal popup to add rescources  */}
    
          <Modal
            show={show}
            onHide={handleClose}
            className="profile-section-overall"
          >
            <form>
              <Modal.Header closeButton>
                <Modal.Title>Add Rescource</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                <div className="modal-profile-section">
                  <div className="modal-profile-section-image">
                    <img src="Images/girl.jpg" alt="" />
                  </div>
                  <div className="modal-add-res-section-profile">
                    <h5>Isha Bam</h5>
                  </div>
                </div>
                <div className="res-add-modal-title">
                  <input type="text" placeholder="Enter Title" />
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
                      onChange={handleChange}
                      accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"
                    />
                  </div>

                  <div className="modal-footer-link" onClick={() => {setLink(!link)}}>
                    <FontAwesomeIcon icon={faChain} className="fa-xl" />
                  </div>

                  {
                    link ? <div className="add-res-add-link">
                      <input type="text" placeholder="Enter Link" />
                    </div> : ''
                  }



                </div>

                <div>
                  <button className="btn btn-primary"
                   type="submit" variant="primary" onClick={handleClose}>
                    Add
                  </button>
                </div>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>

      <div className="res-table-div">
        <table class="table">
          <thead class="thead-light">

            <tr className="res-table-head">
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Created</th>
              {/* <th scope="col">Doc / Link</th> */}
            </tr>
            
          </thead>
          <tbody>


            <tr>
              <th scope="row">
                <div style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon
                    style={{ "margin-right": "10px" }}
                    icon={faFileLines}
                    className="fa"
                  />
                  Chapter 1
                </div>
                <div className="res-view-download">
                  <p>View</p>
                  <p>Download</p>
                </div>
              </th>
              <td>Isha Bam</td>
              <td>06-03-2023</td>
            </tr>

            <tr>
              <th scope="row">
                <div style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon
                    style={{ "margin-right": "10px" }}
                    icon={faChain}
                    className="fa"
                  />
                  Chapter 1
                </div>
                <div className="res-view-download">
                  <p>View</p>
                  {/* <p>Download</p> */}
                </div>
              </th>
              <td>Isha Bam</td>
              <td>06-03-2023</td>
            </tr>

            <tr>
              <th scope="row">
                <div style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon
                    style={{ "margin-right": "10px" }}
                    icon={faFileLines}
                    className="fa"
                  />
                  Chapter 1
                </div>
                <div className="res-view-download">
                  <p>View</p>
                  <p>Download</p>
                </div>
              </th>
              <td>Isha Bam</td>
              <td>06-03-2023</td>
            </tr>

            <tr>
              <th scope="row">
                <div style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon
                    style={{ "margin-right": "10px" }}
                    icon={faChain}
                    className="fa"
                  />
                  Chapter 1
                </div>
                <div className="res-view-download">
                  <p>View</p>
                  {/* <p>Download</p> */}
                </div>
              </th>
              <td>Isha Bam</td>
              <td>06-03-2023</td>
            </tr>


          </tbody>
        </table>
      </div>

      <div className="res-navigation">
        Viewing&nbsp;<span>1</span>-<span>6</span>&nbsp; of &nbsp;<span>6</span>
        &nbsp;page
      </div>

      {/* <nav aria-label="Page navigation example">
        <ul class="pagination res-navigation"  >
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
    </div>
  );
};

export default RescourcesTable;
