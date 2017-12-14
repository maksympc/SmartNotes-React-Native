const db = require('firebase');
const config = {
    apiKey: "AIzaSyDqYah10VhtLDVfzyICYxjb1OoiknV4P04",
    authDomain: "smartnotesdb.firebaseapp.com",
    databaseURL: "https://smartnotesdb.firebaseio.com",
    projectId: "smartnotesdb",
    storageBucket: "smartnotesdb.appspot.com",
    messagingSenderId: "611040739226"
};
export default firebase = db.initializeApp(config);
