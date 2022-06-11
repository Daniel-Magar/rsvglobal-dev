import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../footer.css";
import { NavHashLink } from "react-router-hash-link";

const Footer = () => {
  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, []);
  return (
    <>
      <footer className="rsv-footer">
        <div className="main-footer">
          <div className="logoinfo" data-aos="fade-up">
            <h3>
              {" "}
              <span style={{ color: "rgb(247, 71, 73)" }}>RSV</span> &nbsp;
              <span style={{ color: "white" }}>Global</span>
            </h3>

            <div className="contact-details">
              <h1>Contact us</h1>

              <li>
                <div className="bx bxs-phone footer-icn"></div>
                <a href="tel:+919326048690">+91 8610869322</a>
              </li>
              <li>
                <div className="bx bxs-envelope footer-icn"></div>
                <a href="mailto:yourmail@gmail.com"> balaji@rsvglobal.in</a>
              </li>
              <li>
                <div className="bx bxs-map footer-icn"></div>
                <a href="https://goo.gl/maps/EexKuS4jUW3TKAUR7" target="_blank">
                  {" "}
                  rsvglobal
                </a>
              </li>
            </div>
          </div>
          <div className="com ">
            <h1>About</h1>
            <ul>
              <li>
                <NavHashLink to="/#home">Home</NavHashLink>
              </li>

              <li>
                <NavHashLink to="/#about">About</NavHashLink>
              </li>
              <li>
                <NavHashLink to="/#whyrsv">Why RSV</NavHashLink>
              </li>
              <li>
                <NavHashLink to="/#contact">Contact us</NavHashLink>
              </li>
              <li>
                <Link to="/career">Career</Link>
              </li>
            </ul>
          </div>
          <div className="info" data-aos="fade-up">
            <h1>Social Media</h1>
            <div className="sociallogos">
              <div className="logobox">
                <a href="#" class="bx bxl-instagram footer-icn"></a>
                <a href="#" class="bx bxl-linkedin footer-icn"></a>
                <a href="#" class="bx bxl-facebook footer-icn"></a>
                <a href="#" class="bx bxl-youtube footer-icn"></a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrt">
          © Copyright RSV Global-{date} All Rights Reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;
