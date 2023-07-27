// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDlyuFz1Kf9NEk6ow37yw36IJ_oEPHvGxI",
//   authDomain: "mypersonalwebsite2023.firebaseapp.com",
//   projectId: "mypersonalwebsite2023",
//   storageBucket: "mypersonalwebsite2023.appspot.com",
//   messagingSenderId: "470603422335",
//   appId: "1:470603422335:web:176eb8c9088358d15bbd4a",
//   measurementId: "G-F6WEDJBBR2",
// };

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
