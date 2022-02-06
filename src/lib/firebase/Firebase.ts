// import * as firebase from 'firebase';
// import 'firebase/app';
// import 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { T999_M050_USER } from './Types'

const firebaseConfig = {
    apiKey: 'AIzaSyCEwOdcgltaDYsUw8EtpqYesBLasQpQoBM',
    authDomain: "uaas-chatproject-pre.firebaseapp.com",
    projectId: "uaas-chatproject-pre",
    storageBucket: "uaas-chatproject-pre.appspot.com",
    messagingSenderId: "901661061415",
    appId: "1:901661061415:ios:4f88424bc0ea32e5063902"

};

export const FIREBASE_COLLECTIONS = {
    T999_V04_FB_SampleMessage: "T999_V04_FB_SampleMessage",
    T999_M050_USER: "T999_M050_USER",
}

if (getApps().length < 1) {
    console.log("firebase:aaaaaaaaaaaaaaaaaaaaaaaaaaa")
    initializeApp(firebaseConfig);
}

export const db_Firebase = getFirestore();
export const storage = getStorage();

export const selectUser_List = async () => {
    let userList = [] as any[]
    // const querySnapshot = await getDocs(collection(db_Firebase, "T999_M050_USER"));
    const fb_collection = query(collection(db_Firebase, "T999_M050_USER"), orderBy("LatestLoginDatatime", 'desc'), limit(100))
    const querySnapshot = await getDocs(fb_collection);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        userList.push(doc.data())
    });
    // const usersCollectionRef = collection(db_Firebase, 'T999_M050_USER')
    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //     console.log(querySnapshot.docs.map((doc) => doc.data()))
    //     console.log(querySnapshot.docs.data())
    // });
    return userList
}

export const getMessageDocRef = async () => {
    return await collection(db_Firebase, 'messages');
};
