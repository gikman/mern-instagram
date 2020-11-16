import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCf-NmTp-1mBkNqeyggvQ2MNWyfFCQdCFc",
    authDomain: "instagram-mern-a24ac.firebaseapp.com",
    databaseURL: "https://instagram-mern-a24ac.firebaseio.com",
    projectId: "instagram-mern-a24ac",
    storageBucket: "instagram-mern-a24ac.appspot.com",
    messagingSenderId: "226521796689",
    appId: "1:226521796689:web:5ac0282c5319fee1eca870",
    measurementId: "G-7H30QME54M"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };