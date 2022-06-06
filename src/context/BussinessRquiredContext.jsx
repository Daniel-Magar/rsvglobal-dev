import React, { useState, useEffect, createContext } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const BusinessRequiredContext = createContext();

export const BusinessRequiredProvider = (props) => {
  const [buzReqd, setBuzReqd, getBuzReqd] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "buz_requirement");
      const q = query(colRef, orderBy("label", "asc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });

        let temp = [];
        temp.push(asperquery);
        setBuzReqd(asperquery);
        setBuzReqd((state) => {
          return state;
        });
      });
    } catch (error) {
      console.log("fetch aborted!"); // catching error in updating component
    }
  }, []);
  return (
    <BusinessRequiredContext.Provider value={[buzReqd, setBuzReqd]}>
      {props.children}
    </BusinessRequiredContext.Provider>
  );
};
