import React, { useState, useEffect, createContext } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export const LanguagesContext = createContext();

export const LanguagesProvider = (props) => {
  const [languagesData, setLanguagesData] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "languages");
      const q = query(colRef, orderBy("uid", "asc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });

        let temp = [];
        temp.push(asperquery);
        setLanguagesData(asperquery);
        setLanguagesData((state) => {
          return state;
        });
      });
    } catch (error) {
      console.log("fetch aborted!"); // catching error in updating component
    }
  }, []);
  return (
    <LanguagesContext.Provider value={[languagesData, setLanguagesData]}>
      {props.children}
    </LanguagesContext.Provider>
  );
};
