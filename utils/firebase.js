import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAewZku8tr5QCaqt9isQV5oiTS84XhL9-0",
  authDomain: "livewell-demo-db5bc.firebaseapp.com",
  projectId: "livewell-demo-db5bc",
  storageBucket: "livewell-demo-db5bc.appspot.com",
  messagingSenderId: "1071194451904",
  appId: "1:1071194451904:web:6e292eb3e9a397693ca225",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
