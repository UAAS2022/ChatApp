import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S230"

export const s230_DeleteTalk = async (
    talkId: string,
    userId: string,
) => {
    // エラーフラグを初期化
    let errFlg = "0"
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([talkId, userId])
    // Firebase処理
    const docRef = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk, docId)
    const result_FB = await deleteDoc(docRef);
    // 戻り値を定義
    const resultObj = {
        errFlg: errFlg,
        returnInfo: {
            talkId: talkId,
            userId: userId,
        }
    }
    // 返却処理
    return resultObj
}