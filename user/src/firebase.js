// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5326e.firebaseapp.com",
  projectId: "real-estate-5326e",
  storageBucket: "real-estate-5326e.firebasestorage.app",
  messagingSenderId: "764821456449",
  appId: "1:764821456449:web:465bd07087a86abdee28c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);