import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvu7R7tM3NekyD6Ub0ry8zv6ycV97zixo",
  authDomain: "clearmind-fd8ea.firebaseapp.com",
  projectId: "clearmind-fd8ea",
  storageBucket: "clearmind-fd8ea.firebasestorage.app",
  messagingSenderId: "48915653216",
  appId: "1:48915653216:web:8db50af540392d73c41905"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
