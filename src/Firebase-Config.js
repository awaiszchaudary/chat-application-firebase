import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC68vd5LQNNxOmAXEBL7hwUhNYwgvX6ccg",
    authDomain: "chat-application-4a301.firebaseapp.com",
    projectId: "chat-application-4a301",
    storageBucket: "chat-application-4a301.appspot.com",
    messagingSenderId: "219543281048",
    appId: "1:219543281048:web:d72ca5abc755f208261fed",
    measurementId: "G-5FN4W9PVVQ"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);