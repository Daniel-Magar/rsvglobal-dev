import React from "react";
import Carousel, { CarouselItem } from "./Carousel";

import { CarouselData } from "./CarouselData";
const Container = (props) => {
  return (
    <>
      <div>
        <div className="carousel">
          <Carousel style={{ display: "none!important" }}>
            {/* {CarousalData.map((pic) => {
          <CarouselItem>{pic.link}</CarouselItem>;
        })} */}
            <CarouselItem>
              <img
                src="./i1.jpg"
                alt=""
                className="imgresponsive"
                width="100%"
              />
            </CarouselItem>
            <CarouselItem>
              {" "}
              <img
                src="./i2.jpg"
                alt=""
                className="imgresponsive"
                width="100%"
              />
            </CarouselItem>
            <CarouselItem>
              {" "}
              <img
                src="./i3.jpg"
                alt=""
                className="imgresponsive"
                width="100%"
              />
            </CarouselItem>
          </Carousel>
        </div>
        {/* <div>
          <div className="contain">
            {CarouselData.map(({ item, idx }) => {
              <div key={idx}>
                <img src={item.value} alt="" />
              </div>;
            })}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Container;
