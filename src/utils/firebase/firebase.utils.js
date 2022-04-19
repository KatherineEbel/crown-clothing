// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut,
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
export const signInWithGooglePopup = async () => {
  const {user} = signInWithPopup(auth, provider)
  await createUserDocumentFromAuth(user, user.displayName)
};
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore(app);

export const getUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return null;
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.exists() ? userDocRef : null;
}

export const createUserDocumentFromAuth = async (userAuth, displayName = null) => {
  let userDocRef = await getUserDocFromAuth(userAuth);
  if (userDocRef) return userDocRef;

  const { displayName: name, email } = userAuth
  const createdAt = new Date();
  try {
    await setDoc(userDocRef, {
      displayName: name || displayName,
      email,
      createdAt,
    })
  } catch (e) {
    console.error('error creating the user', e.message)
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return null;
  let user = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocumentFromAuth(user, displayName)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutAuthUser = async () => {
  await signOut(auth);
}

export const listenForAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}