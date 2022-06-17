import React, { useState, useEffect, createContext } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export const QualificationContext = createContext();

export const QualificationProvider = (props) => {
  const [qualificationData, setQualificationData] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "qualification");
      const q = query(colRef, orderBy("uid", "asc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });

        let temp = [];
        temp.push(asperquery);
        setQualificationData(asperquery);
        setQualificationData((state) => {
          return state;
        });
      });
    } catch (error) {
      console.log("fetch aborted!"); // catching error in updating component
    }
  }, []);
  return (
    <QualificationContext.Provider
      value={[qualificationData, setQualificationData]}
    >
      {props.children}
    </QualificationContext.Provider>
  );
};
