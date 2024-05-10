import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC_yi9vjeZQZbMqq2f7iERgczwB2Hcg4I",
  authDomain: "educational-platform-17f5f.firebaseapp.com",
  projectId: "educational-platform-17f5f",
  storageBucket: "educational-platform-17f5f.appspot.com",
  messagingSenderId: "459803828510",
  appId: "1:459803828510:web:41b67a2e44301b5781e90f",
  measurementId: "G-LYRHF9Q5JW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
export { app, auth, firestore, storage,database };