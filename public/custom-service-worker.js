importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAZBMd3oSBBevdPdpIjNXvA0cgIRIfUpSU',
  authDomain: 'pwa-demo-9beea.firebaseapp.com',
  databaseURL: 'https://pwa-demo-9beea.firebaseio.com',
  projectId: 'pwa-demo-9beea',
  storageBucket: 'pwa-demo-9beea.appspot.com',
  messagingSenderId: '731478400269'
});

firebase.messaging();
