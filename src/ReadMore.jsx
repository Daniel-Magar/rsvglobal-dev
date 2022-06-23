import React, { useState } from "react";
const ReadMore = ({ children }) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="readmoreless-text">
      {isReadMore ? text.slice(0, 180) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...Read more ▼" : " .Read less ▲"}
      </span>
    </p>
  );
};
export default ReadMore;
