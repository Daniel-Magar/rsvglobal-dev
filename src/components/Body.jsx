import React, { useEffect } from "react";
import Aboutus from "./Aboutus";
import Container from "./Container";
const Body = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
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
