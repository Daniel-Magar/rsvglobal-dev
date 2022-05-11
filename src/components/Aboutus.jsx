import React from "react";

const Aboutus = () => {
  return (
    <>
      <section id="about">
        <div className="abt-main">
          <div className="about-section">
            <div className="about-abt" style={{ width: "30%" }}>
              {/* <p className="abt-text"> About</p> */}
              <p className="text">
                <b className="rsv-global">RSV</b>
                <b className="global">Global</b>
              </p>
            </div>
            <div className="about-abt" style={{ width: "70%" }}>
              <p className="text">
                RSV Global, with the leadership experience of 25+ years in the
                fields of staffing, Recruitment, entire gamut of HR, Operation
                and Customer Relationship, is geared to be a partner in the
                areas of:
              </p>
            </div>
          </div>
          <div className="abt-subcontent">
            <div className="abt-subcontent-content">
              <div className="d">
                <div className="in1">
                  <i
                    class="bx bxs-briefcase-alt-2"
                    style={{ fontSize: "50px", color: "#2800d1" }}
                  ></i>
                </div>
                <div className="in2">Recruitment</div>
              </div>
              <div className="d">
                <div className="in1">
                  <img src="./staff.png" alt="" width="50px" />
                </div>
                <div className="in2">Temp Staffing</div>
              </div>
              <div className="d">
                <div className="in1">
                  <img src="./balance.png" alt="" width="50px" />
                </div>
                <div className="in2">HR Statutory Compliance</div>
              </div>
              <div className="d">
                <div className="in1">
                  <img src="./payroll.png" alt="" width="50px" />
                </div>
                <div className="in2">Payroll Management</div>
              </div>
            </div>
          </div>
          <div className="ptext">
            <p className="texttext">
              Each of the above by nature are heavy in time and cost.
            </p>
            <br />
            <p className="texttext">
              By undertaking these processess for you, we provide you the
              opportunity to grow lean, focusing and growing on your core buiess
              objectives.
            </p>
          </div>
          <div class="flex-container">
            <div class="flex-item-left">
              <img src="./group.png" alt="about" className="responsiveimg" />
            </div>
          </div>
        </div>
        {/* <div className="about">
          <div className="about-item-left">
            <div className="about-abt">
              <p className="section-intro"> About us</p>
              <p>
                <b className="abt-global">RSV</b> &nbsp;
                <b>Global</b>
              </p>
            </div>
          </div>
          <div className="about-item-right">
            <p>
              RSV Global, with the leadership experience of 25+ years in the
              fields of staffing, Recruitment, entire gamut of HR, Operation and
              Customer Relationship, is geared to be a partner in the areas of:
            </p>
          </div>
        </div>

        <div className="flex-container ">
          <div className="flex-item">
            <img src="./recruitment.png" alt="" />
          </div>
          <div className="flex-item fitem" style={{ lineHeight: "78px" }}>
            Recruitment
          </div>
          <div className="flex-item">
            <img src="./staff.png" alt="" />
          </div>
          <div className="flex-item fitem">Temp Staffing</div>
          <div className="flex-item">
            {" "}
            <img src="./balance.png" alt="" />
          </div>
          <div className="flex-item fitem">HR Statutory Compliance</div>
          <div className="flex-item">
            {" "}
            <img src="./payroll.png" alt="" style={{ width: "50px" }} />
          </div>
          <div className="flex-item fitem">Payroll Management</div>
        </div>
        <div className="abt-sec">
          <div class="about-abt">
            <div>
              <p className="texttext">
                Each of the above by nature are heavy in time and cost.
              </p>
              <br />
              <p className="texttext">
                By undertaking these processess for you, we provide you the
                opportunity to grow lean, focusing and growing on your core
                buiess objectives.
              </p>
            </div>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item-left">
            <img src="./group.png" alt="" className="img" />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Aboutus;
