import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMbci-PJnuJ0K-tzXvWqZ7DGYXphZ_zdI",
    authDomain: "vone-d9e7d.firebaseapp.com",
    projectId: "vone-d9e7d",
    storageBucket: "vone-d9e7d.firebasestorage.app",
    messagingSenderId: "554474715720",
    appId: "1:554474715720:web:df15852ac39f631547f67d",
    measurementId: "G-HTR9GGDQQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);