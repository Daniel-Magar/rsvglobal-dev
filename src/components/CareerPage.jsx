import React from "react";
import "../career.css";

const CareerPage = () => {
  return (
    <>
      <section id="career">
        <div className="career-flex-container">
          <div className="career-div">
            <img src="./career1.svg" alt="" className="career-img" />
          </div>
          <div className="career-div">
            <h1>Upload your resume here.</h1>
            <form>
              <input
                className="custom-file-input"
                type="file"
                name="file"
                // onChange={changeHandler}
                accept={".csv"}
              />

              {/* {isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>

                  <p>Filetype: {selectedFile.type}</p>

                  <p>Size in bytes: {selectedFile.size}</p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )} */}
            </form>

            <button className="btn-upload">
              <div className="btn-content">
                <div className="btn-sub">Upload</div>
                <div className="btn-sub">
                  <i
                    class="bx bx-upload"
                    style={{ color: "white", fontSize: "22px" }}
                  ></i>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerPage;
