// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "bricks-and-clicks-4fc6c.firebaseapp.com",
    projectId: "bricks-and-clicks-4fc6c",
    storageBucket: "bricks-and-clicks-4fc6c.firebasestorage.app",
    messagingSenderId: "548296279502",
    appId: "1:548296279502:web:3db3108205c1daee57179f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);