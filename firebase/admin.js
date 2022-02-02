const admin = require("firebase-admin")
const serviceAccount2 = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

let app
if (admin.apps.length < 1) {
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount2),
    },
    "adminApp"
  )
} else {
  app = admin.app("adminApp")
}

export const firestore = admin.firestore(app)
