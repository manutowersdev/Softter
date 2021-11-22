import { initializeApp, getApps } from "@firebase/app";
import {
  signInWithPopup,
  GithubAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA98rKROBeCDKd4fJb3J1BkhCoEtVcHKaY",
  authDomain: "tweeter-bcdfd.firebaseapp.com",
  projectId: "tweeter-bcdfd",
  storageBucket: "tweeter-bcdfd.appspot.com",
  messagingSenderId: "1024657791976",
  appId: "1:1024657791976:web:eaf2bf5d4c6e130609a25d",
  measurementId: "G-0XZ0KQT4VY",
};

!getApps().length && initializeApp(firebaseConfig);

const mapUserFromFirebaseAuth = (data) => {
  if (data) {
    const {
      accessToken,
      email,
      photoURL,
      displayName,
      reloadUserInfo: { screenName },
    } = data;
    return {
      avatar: photoURL,
      name: displayName,
      username: screenName,
      email: email,
      token: accessToken,
    };
  } else {
    return null;
  }
};

export function onAuthStateChangedFunction(onChange) {
  const auth = getAuth();
  return onAuthStateChanged(auth, (data) => {
    const normalizedUser = mapUserFromFirebaseAuth(data);
    onChange(normalizedUser);
  });
}

export const loginWithGitHub = () => {
  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider);
};
