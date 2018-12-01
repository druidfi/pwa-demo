import firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => firebase.initializeApp({
  apiKey: 'AIzaSyAZBMd3oSBBevdPdpIjNXvA0cgIRIfUpSU',
  authDomain: 'pwa-demo-9beea.firebaseapp.com',
  databaseURL: 'https://pwa-demo-9beea.firebaseio.com',
  projectId: 'pwa-demo-9beea',
  storageBucket: 'pwa-demo-9beea.appspot.com',
  messagingSenderId: '731478400269'
});
