import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqD0uMALlNwfB6Q2c_FNWrveiomPRKaAU",
  authDomain: "simple-crm-effb6.firebaseapp.com",
  projectId: "simple-crm-effb6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
