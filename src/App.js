import "./App.css";
import "./carousel.css";

import Body from "./components/Body";
import { Routes, Route, Navigate } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";
import Aboutus from "./components/Aboutus";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CareerPage from "./components/CareerPage";
import React, { useState, useEffect } from "react";
import CandidateList from "./Admin/CandidateList";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase-config";
import Admin from "./Admin/Admin";
import PostJobs from "./Admin/PostJobs";
import Login from "./Login";
import Career from "./components/Career";
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

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
    const abortCont = new AbortController();
    try {
      const colRef = collection(db, "job_posts");
      const q = query(colRef, orderBy("timestamp", "desc"));
      onSnapshot(q, { signal: abortCont.signal }, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });
        let temp = [];
        temp.push(asperquery);
        setJobposts(asperquery);
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted!"); // catching error in updating component
      }
    }
    return () => abortCont.abort();
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route path="/home" element={<Body />} />
          <Route path="permanentstaffing" element={<Pstaffing />} />
          {/* <Route
            path="career"
            element={<CareerPage candidates={candidates} />}
          /> */}
          <Route path="career" element={<Career jobposts={jobposts} />} />

          <Route path="*" element={<Body />} />
          <Route path="/login" element={<Login />} />

          <Route exact path="/admin">
            <Route
              index
              element={
                <RequireAuth>
                  <Admin candidates={candidates} jobposts={jobposts} />
                </RequireAuth>
              }
            />
          </Route>

          <Route exact path="/admin/candidates">
            <Route
              index
              element={
                <RequireAuth>
                  <CandidateList candidates={candidates} />
                </RequireAuth>
              }
            />
          </Route>
          <Route exact path="/admin/postjobs">
            <Route
              index
              element={
                <RequireAuth>
                  <PostJobs jobposts={jobposts} />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
