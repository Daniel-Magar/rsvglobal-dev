import "./App.css";
import "./carousel.css";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import Body from "./components/Body";
import { Routes, Route, Link } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";
import Aboutus from "./components/Aboutus";
import CareerPage from "./components/CareerPage";
import React, { useState, useEffect, createContext } from "react";
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
  onSnapshot,
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [jobposts, setJobposts] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "job_posts");
      const q = query(colRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });
        let temp = [];
        temp.push(asperquery);
        setJobposts(asperquery);
      });
    } catch (error) {}
    // const colRef = collection(db, "job_posts");
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let productdb = [];
    //     snapshot.docs.forEach((doc) => {
    //       productdb.push({ ...doc.data(), id: doc.id });
    //     });
    //     let temp = [];
    //     temp.push(productdb);
    //     setJobposts(productdb);
    //     console.log("list of jobs posted:", jobposts);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, []);
  const JobPosts = createContext();
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
          element={<PostJobs jobposts={jobposts} />}
        />
      </Routes>
    </>
  );
}

export default App;
