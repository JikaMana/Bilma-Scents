// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxhVvTAyKXSfG70fpa5zrqNw-OOzV7VDM",
  authDomain: "bilmascent.firebaseapp.com",
  projectId: "bilmascent",
  storageBucket: "bilmascent.firebasestorage.app",
  messagingSenderId: "52011072641",
  appId: "1:52011072641:web:d454e98e99cb11c6752180",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);
