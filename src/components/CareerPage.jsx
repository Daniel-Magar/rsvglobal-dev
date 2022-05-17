import React, { useState, useEffect, useRef } from "react";
import "../career.css";
import "../messages.css";
import "../form.css";
import { storage } from "../firebase-config";
import ProgressBar from "./ProgressBar";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Modal from "react-modal";
import "../modal.css";
const CareerPage = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [status, setStatus] = useState("");

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [showResults, setShowResults] = React.useState(false);
  const [showMsg, setShowMsg] = React.useState(false);
  const [msg, setMsg] = useState("");
  const reference = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
    setShowResults(true);
    setShowMsg(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var file = e.target[0]?.files[0];
    if (file === "" || file === undefined || file === null) {
      setShowMsg(true);
      setMsg("Please upload your CV in either .PDF or .DOCX extension.");

      return;
    } else {
      setShowMsg(false);
    }
    if (file.size > 2048000) {
      setShowMsg(true);
      // setInterval(() => setShowMsg(false), 6000);
      setMsg("File Size is too big, Please upload a file not more than 2 MB");

      return;
    } else {
      setShowMsg(false);
    }

    if (!file) return;
    let random = randomString(
      6,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, random);
    const storageRef = ref(storage, `resume/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setInterval(() => setShowMsg(false), 3000);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            setInterval(() => setShowResults(false), 5000);
            setStatus("Completed!");
            e.target.reset();
          });
        }
      );
      e.target.reset();
    } catch (error) {
      setMsg("Oops! Please try again.");
      setShowMsg(true);
      e.target.reset();
      // setInterval(() => setShowMsg(false), 4000);
    }
  };
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  // useEffect(() => {
  //   setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  // }, []);
  return (
    <>
      <section id="career">
        <div className="career-flex-container">
          <div className="career-div">
            <img src="./career1.svg" alt="" className="career-img" />
          </div>
          <div className="career-div">
            <div className="App">
              <button className="btn-upload" onClick={() => setIsOpen(true)}>
                Upload CV
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                overlayClassName={{
                  base: "overlay-base",
                  afterOpen: "overlay-after",
                  beforeClose: "overlay-before",
                }}
                className={{
                  base: "content-base",
                  afterOpen: "content-after",
                  beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
              >
                <div>
                  <div className="cls">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="cls-btn"
                    >
                      <i class="bx bx-x"></i>
                    </button>
                  </div>
                  {showMsg ? <Message msg={msg} /> : null}
                  <div className="modal-body">
                    <form action="">
                      <label for="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                      />

                      <label for="lname">Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Your last name.."
                      />

                      <label for="country">Country</label>
                      <select id="country" name="country">
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                      </select>

                      <label class="btn fileUpload btn-default">
                        Select file
                        <input
                          type="file"
                          hidden=""
                          accept={".pdf"}
                          onChange={changeHandler}
                          ref={reference}
                        />
                        <i
                          class="bx bx-file"
                          style={{ color: "white", fontSize: "20px" }}
                        ></i>
                      </label>

                      <button className="btn-upload" onClick={handleSubmit}>
                        <div className="btn-content">
                          <div className="btn-sub">Upload</div>
                          <div className="btn-sub">
                            <i
                              class="bx bx-upload"
                              style={{ color: "white", fontSize: "22px" }}
                            ></i>
                          </div>
                        </div>
                      </button>
                      {showResults ? (
                        <Results
                          imgUrl={imgUrl}
                          progresspercent={progresspercent}
                          status={status}
                          isFilePicked={isFilePicked}
                          selectedFile={selectedFile}
                        />
                      ) : null}
                    </form>
                  </div>
                </div>
              </Modal>
            </div>

            <h1>Upload your resume here.</h1>
          </div>
        </div>
      </section>
    </>
  );
};
const Results = (props) => (
  <div id="results" className="search-results">
    <div>
      {!props.imgUrl && (
        <div className="outerbar">
          <div className="App">
            <ProgressBar
              bgcolor="rgb(247, 71, 73)"
              completed={props.progresspercent}
            />
          </div>
        </div>
      )}
      {props.imgUrl && <h1>{props.status}</h1>}
      {props.isFilePicked ? (
        <div>
          <p>Filename: {props.selectedFile.name}</p>

          <p>Filetype: {props.selectedFile.type}</p>

          <p>Size: {props.selectedFile.size / 1000} kB</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  </div>
);
const Message = (props) => (
  <>
    <div>
      {/* <div class="bar">Plain message</div>
        <div class="bar info">Information message</div>
        <div class="bar success">Successful message</div>
        <div class="bar warn">Warning message</div> */}
      <div className="bar error">{props.msg}</div>
    </div>
  </>
);

export default CareerPage;
