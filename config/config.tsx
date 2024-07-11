import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpN2kl8v8wBA1ftRhJvrL3c5tDeC6EQoA",
  authDomain: "sm-prueba-1e77e.firebaseapp.com",
  projectId: "sm-prueba-1e77e",
  storageBucket: "sm-prueba-1e77e.appspot.com",
  messagingSenderId: "344232362926",
  appId: "1:344232362926:web:87f397a794e25508f53e3f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);