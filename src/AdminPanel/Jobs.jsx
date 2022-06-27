import React, { useEffect, useState } from "react";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import Header from "./Header";
import SideNav from "./SideNav";
import SimpleDateTime from "react-simple-timestamp-to-date";
import ReadMore from "../ReadMore";
import Modal from "../Modal/Modal";
import ModalEdit from "../Modal/ModalEdit";
import showAtom from "../Recoil/showAtom";
import show2Atom from "../Recoil/show2Atom";
import closeAtom from "../Recoil/closeAtom";

const Jobs = (props) => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);
  const [show, setShow] = useRecoilState(showAtom);
  const [show2, setShow2] = useRecoilState(show2Atom);
  const [closeStatus, setCloseStaus] = useRecoilState(closeAtom);
  const [editFormData, setEditFormData] = useState({
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
  const editItem = (item) => {
    console.log("Item selected: ", item);
    setEditFormData({
      id: item.id,
      jobtitle: item.jobtitle,
      qualification: item.qualification,
      jobdescrp: item.jobdescrp,
      skill: item.skill,
      secskill: item.secskill,
      location: item.location,
      experience: item.experience,
      ctc: item.ctc,
      noticeperiod: item.noticeperiod,
    });
  };
  return (
    <>
      <SideNav />

      <div
        className={`content-admin ${
          toggle ? "admin-active" : "admin-inactive"
        }`}
      >
        <Header />
        <div className="page-title">
          <h4>
            <i className="bx bx-list-ul"></i>List of Posted Jobs
          </h4>
        </div>

        <div className="admin-container">
          <button
            className="btn-admin"
            onClick={() => {
              setShow(true);
              setCloseStaus(false);
            }}
          >
            <div className="btn-content">
              <div className="btn-sub">Post</div>
              <div className="btn-sub">
                <i
                  className="bx bx-edit"
                  style={{
                    color: "white",
                    fontSize: "22px",
                    padding: "4px",
                  }}
                />
              </div>
            </div>
          </button>
          <Modal title="Post New Job" editItem={editItem ? editFormData : ""} />
          <ModalEdit title="Edit Job" editFormData={editFormData} />
          <div className="my-table">
            <div className="my-table-body">
              <div className="my-table-row">
                <div class="my-table-body-cell thead">Job Title</div>
                <div class="my-table-body-cell thead">Description</div>
                <div class="my-table-body-cell thead">Primary Skill</div>
                <div class="my-table-body-cell thead">Secodary Skill</div>
                <div class="my-table-body-cell thead">Qualification</div>

                <div class="my-table-body-cell thead">Notice Period</div>
                <div class="my-table-body-cell thead">Location</div>

                <div class="my-table-body-cell thead">Job Posted On</div>
                <div class="my-table-body-cell thead">Action</div>
              </div>

              {props.jobposts.length > 0 ? (
                props.jobposts.map((data, idx) => (
                  <div className="my-table-row" key={idx}>
                    <div class="my-table-body-cell">{data.jobtitle}</div>
                    <div class="my-table-body-cell">
                      <ReadMore>{data.jobdescrp}</ReadMore>
                    </div>
                    <div class="my-table-body-cell">
                      {data.skill.length >= 100 ? (
                        <ReadMore>{data.skill}</ReadMore>
                      ) : (
                        <div>{data.skill}</div>
                      )}
                    </div>
                    <div class="my-table-body-cell">
                      {data.secskill.length > 0 ? (
                        <ReadMore>{data.secskill}</ReadMore>
                      ) : (
                        <div>No Secondary Skill...</div>
                      )}
                    </div>
                    <div class="my-table-body-cell">{data.qualification}</div>

                    <div class="my-table-body-cell">{data.noticeperiod}</div>
                    <div class="my-table-body-cell">{data.location}</div>

                    <div class="my-table-body-cell">
                      <SimpleDateTime
                        dateFormat="DMY"
                        dateSeparator="/"
                        timeSeparator=":"
                        showTime="0"
                      >
                        {data.timestamp.toDate()}
                      </SimpleDateTime>
                    </div>
                    <div class="my-table-body-cell">
                      <div className="action">
                        <div>
                          <button
                            className="btn-admin"
                            onClick={() => {
                              setShow2(true);
                              setCloseStaus(false);
                              editItem(data);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button className="btn-delete ">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nodata">No Data avaliable....</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
