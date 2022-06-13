import React from "react";
import Footer from "./Footer";
import TopNav from "./TopNav";

const TempStaffing = () => {
  return (
    <>
      <TopNav />
      <section id="tempstaffing">
        <div className="staffing-head">
          <div className="staffing-content">
            <div className="pstaff-txt">
              <h2>Temporary Staffing </h2>
            </div>
            <div className="staff-pic-div">
              <img
                src="./tempstaff.svg"
                alt="temporarystaffing"
                className="staffpics"
              />
            </div>
          </div>
        </div>

        <div className="perstaff-content">
          <div className="phiring-right">
            <img src="./tempstaffing2.svg" alt="hire" className="staffpics" />
          </div>
          <div className="phiring-right">
            <h3>Temp Staffing : The Resource is yours and the Human ours!!</h3>
            <p>
              We endeavor to provide businesses the desired flexibility with
              temporary resources to be associated only functionally.We will
              handle all other aspects of employment of these resources –
              onboarding to exit:
            </p>
            <p>
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>
                  Disengagement of the resources, if required, post projects
                  instead of benching them OR
                </div>
              </div>
              <br />
              <div className="points-txt">
                <div>
                  <i class="bx bx-radio-circle-marked bullet" />
                </div>
                <div>
                  Absorption and regularization of valuable resources and
                  letting go off the remaining seamlessly.
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TempStaffing;
