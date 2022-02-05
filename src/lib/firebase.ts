// import * as firebase from 'firebase';
// import 'firebase/app';
// import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCEwOdcgltaDYsUw8EtpqYesBLasQpQoBM',
    authDomain: "uaas-chatproject-pre.firebaseapp.com",
    projectId: "uaas-chatproject-pre",
    storageBucket: "uaas-chatproject-pre.appspot.com",
    messagingSenderId: "901661061415",
    appId: "1:901661061415:ios:4f88424bc0ea32e5063902"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

const usersCollectionRef = collection(db, 'users');

export const getMessageDocRef = async () => {
    return await collection(db, 'messages');
};