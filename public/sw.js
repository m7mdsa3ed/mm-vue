import {cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {clientsClaim} from 'workbox-core';
import {NavigationRoute, registerRoute} from 'workbox-routing';
import {initializeApp} from "firebase/app";
import {getMessaging, onBackgroundMessage} from "firebase/messaging/sw";

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist;

if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  {allowlist},
));

const firebaseConfig = {
  apiKey: "AIzaSyBmLYBsdhuhzdn23RP9bsFsxSusHOMoKXI",
  authDomain: "mm-vue-07.firebaseapp.com",
  projectId: "mm-vue-07",
  storageBucket: "mm-vue-07.appspot.com",
  messagingSenderId: "1051562240726",
  appId: "1:1051562240726:web:ec9e8d789d7c03ab923777"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onBackgroundMessage(messaging, async (payload) => {
  const {title, body, icon} = payload.data || {}

  await self.registration.showNotification(title, {body, icon});
})

self.skipWaiting();

clientsClaim();

console.log('Service worker has been registered.')
