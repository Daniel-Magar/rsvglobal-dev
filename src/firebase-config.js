// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJmbr8gudKb_avP4OGMBOyFDEY03BsvRk",
  authDomain: "rsvglobal-59af0.firebaseapp.com",
  projectId: "rsvglobal-59af0",
  storageBucket: "rsvglobal-59af0.appspot.com",
  messagingSenderId: "548317682714",
  appId: "1:548317682714:web:1052cef54ac216642485a3",
  measurementId: "G-CVPFJD76KK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const rldb = getDatabase(app);
const storage = getStorage(app);

export { db, auth, rldb, storage };
