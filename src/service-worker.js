importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

firebase.initializeApp({
  apiKey: 'AIzaSyAZBMd3oSBBevdPdpIjNXvA0cgIRIfUpSU',
  authDomain: 'pwa-demo-9beea.firebaseapp.com',
  databaseURL: 'https://pwa-demo-9beea.firebaseio.com',
  projectId: 'pwa-demo-9beea',
  storageBucket: 'pwa-demo-9beea.appspot.com',
  messagingSenderId: '731478400269'
});

firebase.messaging();
