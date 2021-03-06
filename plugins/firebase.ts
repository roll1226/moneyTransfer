import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()
const firestore = firebase.firestore()
const auth = firebase.auth()
const fieldValue = firebase.firestore.FieldValue
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const storage = firebase.storage()

export { firestore }
export { auth }
export { fieldValue }
export { timestamp }
export { storage }
