import "./App.css";
import "./carousel.css";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import Body from "./components/Body";
import { Routes, Route, Link } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";
import Aboutus from "./components/Aboutus";
import CareerPage from "./components/CareerPage";
import React, { useState, useEffect } from "react";
import CandidateList from "./Admin/CandidateList";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  doc,
  writeBatch,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import Admin from "./Admin/Admin";
import PostJobs from "./Admin/PostJobs";
function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    console.log("----------------------");
    const colRef = collection(db, "candidates");
    getDocs(colRef)
      .then((snapshot) => {
        let productdb = [];
        snapshot.docs.forEach((doc) => {
          productdb.push({ ...doc.data(), id: doc.id });
        });
        let temp = [];
        temp.push(productdb);
        setCandidates(productdb);
        console.log("list of candidates", candidates);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route path="/home" element={<Body />} />
        <Route path="permanentstaffing" element={<Pstaffing />} />
        <Route path="career" element={<CareerPage candidates={candidates} />} />

        <Route path="*" element={<Body />} />

        <Route exact path="admin" element={<Admin candidates={candidates} />} />
        <Route path="/" element={<Admin candidates={candidates} />} />

        <Route
          exact
          path="admin/candidates"
          element={<CandidateList candidates={candidates} />}
        />
        <Route
          exact
          path="admin/postjobs"
          element={<PostJobs candidates={candidates} />}
        />
      </Routes>
    </>
  );
}

export default App;
