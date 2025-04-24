// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIVHZMMNiPFmqMP94PkwCFtMOs48pGEsc",
  authDomain: "etender-442a7.firebaseapp.com",
  projectId: "etender-442a7",
  storageBucket: "etender-442a7.firebasestorage.app",
  messagingSenderId: "681098801012",
  appId: "1:681098801012:web:ade9164b0092ac11a34621"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

