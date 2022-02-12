import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique, c020_CreateSecId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { S000_SeqId, T100_Talk } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S210"

export const s210_CreateTalk = async (
    talkId: string,
    talkName: string,
    talkKbn: number,
    logUserId: string
) => {
    // エラーフラグを初期化
    let errFlg = "0"

    // ②トーク情報を更新------------------------------------------------------------------------
    // ドキュメントの中身を定義
    const newTalkInfo = {
        // _0_DocId: docId,
        // TalkId: docId,
        TalkName: talkName,
        TalkKbn: talkKbn,
        // _CrtUserId: logUserId,
        // _CrtServiceId: SERVICE_ID,
        // _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as T100_Talk;
    const result_FB = await updateDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk, talkId), newTalkInfo);
    // ②---------------------------------------------------------------------------------------
    // 返却処理
    const resultObj = {
        errFlg: errFlg,
        returnInfo: {
            talkId: talkId
        }
    }
    return resultObj
}