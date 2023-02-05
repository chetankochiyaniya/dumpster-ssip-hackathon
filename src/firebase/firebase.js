import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChY-afBd5t3_uKbNaf4INPxvnHk1L0Oh8",
  authDomain: "smart-dustbin-c06c1.firebaseapp.com",
  databaseURL: "https://smart-dustbin-c06c1-default-rtdb.firebaseio.com",
  projectId: "smart-dustbin-c06c1",
  storageBucket: "smart-dustbin-c06c1.appspot.com",
  messagingSenderId: "988786576051",
  appId: "1:988786576051:web:0acae666dbcf778a8e7ec6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
