import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, makeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S130"

export const s130_DeleteUser = async (
    userId: string,
) => {
    // ドキュメントIDを定義
    const docId = makeDocId([userId])
    // Firebase処理
    const result_FB = await deleteDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User, docId));
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}