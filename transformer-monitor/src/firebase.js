// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBawsYYLxuB3J1V-al5N88kO3qUQ7QSp4w",
//   authDomain: "transformer-monitor-34d38.firebaseapp.com",
//   projectId: "transformer-monitor-34d38",
//   storageBucket: "transformer-monitor-34d38.firebasestorage.app",
//   messagingSenderId: "414367822959",
//   appId: "1:414367822959:web:7e03ab7dcd92348366499a",
//   measurementId: "G-VC9DEKECDS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyBawsYYLxuB3J1V-al5N88kO3qUQ7QSp4w",
//   authDomain: "transformer-monitor-34d38.firebaseapp.com",
//   projectId: "transformer-monitor-34d38",
//   storageBucket: "transformer-monitor-34d38.firebasestorage.app",
//   messagingSenderId: "414367822959",
//   appId: "1:414367822959:web:7e03ab7dcd92348366499a",
//   measurementId: "G-VC9DEKECDS"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };



// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyBawsYYLxuB3J1V-al5N88kO3qUQ7QSp4w",
  authDomain: "transformer-monitor-34d38.firebaseapp.com",
  projectId: "transformer-monitor-34d38",
  storageBucket: "transformer-monitor-34d38.firebasestorage.app",
  messagingSenderId: "414367822959",
  appId: "1:414367822959:web:7e03ab7dcd92348366499a",
  measurementId: "G-VC9DEKECDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them
export { auth, db };

