import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique, c020_CreateSecId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { S000_SeqId, T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S261"

export const s261_CreateTalkUser_withTalkId = async (
    // talkId: string,
    userId: string,
    logUserId: string
) => {
    // ①トークIDを採番------------------------------------------------------------------------
    // 採番したIDを取得する
    const result_c020 = await c020_CreateSecId(FIREBASE_COLLECTIONS.S100_TalkId, logUserId, SERVICE_ID)
    const talkId = result_c020.returnInfo.secId
    console.log("①トークIDを採番", talkId)
    // --------------------------------------------------------------------------------------

    // ②トーク情報を登録------------------------------------------------------------------------
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([talkId, userId])
    // ドキュメントの中身を定義
    const newTalkUserInfo = {
        _0_DocId: docId,
        TalkId: talkId,
        UserId: userId,
        ReadedDatetime: Timestamp.now(),
        _CrtUserId: logUserId,
        _CrtServiceId: SERVICE_ID,
        _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as T101_TalkUser;
    let resultObj = {
        result_FB: "1"
    }
    // ②---------------------------------------------------------------------------------------
    // Pkeyチェック
    if (await c020_CheckUnique(FIREBASE_COLLECTIONS.T100_Talk, ["TalkId", "UserId"], [talkId, userId])) {
        // Firebase処理
        const result_FB = await setDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser, docId), newTalkUserInfo);       //→Idを指定する場合はこっち
        resultObj = {
            result_FB: "0"
        }
    }
    return resultObj
}