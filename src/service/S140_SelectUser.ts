import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S140"

export const s140_SelectUser = async (userId: string) => {
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([userId])
    // FirebaseからdocSnapを取得
    const docRef = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User, docId);
    const docSnap = await getDoc(docRef);
    // docSnapからdocのデータを取得する
    const userInfo = docSnap.data() as M050_User
    // 戻り値を定義
    const resultObj = {
        userInfo: userInfo
    }
    return resultObj
}