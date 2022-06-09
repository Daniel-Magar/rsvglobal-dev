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
        <div className="staffing-head">jksfsfhsfhs</div>
      </section>

      <Footer />
    </>
  );
};

export default Pstaffing;
