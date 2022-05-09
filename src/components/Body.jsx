import React from "react";

const Body = () => {
  return (
    <>
      <main>
        <section id="hero" className="body-content">
          <div>
            <img src="./hero.png" alt="" style={{ width: "100%" }} />
          </div>
        </section>
        <section
          id="about"
          className="body-content "
          style={{ padding: "24px" }}
        >
          <div>
            <div className="title">
              <h2 className="uline">
                <span>About</span>
              </h2>
            </div>

            <p>
              <b style={{ color: "red", fontSize: "1.6rem" }}>RSV </b>
              <b>Global</b>, with the leadership experience of 25 + years in the
              fields of Staffing, Recruitment, entire gamut of HR, Operations
              and Customer Relationship, is geared to be a partner in the areas
              of :
            </p>

            <div class="centered-content">
              <p className="c-list">
                <ul>
                  <li>
                    <i class="bx bx-globe"></i> Recruitment
                  </li>
                  <li>
                    <i class="bx bx-globe"></i> Temp Staffing
                  </li>
                  <li>
                    <i class="bx bx-globe"></i> HR Statutory Compliance
                  </li>
                  <li>
                    <i class="bx bx-globe"></i> Payroll Management
                  </li>
                </ul>
              </p>
            </div>
            <p>Each of the above by nature are heavy on time and cost.</p>
            <br />
            <p>
              By undertaking these processes for you, we provide you the
              opportunity to grow lean, focusing and growing on your core
              business objectives.
            </p>
          </div>
        </section>
        <section
          id="vision"
          className="body-content"
          style={{ padding: "24px" }}
        >
          <div>
            <div className="title">
              <h2 className="uline">
                <span>Vision</span>
              </h2>
            </div>
            <p>
              <p style={{ textAlign: "center" }}>
                To uphold the common welfare and enhance the benefits of all
                stakeholders.
              </p>
            </p>
            <div className="title" style={{ padding: "24px" }}>
              <h2 className="uline">
                <span>Mission</span>
              </h2>
            </div>
            <p>
              Endeavour to pass optimum benefit to Customers, business partners
              and employees; contribute to the society by spreading awareness of
              available employment opportunities by optimum use of technology.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Body;
