// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyASdHPRftamjrKOseUqVNYB56wTA8DKkio",
    authDomain: "legalgpt-dd564.firebaseapp.com",
    projectId: "legalgpt-dd564",
    storageBucket: "legalgpt-dd564.appspot.com",
    messagingSenderId: "801622181174",
    appId: "1:801622181174:web:b57e3fbb05734c7ca35f97",
    measurementId: "G-LE20ZLN9ZE"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };