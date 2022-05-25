import React, { useState, useEffect, useRef } from "react";
import "../career.css";
import "../messages.css";
import "../form.css";
import { storage } from "../firebase-config";
import ProgressBar from "./ProgressBar";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Modal from "react-modal";
import "../modal.css";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";
import TopNav from "./TopNav";
import Footer from "./Footer";
const CareerPage = (props) => {
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
  const [firstname, setFirstname] = useState("");
  const [qualification, setQualification] = useState("");
  const [appliedfor, setAppliedfor] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
    setShowResults(true);
    // setShowMsg(false);
  };
  const [querydata, setQuerydata] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("RESULT DATA:", querydata);
    var file = selectedFile;

    if (file === "" || file === undefined || file === null) {
      setShowMsg(true);
      setMsg("Please upload your CV in either .PDF or .DOCX extension.");
      setInterval(() => setShowMsg(false), 3000);
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

    for (let i in querydata) {
      console.log("input emails", email);

      if (email === querydata[i].emial_id) {
        console.log("Duplicate");
        setMsg("User existing! Please enter new valid email id. ");
        setShowMsg(true);
        setInterval(() => setShowResults(false), 5000);
        return;
      }
    }
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
            let temp = downloadURL;
            setImgUrl(temp);
            console.log("url --------------", imgUrl);

            addDoc(collection(db, "candidates"), {
              first_name: firstname,
              emial_id: email,
              phone_no: phno,
              qualification: qualification,
              appliedfor: appliedfor,

              fileURL: downloadURL,
              timestamp: Timestamp.now(),
            });
          });
        }
      );
    } catch (error) {
      setMsg("Oops! Please try again.");
      setShowMsg(true);
      e.target.reset();
      // setInterval(() => setShowMsg(false), 4000);
    }
    setInterval(() => setShowResults(false), 5000);
    setStatus("Completed!");
    e.target.reset();
  };

  const closebtn = (e) => {
    setIsOpen(false);
    setShowMsg(false);
    setIsFilePicked(false);
    setShowResults(false);
  };
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  useEffect(() => {}, [imgUrl]);
  useEffect(() => {
    try {
      const colRef = collection(db, "candidates");
      const q = query(
        colRef,

        where("emial_id", "==", email)
      );
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });
        console.log(asperquery);
        setQuerydata(asperquery);
      });
    } catch (error) {}
  }, [email]);

  return (
    <>
      <TopNav />
      <section id="career">
        <div className="career-flex-container">
          <div className="career-div">
            <img src="./career1.svg" alt="" className="career-img" />
          </div>

          <div className="career-div">
            <h1>Upload your resume here.</h1>
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
                  <div className=" cls-flex">
                    <div className="cls div1">
                      {" "}
                      <button onClick={closebtn} className="cls-btn">
                        <i class="bx bx-x"></i>
                      </button>
                    </div>

                    <div className="div2">
                      <h2>Enter Your Details</h2>
                    </div>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handleSubmit} className="upl-form">
                      <div>{showMsg ? <Message msg={msg} /> : null}</div>
                      <div className="form-body">
                        <label for="fname">First Name</label>
                        <input
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder="Your Full name.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />

                        <label for="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your email id.."
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label for="phno">Mobile Number</label>
                        <input
                          type="number"
                          id="phno"
                          name="phno"
                          placeholder="Your contact number.."
                          onChange={(e) => setPhno(e.target.value)}
                          required
                        />

                        <label for="qualification">Qualification</label>
                        <select
                          id="qualification"
                          name="qualification"
                          onChange={(e) => setQualification(e.target.value)}
                          required
                        >
                          <option>Select Qualification</option>
                          <option value="Post-Graduate">Post Graudate</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Under-Graduate">Under Graduate</option>
                        </select>
                        <label for="degree">Applied For</label>
                        <select
                          id="degree"
                          name="degree"
                          onChange={(e) => setAppliedfor(e.target.value)}
                          required
                        >
                          <option>Select Role</option>
                          <option value="Front End Developer">
                            Front End Developer
                          </option>
                          <option value="Back End Developer">
                            Back End Developer
                          </option>
                          <option value="Python Developer">
                            Python Developer
                          </option>
                          <option value="Java Developer">Java Developer</option>
                          <option value="Java Script Developer">
                            Java Script Developer
                          </option>
                          <option value="Node JS Developer">
                            Node JS Developer
                          </option>
                          <option value="React JS Developer">
                            React JS Developer
                          </option>
                        </select>
                        <div>
                          {showResults ? (
                            <Results
                              imgUrl={imgUrl}
                              progresspercent={progresspercent}
                              status={status}
                              isFilePicked={isFilePicked}
                              selectedFile={selectedFile}
                            />
                          ) : null}
                        </div>
                        <div className="up">
                          <div className="upd-file">
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
                            <button className="btn-upload" type="submit">
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
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          {/* {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />} */}
        </div>
      </section>
      <Footer />
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
