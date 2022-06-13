import React, { useEffect } from "react";

import TopNav from "./TopNav";
import Footer from "./Footer";
import "../banner.css";
import { useLocation } from "react-router-dom";

const Pstaffing = () => {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);
  return (
    <>
      <TopNav />
      <section id="permanentstaffing">
        <div className="staffing-head">
          <div className="staffing-content">
            <div className="pstaff-txt">
              <h2>Permanent Staffing </h2>
            </div>
            <div className="staff-pic-div">
              <img src="./hire.svg" alt="hire" className="staffpics" />
            </div>
          </div>
        </div>

        <div className="perstaff-content">
          <div className="phiring-left">
            <img src="./phiring.svg" alt="hire" className="staffpics" />
          </div>
          <div className="phiring-right">
            <h3>Recruitment</h3>
            <p>
              Hiring the right people in right time is one of the most
              challenging areas of the HR which impacts business. Two of the
              major factors being :
            </p>
            <p>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Time Consumed in scouting for the right fit</div>
              </div>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Cost incurred in the process</div>
              </div>
            </p>
            <p>
              We address these with finesse which lets you focus on your core
              business Based on the position we hire for, we employ both
              conventional and unconventional methods using a wide database and
              Platform.
            </p>
            <p>
              We have found success in using a combination of methodologies used
              in &nbsp;
              <b>
                Recruitment, Talent Acquisition, Head Hunting, Lateral Hiring
              </b>
              &nbsp; among conventional methods in the organised sectors.
            </p>
            <p>
              Most often than not, we have found success through out-of-the-box
              thinking and adapting unconventional approaches in domains
              experiencing highly volatile work-force.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Pstaffing;
