var admin = require("firebase-admin");

if (!admin.apps.length) {
    var serviceAccount = require("../config/serviceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://mob104-ba9ee-default-rtdb.firebaseio.com"
    });
}

module.exports = admin.database();