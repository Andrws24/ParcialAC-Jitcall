
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';


 const firebaseConfig = {


    apiKey: "AIzaSyCOhpAjGD8_7PE71JSeFGmCB7lT4rjlAVI",
    authDomain: "parcial2-jitcall.firebaseapp.com",
    projectId: "parcial2-jitcall",
    storageBucket: "parcial2-jitcall.appspot.com", // ¡Corregido!
    messagingSenderId: "178072816886",
    appId: "1:178072816886:web:a45d3d1eb2ed97509bb0d7"
  
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { app, auth, db, messaging };