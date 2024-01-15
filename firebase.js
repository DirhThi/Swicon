import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrzhi1twgQmD_PyvksjnEQEbTS00gZzOA",
  authDomain: "investment-management-8fa4a.firebaseapp.com",
  projectId: "investment-management-8fa4a",
  storageBucket: "investment-management-8fa4a.appspot.com",
  messagingSenderId: "698970034210",
  appId: "1:698970034210:web:c20c990d91e69ab7ddfa7b",
  measurementId: "G-BML43Z239M"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
};
