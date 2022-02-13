import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, makeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M051_UserPrivate } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S180"

export const s180_DeleteUserPrivate = async (
    userId: string,
) => {
    // ドキュメントIDを定義
    const docId = makeDocId([userId])
    // Firebase処理
    const result_FB = await deleteDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M051_UserPrivate, docId));
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}