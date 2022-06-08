import React, { useEffect } from "react";
import WhyRsv from "./WhyRsv";
import Contact from "./Contact";
import TopNav from "./TopNav";
import Footer from "./Footer";
import "../banner.css";

const Pstaffing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TopNav />
      <section id="permanentstaffing">
        <div className="banner-flex-container">
          <div className="banner-flex-item-left">
            <div className="banner-left">
              <div className="banner-svg">
                <img src="./ellipse1.png" alt="ellipse" className="ellipse" />
              </div>
              <div className="banner-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </div>
          </div>
          <div className="banner-flex-item-right">
            <img src="./Group2.png" alt="group2" className="heropic" />
          </div>
        </div>
        <div className="services">
          <div className="services-container">
            <div className="services-txt">
              <h3>Services We Offer</h3>
            </div>
            <div class="service-container">
              <div class="service-item">
                <div>
                  <img src="./pstaff.svg" alt="Permanent Staffing" />
                  <p>Permanent Staffing</p>
                </div>
              </div>
              <div class="service-item">
                <div>
                  <img src="./temprstaff.svg" alt="Temporary Staffing" />
                  <p>Temporary Staffing</p>
                </div>
              </div>
              <div class="service-item">
                <div>
                  <img src="./payroll123.svg" alt="Payroll Management" />
                  <p>Payroll Management</p>
                </div>
              </div>
              <div class="service-item">
                <div>
                  <img src="./compliance.svg" alt="Compliance Management" />
                  <p>Compliance Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="whyrsv">
        <WhyRsv />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
};

export default Pstaffing;
