import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S290"

export const s290_SelectTalkUser = async (
    talkId: string,
    userId: string,
) => {
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([talkId, userId])
    // FirebaseからdocSnapを取得
    const docRef = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser, docId);
    const docSnap = await getDoc(docRef);
    // docSnapからdocのデータを取得する
    const talkUserInfo = docSnap.data() as T101_TalkUser
    // 戻り値を定義
    const resultObj = {
        talkInfo: talkUserInfo
    }
    return resultObj
}