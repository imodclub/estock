import { initializeApp } from 'firebase/app';
import { getFirestore,collection,getDoc,getDocs,onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAo2KbSE7kaxH-__s5XTImyPWxlBuT27mQ',
  authDomain: 'stock-240b7.firebaseapp.com',
  projectId: 'stock-240b7',
  storageBucket: 'stock-240b7.appspot.com',
  messagingSenderId: '1094516188928',
  appId: '1:1094516188928:web:bf6ad4775626af2a4af5e5',
  measurementId: 'G-1V5E1JVNZE',
};

const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase)

export default Firebase
