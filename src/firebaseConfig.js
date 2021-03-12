import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAtd0oyHDjeeXLPQr9ytewYxE_rmeiUI2Q',
  authDomain: 'promx-c370f.firebaseapp.com',
  projectId: 'promx-c370f',
  storageBucket: 'promx-c370f.appspot.com',
  messagingSenderId: '806921235677',
  appId: '1:806921235677:web:278e9099e4894b896c7f34',
  measurementId: 'G-G3ECHMK1VP',
});

export { app };
