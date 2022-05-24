import "./App.css";
import "./carousel.css";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import Body from "./components/Body";
import { Routes, Route, Navigate } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";
import Aboutus from "./components/Aboutus";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CareerPage from "./components/CareerPage";
import React, { useState, useEffect, createContext } from "react";
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
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/home" />;
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

        <Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            index
            element={
              <RequireAuth>
                <Admin candidates={candidates} jobposts={jobposts} />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="admin/candidates"
            element={
              <RequireAuth>
                <CandidateList candidates={candidates} />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="admin/postjobs"
            element={
              <RequireAuth>
                <PostJobs jobposts={jobposts} />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <RequireAuth>
                <Admin candidates={candidates} jobposts={jobposts} />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<Body />} />
      </Routes>
    </>
  );
}

export default App;
