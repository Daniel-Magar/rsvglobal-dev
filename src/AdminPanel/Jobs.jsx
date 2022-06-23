import React, { useEffect, useState } from "react";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import Header from "./Header";
import SideNav from "./SideNav";
import SimpleDateTime from "react-simple-timestamp-to-date";
import ReadMore from "../ReadMore";
import Modal from "../Modal/Modal";

const Jobs = (props) => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

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
          <button className="btn-admin" type="submit">
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
          <Modal />
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

                <div class="my-table-body-cell thead">Applied Date</div>
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
