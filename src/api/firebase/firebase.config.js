import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYiQpYC2ZyB5HNBJHe0PKwkFIPZosFGCA',
  authDomain: 'helios-employees-management.firebaseapp.com',
  databaseURL: 'https://helios-employees-management-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'helios-employees-management',
  storageBucket: 'helios-employees-management.appspot.com',
  messagingSenderId: '77509730516',
  appId: '1:77509730516:web:b0c25710ed6efde39e9b41',
  measurementId: 'G-0WFLF6YPL3',
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
