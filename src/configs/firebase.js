import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import store from "../store";
import {getDefaultRegistration} from "./sw";

const initializeFirebase = async () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);

  onMessage(messaging, async (payload) => {
    const {title, body, icon} = payload.data || {}

    new Notification(title, {body, icon})

    await store.commit('notifications/pushNotification', {title, body, icon})
  })

  try {
    await Notification.requestPermission()

    const registration = await getDefaultRegistration('sw.js');

    if (!registration) {
      throw new Error('Could not get registration');
    }

    const token = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: import.meta.env.VITE_FCM_WEB_PUSH_PUBLIC_KEY,
    });

    await store.dispatch('notifications/saveFcmToken', token)
  } catch (error) {
    console.log('Could not get FCM token', error);
  }
}

initializeFirebase()