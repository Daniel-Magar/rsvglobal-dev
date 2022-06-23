import "./App.css";
import "./carousel.css";

import Body from "./components/Body";
import { Routes, Route, Navigate } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import React, { useState, useEffect } from "react";
import CandidateList from "./Admin/CandidateList";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase-config";
import Admin from "./Admin/Admin";
import PostJobs from "./Admin/PostJobs";
import Login from "./Login";
import Career from "./components/Career";
import ApplyJob from "./components/ApplyJob";
import CareerCVupload from "./components/CareerCVupload";
import WhyRsv from "./components/WhyRsv";
import Contact from "./components/Contact";
import { BusinessRequiredProvider } from "./context/BussinessRquiredContext";
import { LocationProvider } from "./context/LocationContext";
import { QualificationProvider } from "./context/QualificationContext";
import { LanguagesProvider } from "./context/LanguagesContext";
import TempStaffing from "./components/TempStaffing";
import HrStatutoryComp from "./components/HrStatutoryComp";
import Payroll from "./components/Payroll";
import Clients from "./Admin/Clients";

import AdminDashboard from "./AdminPanel/AdminDashboard";
import Candidates from "./AdminPanel/Candidates";
import Client from "./AdminPanel/Client";
import Jobs from "./AdminPanel/Jobs";
import CandidatesAtom from "./Recoil/CandidatesAtom";
import { useRecoilState } from "recoil";
function App(props) {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    try {
      const colRef = collection(db, "candidates");
      const q = query(colRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        let productdb = [];
        snapshot.docs.forEach((doc) => {
          productdb.push({ ...doc.data(), id: doc.id });
        });
        let temp = [];
        temp.push(productdb);
        setCandidates(productdb);
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted!"); // catching error in updating component
      }
    }
    return () => abortCont.abort();
  }, []);

  const [jobposts, setJobposts] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
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
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted!"); // catching error in updating component
      }
    }
    return () => abortCont.abort();
  }, []);

  const [clients, setClients] = useState([]);
  useEffect(() => {
    const abortCont = new AbortController();
    try {
      const colRef = collection(db, "business");
      const q = query(colRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });
        let temp = [];
        temp.push(asperquery);
        setClients(asperquery);
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
        <LanguagesProvider>
          <QualificationProvider>
            <BusinessRequiredProvider>
              <LocationProvider>
                <Routes>
                  <Route exact path="/" element={<Body />} />
                  <Route path="/home" element={<Body />} />
                  <Route path="permanentstaffing" element={<Pstaffing />} />
                  <Route path="admindashboard" element={<AdminDashboard />} />
                  <Route path="/tempstaffing" element={<TempStaffing />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route
                    path="/candidates"
                    element={<Candidates candidates={candidates} />}
                  />
                  <Route path="/client" element={<Client />} />
                  <Route path="/jobs" element={<Jobs jobposts={jobposts} />} />
                  <Route
                    path="/statutoryCompliance"
                    element={<HrStatutoryComp />}
                  />

                  <Route path="/applyjob" element={<ApplyJob />} />
                  <Route path="/cvupload" element={<CareerCVupload />} />
                  <Route path="/whyrsv" element={<WhyRsv />} />

                  <Route path="/contact" element={<Contact />} />

                  <Route
                    path="career"
                    element={<Career jobposts={jobposts} />}
                  />

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
                  <Route exact path="/admin/clients">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Clients clients={clients} />
                        </RequireAuth>
                      }
                    />
                  </Route>
                </Routes>
              </LocationProvider>
            </BusinessRequiredProvider>
          </QualificationProvider>
        </LanguagesProvider>
      </div>
    </>
  );
}

export default App;
