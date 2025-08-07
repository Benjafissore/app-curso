import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJdgo0ucHKHg88Q2H7VihPDMlNrer508U",
  authDomain: "la-cocinita-app.firebaseapp.com",
  projectId: "la-cocinita-app",
  storageBucket: "la-cocinita-app.appspot.com",
  messagingSenderId: "583397289780",
  appId: "1:583397289780:web:6c24de8a2518acc6333f61"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

console.log("✅ Firebase inicializado:", app.name);

export const auth = getAuth(app);