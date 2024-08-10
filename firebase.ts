import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyANtwJTejFF2gDOLLddidA_ukt0eeMLK1c",
    authDomain: "gpt-clone-8defd.firebaseapp.com",
    projectId: "gpt-clone-8defd",
    storageBucket: "gpt-clone-8defd.appspot.com",
    messagingSenderId: "753615956136",
    appId: "1:753615956136:web:d9957c043f691720177a9d"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };