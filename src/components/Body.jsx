import React, { useEffect, useState } from "react";
import Aboutus from "./Aboutus";
import Container from "./Container";

const Body = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Product List Data

    <>
      <main>
        <section id="home">
          <Container />
        </section>

        <section id="about">
          <Aboutus />
        </section>
      </main>
    </>
  );
};

export default Body;
