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

let app;

if (!app) {
  app = firebaseApp.initializeApp(firebaseConfig);
}
const database = firebaseFirestore.getFirestore(app);
const storageInstance = firebaseStorage.getStorage(app);
/**
 *
 * @param {*} user
 * @returns
 */
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
/**
 *
 * @param {*} onChange
 * @returns
 */
export function onAuthStateChangedFunction(onChange) {
  const auth = firebaseAuth.getAuth();
  return firebaseAuth.onAuthStateChanged(auth, (data) => {
    const normalizedUser = mapUserFromFirebaseAuth(data);
    onChange(normalizedUser);
  });
}
/**
 *
 * @returns
 */
export const loginWithGitHub = () => {
  const auth = firebaseAuth.getAuth();
  const githubProvider = new firebaseAuth.GithubAuthProvider();
  return firebaseAuth.signInWithPopup(auth, githubProvider);
};
/**
 *
 * @param {} param
 * @returns
 */
export async function addSoftee({ avatar, userId, content, username, img }) {
  try {
    const newSoftee = await firebaseFirestore.addDoc(
      firebaseFirestore.collection(database, "softees"),
      {
        avatar,
        content,
        userId,
        username,
        createdAt: firebaseFirestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
        img,
      }
    );
    return newSoftee;
  } catch (error) {
    console.error("Error writing that Softee 😢:", error);
  }
}
/**
 *
 * @param {*} callback
 */
export async function listenLatestSoftees(callback) {
  try {
    const sortedSoftees = firebaseFirestore.query(
      firebaseFirestore.collection(database, "softees"),
      firebaseFirestore.orderBy("createdAt", "desc")
    );

    const documents = [];
    await firebaseFirestore.onSnapshot(sortedSoftees, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        return documents.push(mapSofteeFromFirebaseToSofteeObject(doc));
      });
    });
    console.log(documents);
    callback(documents);
  } catch (error) {
    console.error(error);
  }
}

const mapSofteeFromFirebaseToSofteeObject = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export async function getLatestSoftees() {
  try {
    const sortedSoftees = firebaseFirestore.query(
      firebaseFirestore.collection(database, "softees"),
      firebaseFirestore.orderBy("createdAt", "desc")
    );
    const { docs } = await firebaseFirestore.getDocs(sortedSoftees);
    const softees = docs.map(mapSofteeFromFirebaseToSofteeObject);
    return softees;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImage(file) {
  const ref = firebaseStorage.ref(storageInstance, `images/${file.name}`);
  const { task } = await firebaseStorage.uploadBytesResumable(ref, file);
  const url = await firebaseStorage.getDownloadURL(ref);
  return { task: task, url };
}
