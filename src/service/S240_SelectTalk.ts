import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T100_Talk } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S240"

export const s240_SelectTalk = async (talkId: string) => {
    console.log("s240_SelectTalk:開始------------------------------")
    // 戻り値定義
    let talkInfo = {} as T100_Talk
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([talkId])
    // FirebaseからdocSnapを取得
    const docRef = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk, docId);
    const docSnap = await getDoc(docRef);
    // おまじない
    if (docSnap.exists()) {
        // docSnapからdocのデータを取得する
        talkInfo = docSnap.data() as T100_Talk
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    // 戻り値を定義
    const resultObj = {
        talkInfo: talkInfo
    }
    console.log("s240_SelectTalk:終了------------------------------")
    return resultObj
}