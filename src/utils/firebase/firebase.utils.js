// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTorpRNDy5swhqPFgLzHkfo33qCqZ23CE",
  authDomain: "crown-clothing-48f81.firebaseapp.com",
  projectId: "crown-clothing-48f81",
  storageBucket: "crown-clothing-48f81.appspot.com",
  messagingSenderId: "429961998320",
  appId: "1:429961998320:web:376519e2705684f52db735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth, options = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) return userDocRef;

  const { displayName, email } = userAuth
  const createdAt = new Date();
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...options,
    })
  } catch (e) {
    console.error('error creating the user', e.message)
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  return await signInWithEmailAndPassword(auth, email, password);
}