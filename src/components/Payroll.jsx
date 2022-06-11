import React from "react";
import Footer from "./Footer";
import TopNav from "./TopNav";

const Payroll = () => {
  return (
    <>
      <TopNav />
      <section id="tempstaffing">
        <div className="staffing-head">
          <div className="staffing-content">
            <div className="pstaff-txt">
              <h2>Payroll </h2>
            </div>
            <div className="staff-pic-div">
              <img
                src="./payroll.svg"
                alt="temporarystaffing"
                className="staffpics"
              />
            </div>
          </div>
        </div>

        <div className="perstaff-content">
          <div className="phiring-right">
            <img src="./payroll2.svg" alt="hire" className="staffpics" />
          </div>
          <div className="phiring-right">
            <h3>Payroll</h3>
            <p>
              Nearly half a month of a payroll executive is consumed in managing
              attendance, leave, payroll and post payroll activities. Bigger the
              team, more the time. A real challenge for organizations to
              rationalize the time and cost or optimize the resource.
            </p>
            <p>
              Gain by outsourcing on :
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Time</div>
              </div>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Investment</div>
              </div>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Expenditure</div>
              </div>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>Energy</div>
              </div>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Payroll;