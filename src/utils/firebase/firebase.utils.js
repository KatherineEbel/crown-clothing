// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'

import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch,} from 'firebase/firestore';

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
  const { user } = await signInWithPopup(auth, provider)
  const {creationTime, lastSignInTime } = user.metadata;
  if (creationTime === lastSignInTime) {
    return await createUserDocumentFromAuth(user, user.displayName);
  }
  return getUserDoc(user.uid)
};

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore(app);

export const getUserDoc = async (uid) => {
  if (!uid) return null;
  const userDocRef = doc(db, 'users', uid)
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.exists() ? userSnapshot : null;
}

export const createUserDocumentFromAuth = async (userAuth, displayName = null) => {
  const userDocRef = doc(db, 'users', userAuth.user.uid)
  const { user: { displayName: name, email, uid } } = userAuth;
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
  return getUserDoc(uid);
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return null;
  let userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return createUserDocumentFromAuth(userCredential, displayName)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  const {user} = await signInWithEmailAndPassword(auth, email, password);
  return getUserDoc(user.uid);
}

export const signOutAuthUser = async () => {
  return signOut(auth);
}

export const listenForAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    )
  })
}

/*  Products */

export const addCollectionAndDocuments = async (collectionKey, objects) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objects.forEach(obj => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const categoryQuery = query(collectionRef);
  const querySnapshot = await getDocs(categoryQuery);
  return querySnapshot.docs.map(snapshot => snapshot.data());
}
