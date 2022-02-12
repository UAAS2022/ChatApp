import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S280"

export const s280_DeleteTalkUser = async (
    talkId: string,
    userId: string,
) => {
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([talkId, userId])
    // Firebase処理
    const result_FB = await deleteDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser, docId));
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}