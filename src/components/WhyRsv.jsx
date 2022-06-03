import React from "react";
import "../whyrsv.css";

const WhyRsv = () => {
  return (
    <>
      <div className="abt-main">
        <div className="about-section">
          <div className="about-abt" style={{ width: "30%" }}>
            <img src="./why.svg" alt="why rsv" width="350" />
          </div>
          <div className="about-abt" style={{ width: "70%" }}>
            <p className="text">
              <b className="rsv-global">Why RSV</b>
              <b className="global">Global?</b>
            </p>
            <div className="why-content-parent">
              <div className="why-content">
                <h4> We engage :</h4>
                <div class="why-flex">
                  <div class="why-flex-left">
                    <i class="bx bx-radio-circle-marked bullet" />
                  </div>
                  <div class="why-flex-right">
                    Highly competent professionals across domains
                  </div>
                </div>
                <div class="why-flex">
                  <div class="why-flex-left">
                    <i class="bx bx-radio-circle-marked bullet" />
                  </div>
                  <div class="why-flex-right">State-of-the-art Technology </div>
                </div>
              </div>
              <div className="why-content">
                <h4> We are:</h4>
                <div class="why-flex">
                  <div class="why-flex-left">
                    <i class="bx bx-radio-circle-marked bullet" />
                  </div>
                  <div class="why-flex-right">
                    Proactive Responsive Driven by Passion Governed by Ethics
                  </div>
                </div>
                <div class="why-flex">
                  <div class="why-flex-left">
                    <i class="bx bx-radio-circle-marked bullet" />
                  </div>
                  <div class="why-flex-right">State-of-the-art Technology </div>
                </div>
              </div>
            </div>

            {/* <p className="text">
              <b className="rsv-global">Why RSV</b>
              <b className="global">Global?</b>
            </p>
            <p className="text">
              We engage : <br />
              <i class="bx bx-radio-circle-marked bullet"></i> Highly competent
              professionals across domains <br />
              <i class="bx bx-radio-circle-marked bullet"></i> State-of-the-art
              Technology of
            </p>
            <p className="text">
              We are : Proactive Responsive Driven by Passion Governed by Ethics
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyRsv;
