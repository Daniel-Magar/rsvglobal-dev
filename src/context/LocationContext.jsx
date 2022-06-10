import React, { useState, useEffect, createContext } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(db, "location");
      const q = query(colRef, orderBy("label", "asc"));
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });

        let temp = [];
        temp.push(asperquery);
        setLocationData(asperquery);
        setLocationData((state) => {
          return state;
        });
      });
    } catch (error) {
      console.log("fetch aborted!"); // catching error in updating component
    }
  }, []);
  return (
    <LocationContext.Provider value={[locationData, setLocationData]}>
      {props.children}
    </LocationContext.Provider>
  );
};
