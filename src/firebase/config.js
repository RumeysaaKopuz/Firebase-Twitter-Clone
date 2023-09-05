// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2QGgiR1zffUHKSSXQN9S4j07hwoRdW-0",
  authDomain: "twitter-clone-b1f43.firebaseapp.com",
  projectId: "twitter-clone-b1f43",
  storageBucket: "twitter-clone-b1f43.appspot.com",
  messagingSenderId: "1078111729489",
  appId: "1:1078111729489:web:de7b2817e44ba8712ec570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! yetkilendirme kurulumu
export const auth = getAuth(app);

// google sağlayıcısı kurulum
export const provider = new GoogleAuthProvider();

// veritabanının referansını alama
export const db = getFirestore(app);

// medya'ları depolayıcğımız yer
export const storage = getStorage(app);