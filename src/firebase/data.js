// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIdmaKdeyyqf2RjfpSkHOczvxqNDjo1SI",
  authDomain: "lucia-navas-pasteleria.firebaseapp.com",
  projectId: "lucia-navas-pasteleria",
  storageBucket: "lucia-navas-pasteleria.appspot.com",
  messagingSenderId: "937148046547",
  appId: "1:937148046547:web:b4222d4e17b4dd142ec826",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
