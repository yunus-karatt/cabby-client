import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cabby-21087.firebaseapp.com",
  projectId: "cabby-21087",
  storageBucket: "cabby-21087.appspot.com",
  messagingSenderId: "464296103500",
  appId: "1:464296103500:web:a55c82761330d8f78b2ee9",
  measurementId: "G-9WR3PJKZKK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
