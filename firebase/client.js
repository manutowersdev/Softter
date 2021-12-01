import { initializeApp, getApps } from "@firebase/app";
import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
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

const database = getFirestore();

const mapUserFromFirebaseAuth = (user) => {
  if (user) {
    const {
      accessToken,
      email,
      photoURL,
      displayName,
      reloadUserInfo: { screenName },
      uid,
    } = user;
    return {
      avatar: photoURL,
      name: displayName,
      username: screenName,
      email: email,
      token: accessToken,
      userId: uid,
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

export async function addTweed({ avatar, userId, content, username }) {
  try {
    const newTweed = await addDoc(collection(database, "tweeds"), {
      avatar,
      content,
      userId,
      username,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    });
    return newTweed;
  } catch (error) {
    console.error("Error writing that tweed 😢:", error);
  }
}

export async function getLatestTweeds() {
  try {
    const { docs } = await getDocs(collection(database, "tweeds"));
    const tweeds = docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      return {
        ...data,
        id,
        createdAt: createdAt.toDate().toLocaleDateString(),
      };
    });
    return tweeds;
  } catch (error) {
    console.error(error);
  }
}
