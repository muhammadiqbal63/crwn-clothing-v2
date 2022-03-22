import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2umsuFWv-3z95FzHOTYkhBkMXF3s3sSU',
  authDomain: 'crwn-clothing-db-ed980.firebaseapp.com',
  projectId: 'crwn-clothing-db-ed980',
  storageBucket: 'crwn-clothing-db-ed980.appspot.com',
  messagingSenderId: '242438859712',
  appId: '1:242438859712:web:33c94447d1304420f1f625',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GOOGLE SIGN IN
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//CREATING USER DOCUMENT
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};
