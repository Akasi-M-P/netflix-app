import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPsPS5zi1z_0PSUqgNVg_O21wcUpXpvAs",
  authDomain: "netflix-app-80fcf.firebaseapp.com",
  projectId: "netflix-app-80fcf",
  storageBucket: "netflix-app-80fcf.appspot.com",
  messagingSenderId: "254941045193",
  appId: "1:254941045193:web:9375e457780f1a1b038818",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new EmailAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
