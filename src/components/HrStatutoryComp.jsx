import React, { useEffect } from "react";
import Footer from "./Footer";
import TopNav from "./TopNav";
import { useLocation } from "react-router-dom";

const HrStatutoryComp = () => {
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

      <section id="tempstaffing">
        <div className="staffing-head">
          <div className="staffing-content">
            <div className="pstaff-txt">
              <h2>HR Statutory Compliance</h2>
            </div>
            <div className="staff-pic-div">
              <img
                src="./compliance1.svg"
                alt="temporarystaffing"
                className="staffpics"
              />
            </div>
          </div>
        </div>

        <div className="perstaff-content">
          <div className="phiring-left">
            <img src="./compliance2.svg" alt="hire" className="staffpics" />
          </div>
          <div className="phiring-right">
            <h3>Statutory Compliance</h3>
            <p>
              Compliance with statutes is critical and often complex by nature
              of its tedious process And extensive documentation which again has
              a TIME and COST implication on businesses.
            </p>

            <p>
              Our team of experienced professionals would ensure qualitative
              compliance of the Statutes related to HR while keeping you abreast
              of changing policies on time.
            </p>
            <p>
              We also aid in framing HR Policy, which makes room for
              organizations, particularly startups to be focused on the core
              business.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HrStatutoryComp;
