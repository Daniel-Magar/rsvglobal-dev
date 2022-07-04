import React, { useState } from "react";
import { useRecoilState } from "recoil";
import DropDown from "../AdminPanel/DropDown";
import "../AdminPanel/dropdown.css";
import closeAtom from "../Recoil/closeAtom";
import showAtom from "../Recoil/showAtom";

const Modal = (props) => {
  const [closeStatus, setCloseStatus] = useRecoilState(closeAtom);

  const [show, setShow] = useRecoilState(showAtom);

  const [postData, setPostData] = useState({
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    secskill: "",
    location: "",
    experience: "",
    ctc: "",
    noticeperiod: "",
    editedon: "",
  });

  return (
    <>
      <div
        className={`modal ${show ? "show" : "hide"}`}
        onClick={() => setShow(!show)}
      >
        <div
          className={`  ${closeStatus ? "hide" : "modal-content"} `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-bodee">
            <div className="job-form">
              <form className="jform">
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="jobtitle">Job Title:</label>
                  </div>
                  <div className="form-right">
                    <input type="text" name="jobtitle" required />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="jobdescrp">Job Description:</label>
                  </div>
                  <div className="form-right">
                    <textarea
                      id="jobdescrp"
                      name="jobdescrp"
                      rows="4"
                      cols="51"
                    />
                  </div>
                </div>

                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="experience">Experience:</label>
                  </div>
                  <div className="form-right">
                    <input type="text" name="experience" />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="pskill">Primary Skill:</label>
                  </div>
                  <div className="form-right">
                    <textarea id="pskill" name="pskill" rows="4" cols="51" />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="sskill">Secondary Skill:</label>
                  </div>
                  <div className="form-right">
                    <textarea id="sskill" name="sskill" rows="4" cols="51" />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="ctc">CTC:</label>
                  </div>
                  <div className="form-right">
                    <input type="text" name="ctc" />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="location">Location:</label>
                  </div>
                  <div className="form-right">
                    <DropDown />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="notice-period">
                      Notice Period: <br />
                      (Days)
                    </label>
                  </div>
                  <div className="form-right">
                    <input type="text" name="notice-period" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-flex">
              <div>
                <button
                  className="btn-delete"
                  onClick={() => {
                    setCloseStatus(true);
                    setShow(false);
                  }}
                >
                  Close
                </button>
              </div>
              <div>
                <button
                  className="modal-cls-btn"
                  onClick={() => {
                    setCloseStatus(true);
                    setShow(false);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
