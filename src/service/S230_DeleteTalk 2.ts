import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, makeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T100_Talk } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S230"

export const s230_DeleteTalk = async (
    talkId: string,
    userId: string,
) => {
    // ドキュメントIDを定義
    const docId = makeDocId([talkId, userId])
    // Firebase処理
    const result_FB = await deleteDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk, docId));
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}