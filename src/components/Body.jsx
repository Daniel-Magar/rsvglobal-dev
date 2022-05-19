import React, { useEffect, useState } from "react";
import { Footer } from "rsuite";
import Aboutus from "./Aboutus";
import Container from "./Container";
import TopNav from "./TopNav";

const Body = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Product List Data

    <>
      <TopNav />
      <main>
        <section id="home">
          <Container />
        </section>

        <section id="about">
          <Aboutus />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Body;
