// import * as firebase from 'firebase';
// import 'firebase/app';
// import 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import {
    getFirestore
    , collection
    , doc, addDoc
    , setDoc, updateDoc
    , deleteDoc, getDoc
    , getDocs, Timestamp
    , QueryConstraint
    , query
    , where
    , orderBy
    , limit,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
    getFunctions
    , httpsCallable
} from 'firebase/functions';
import { C000_FIREBASE_INFO } from './C000_Const';
import { S000_SeqId } from "./C020_FirebaseUtil_Types"

// firebaseへの接続情報
const firebaseConfig = {
    // apiKey: 'AIzaSyCEwOdcgltaDYsUw8EtpqYesBLasQpQoBM',
    apiKey: 'AIzaSyADa9t7CPVFmDGwpv0UvHmRN-Peih2uWPE',
    authDomain: "chatproject-82b68.firebaseapp.com",
    projectId: "chatproject-82b68",
    storageBucket: "chatproject-82b68.appspot.com",
    messagingSenderId: "989533017198",
    appId: "1:989533017198:web:585cbab82c3b42d11fc27f"

};

// initializeのデフォルトはもうすでに作成済みのため、下記で明示的に名前をつけて初期化
const tempApp = initializeApp(firebaseConfig, "tempApp");

export const FC_FIREBASE = getFunctions(tempApp);

// 3. FunctionsUtill
// ========================================================================================================================
export const c020_HttpsCallable = async (endPoint: string, param: any) => {
    // エンドポイントの関数を取得する
    const anyFunction: any = httpsCallable(FC_FIREBASE, endPoint);
    // 関数を実行する
    const result: any = await anyFunction(param)
    // データを返却する
    const resultData = result.data
    return resultData
}
// ========================================================================================================================