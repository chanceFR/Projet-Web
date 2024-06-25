// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // ou 'firebase/compat/firestore' si vous utilisez Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdVh9zDMo_BLLaDQrTlOWHdvS0oP1R1_0",
  authDomain: "projet-web-36faa.firebaseapp.com",
  projectId: "projet-web-36faa",
  storageBucket: "projet-web-36faa.appspot.com",
  messagingSenderId: "710695736977",
  appId: "1:710695736977:web:da165a9f7fef32ba6d1130",
  measurementId: "G-62E5HTL6H3"
};
function Firebase() {
  const sendMessage = () => {
    firebase.database().ref('messages').push({
      text: 'Hello, Firebase!'
    });
  };
  return (
    <button onClick={sendMessage}>Send Message</button>
  );
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default Firebase;
