const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");
let app;

if (!admin.app()) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  app = admin.app();
}

export const firestore = admin.firestore(app);
