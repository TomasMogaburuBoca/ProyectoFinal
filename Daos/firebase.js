
const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json");

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-qg92u@eccomerce-2d330.iam.gserviceaccount.com'
});

const firebaseDb = firebase.firestore();

module.exports = {
    firebaseDb,
    admin
}