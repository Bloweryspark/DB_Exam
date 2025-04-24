// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDjQxLYE7uuj9zumPvxYEvfcdRXGri--Wg",
    authDomain: "edutek-5ca15.firebaseapp.com",
    projectId: "edutek-5ca15",
    storageBucket: "edutek-5ca15.firebasestorage.app",
    messagingSenderId: "230364226557",
    appId: "1:230364226557:web:e06c7bf7e18ff48e8a2f94"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };