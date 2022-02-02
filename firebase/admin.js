const admin = require("firebase-admin")

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

let app
if (admin.apps.length < 1) {
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    "adminApp"
  )
} else {
  app = admin.app("adminApp")
}

export const firestore = admin.firestore(app)
