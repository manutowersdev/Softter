import * as firebaseApp from "firebase/app";
import * as firebaseStorage from "firebase/storage";
import * as firebaseFirestore from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA98rKROBeCDKd4fJb3J1BkhCoEtVcHKaY",
  authDomain: "tweeter-bcdfd.firebaseapp.com",
  projectId: "tweeter-bcdfd",
  storageBucket: "gs://tweeter-bcdfd.appspot.com/",
  messagingSenderId: "1024657791976",
  appId: "1:1024657791976:web:eaf2bf5d4c6e130609a25d",
  measurementId: "G-0XZ0KQT4VY",
};

const app = firebaseApp.initializeApp(firebaseConfig);
const database = firebaseFirestore.getFirestore(app);
const storageInstance = firebaseStorage.getStorage(app);

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
  const auth = firebaseAuth.getAuth();
  return firebaseAuth.onAuthStateChanged(auth, (data) => {
    const normalizedUser = mapUserFromFirebaseAuth(data);
    onChange(normalizedUser);
  });
}

export const loginWithGitHub = () => {
  const auth = firebaseAuth.getAuth();
  const githubProvider = new firebaseAuth.GithubAuthProvider();
  return firebaseAuth.signInWithPopup(auth, githubProvider);
};

export async function addTweed({ avatar, userId, content, username }) {
  try {
    const newTweed = await firebaseFirestore.addDoc(
      firebaseFirestore.collection(database, "tweeds"),
      {
        avatar,
        content,
        userId,
        username,
        createdAt: firebaseFirestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
      }
    );
    return newTweed;
  } catch (error) {
    console.error("Error writing that tweed 😢:", error);
  }
}

export async function getLatestTweeds() {
  try {
    const sortedTweeds = firebaseFirestore.query(
      firebaseFirestore.collection(database, "tweeds"),
      firebaseFirestore.orderBy("createdAt", "desc")
    );
    const { docs } = await firebaseFirestore.getDocs(sortedTweeds);
    const tweeds = docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
    });
    return tweeds;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImage(file) {
  const ref = firebaseStorage.ref(storageInstance, `images/${file.name}`);
  const { task } = await firebaseStorage.uploadBytesResumable(ref, file);
  console.log(task);
  return task;
}
