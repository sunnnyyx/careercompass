// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDzboK2dOsQRQLVkfB3wj34TPwLDkOtbS8",
  authDomain: "careercompass-408a0.firebaseapp.com",
  projectId: "careercompass-408a0",
  storageBucket: "careercompass-408a0.appspot.com",
  messagingSenderId: "26204918534",
  appId: "1:26204918534:web:d301049fa606ea9fb20487",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);
