// import "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
// import "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNF2L-RQbhaM2qYmTf6bxNyP_JnWex870",
  authDomain: "team-reporter.firebaseapp.com",
  projectId: "team-reporter",
  storageBucket: "team-reporter.appspot.com",
  messagingSenderId: "92754893475",
  appId: "1:92754893475:web:b525bd13bb8e8415a63d16",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
