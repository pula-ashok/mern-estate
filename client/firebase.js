// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-estate-1b723.firebaseapp.com",
  projectId: "mern-estate-1b723",
  storageBucket: "mern-estate-1b723.appspot.com",
  messagingSenderId: "1067659012524",
  appId: "1:1067659012524:web:f49721d436df0c32e97209",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
