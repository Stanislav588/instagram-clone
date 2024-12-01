// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCsdBxUbor6DKVsNbbmxQAVx45LjdwewZI",
  authDomain: "instagram-80e27.firebaseapp.com",
  databaseURL: "https://instagram-80e27-default-rtdb.firebaseio.com",
  projectId: "instagram-80e27",
  storageBucket: "instagram-80e27.firebasestorage.app",
  messagingSenderId: "598234589633",
  appId: "1:598234589633:web:d3b8c1b6ae50505f9c6740",
  measurementId: "G-Z34YEHK699",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, storage, firestore };
