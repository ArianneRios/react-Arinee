import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp2S5P033kACC19KosKj2GTMtNSpdeGtM",
  authDomain: "react-arinee-demo.firebaseapp.com",
  projectId: "react-arinee-demo",
  storageBucket: "react-arinee-demo.firebasestorage.app",
  messagingSenderId: "720365106272",
  appId: "1:720365106272:web:73aa7bc433a79e272c7f05",
  measurementId: "G-DDXPF7SV30"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
