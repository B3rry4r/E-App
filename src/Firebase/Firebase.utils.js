import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBK9roS4hTRtGGfi29rx4n6r85G5UgOtvo",
  authDomain: "crwn-db-8cc1b.firebaseapp.com",
  projectId: "crwn-db-8cc1b",
  storageBucket: "crwn-db-8cc1b.appspot.com",
  messagingSenderId: "843925536065",
  appId: "1:843925536065:web:7a83c29b61898cc8c3b5c0",
  measurementId: "G-ZZ6H25R9KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Authentication and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Set up Google Sign-In Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Function to sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // console.log(token);
    // The signed-in user info.
    const user = result.user;
    // console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

// // Function to create a Firestore reference to a user document
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth){
    return;
  }
  const usersRef = collection( db, "users");
  const userRef = doc( db, "users", `${userAuth.uid}`);

  try {
    const snapshot = await getDoc(userRef)
    console.log(snapshot);

    if (!snapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date(); 

      const userNewRef = await addDoc(usersRef, {
        name: displayName,
        email: email,
        createdAt,
        ...additionalData
      })
      console.log("Document written with ID: ", userNewRef.id);
    }
  } catch (error) {
    console.log('error creating user', error);
  }

  return userRef;
};


// Export the necessary objects
export { auth, db, analytics };
