import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Aboutus from "./Aboutus";
import Container from "./Container";
import TopNav from "./TopNav";
import WhyRsv from "./WhyRsv";
import Contact from "./Contact";

const Body = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Product List Data

    <>
      <div>
        <TopNav />
        <main>
          <section id="home">
            <Container />
          </section>

          <section id="about">
            <Aboutus />
          </section>
          <section id="whyrsv">
            <WhyRsv />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Body;
