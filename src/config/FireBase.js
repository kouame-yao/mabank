const admin = require("firebase-admin");
const serviceAccount = require("./nouveau-ab5ed-firebase-adminsdk-fbsvc-51f73e614d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const dateCurrent = admin.firestore.Timestamp.now();

module.exports = dateCurrent;
module.exports = db;
