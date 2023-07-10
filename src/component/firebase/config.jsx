// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAygVXlDqEOgLOWQlc4QoOfKR2zAJAG3tI",
  authDomain: "chat-app-e9269.firebaseapp.com",
  projectId: "chat-app-e9269",
  storageBucket: "chat-app-e9269.appspot.com",
  messagingSenderId: "162457496854",
  appId: "1:162457496854:web:6e783c61791ed0776ef437",
  measurementId: "G-983BV38WP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const providerFb = new FacebookAuthProvider();
const providerGg = new GoogleAuthProvider();

// if (location.hostname === "localhost") {
//   // db.useEmulator("localhost", 8080);
//   auth.useEmulator("http://localhost:9099/", { disableWarnings: true });
//   console.log("Accept firebase success");
// }

export { auth, providerFb, providerGg, db };
