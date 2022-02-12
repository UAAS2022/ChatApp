import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S270"

export const s270_UpdateTalkUser = async (
    talkId: string,
    userId: string,
    logUserId: string
) => {
    const docId = c020_MakeDocId([talkId, userId])
    const newTalkUserInfo = {
        // _0_DocId: talkId + C000_FIREBASE_INFO.DocIdMaker + userId,
        // TalkId: talkId,
        // UserId: userId,
        ReadedDatetime: Timestamp.now(),
        // _CrtUserId: logUserId,
        // _CrtServiceId: SERVICE_ID,
        // _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as T101_TalkUser;
    // Firebase処理
    const result_FB = await updateDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser, docId), newTalkUserInfo);
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}