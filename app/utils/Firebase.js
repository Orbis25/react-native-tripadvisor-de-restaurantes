import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJdHd8bLfJG3fgl_dtmMu842R9iWrRbX0",
  authDomain: "tu-comida-rd.firebaseapp.com",
  databaseURL: "https://tu-comida-rd.firebaseio.com",
  projectId: "tu-comida-rd",
  storageBucket: "tu-comida-rd.appspot.com",
  messagingSenderId: "960563037601",
  appId: "1:960563037601:web:5cfa889dac902648ec37e0"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
