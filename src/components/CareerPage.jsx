import React, { useState, useEffect } from "react";
import "../career.css";
import { storage } from "../firebase-config";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const CareerPage = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [upfile, setUpfile] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const file = e.target[0]?.files[0];

    console.log(file.size);
    if (file.size > 50000) {
      alert("File Size is too big, Please upload a file not more than 50 MB");
      return;
    }

    if (!file) return;
    let random = randomString(
      6,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, random);
    const storageRef = ref(storage, `resume/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  return (
    <>
      <section id="career">
        <div className="career-flex-container">
          <div className="career-div">
            <img src="./career1.svg" alt="" className="career-img" />
          </div>
          <div className="career-div">
            <h1>Upload your resume here.</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="custom-file-input"
                type="file"
                name="file"
                accept={".pdf"}
              />
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
              {!imgUrl && (
                <div className="outerbar">
                  <div
                    className="innerbar"
                    style={{ width: `${progresspercent}%` }}
                  >
                    {progresspercent}%
                  </div>
                </div>
              )}
              {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
              {imgUrl && <iframe src={imgUrl}></iframe>}
            </form>

            {/* <button className="btn-upload">
              <div className="btn-content">
                <div className="btn-sub">Upload</div>
                <div className="btn-sub">
                  <i
                    class="bx bx-upload"
                    style={{ color: "white", fontSize: "22px" }}
                  ></i>
                </div>
              </div>
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerPage;
