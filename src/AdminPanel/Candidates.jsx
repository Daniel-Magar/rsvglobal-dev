import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import Header from "./Header";

import SimpleDateTime from "react-simple-timestamp-to-date";

const Candidates = (props) => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);
  console.log("------", props.candidates);
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
            <i className="bx bx-list-ul"></i>List of Candidates
          </h4>
        </div>

        <div className="admin-container">
          <div className="my-table">
            <div className="my-table-body">
              <div className="my-table-row">
                <div class="my-table-body-cell thead">Candidate Name</div>
                <div class="my-table-body-cell thead">Email Id</div>
                <div class="my-table-body-cell thead">Mobile No</div>
                <div class="my-table-body-cell thead">Qualification</div>
                <div class="my-table-body-cell thead">Applied For</div>
                <div class="my-table-body-cell thead">Applied Type</div>
                <div class="my-table-body-cell thead">Current Location</div>
                <div class="my-table-body-cell thead">Preferred Location</div>
                <div class="my-table-body-cell thead">Covid Vaccinated</div>
                <div class="my-table-body-cell thead">Applied Date</div>
                <div class="my-table-body-cell thead">CV</div>
              </div>

              {props.candidates.length > 0 ? (
                props.candidates.map((data, idx) => (
                  <div className="my-table-row" key={idx}>
                    <div class="my-table-body-cell">{data.first_name}</div>
                    <div class="my-table-body-cell">{data.emial_id}</div>
                    <div class="my-table-body-cell">{data.phone_no}</div>
                    <div class="my-table-body-cell">{data.qualification}</div>
                    <div class="my-table-body-cell">{data.jobtitle}</div>
                    <div class="my-table-body-cell">{data.applied_type}</div>
                    <div class="my-table-body-cell">
                      {data.cuurent_location}
                    </div>
                    <div class="my-table-body-cell">
                      {data.preferred_location}
                    </div>
                    <div class="my-table-body-cell">{data.vaccinated}</div>
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
                      <a href={`${data.fileURL}`} target="_blank">
                        Download
                      </a>
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

export default Candidates;
