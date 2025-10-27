import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API_KEY,
  authDomain: import.meta.env.VITE_Firebase_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_Firebase_PROJECT_ID,
  storageBucket: import.meta.env.VITE_Firebase_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_Firebase_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_Firebase_APP_ID,
  measurementId: import.meta.env.VITE_Firebase_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
