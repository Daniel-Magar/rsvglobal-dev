import React, { useEffect } from "react";
// import { Footer } from "rsuite";
import TopNav from "./TopNav";
import Footer from "./Footer";

const Pstaffing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TopNav />
      <section id="permanentstaffing">
        <div className="flex-container">
          <div className="flex-item-left">
            <div className="hero-text">
              <div className="hero-ellipse">
                <img src="./ellipse1.png" alt="ellipse" className="ellipse" />
              </div>
              <div className="hero-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </div>
          </div>
          <div className="flex-item-right">
            <img src="./Group2.png" alt="group2" className="heropic" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pstaffing;
