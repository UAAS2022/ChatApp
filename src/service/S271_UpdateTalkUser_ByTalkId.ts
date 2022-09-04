import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';
import { s270_UpdateTalkUser } from './S270_UpdateTalkUser';
import { s302_SelectTalkUserList_ByTalkId } from './S302_SelectTalkUserList_ByTalkId';

const SERVICE_ID = "S271"

export const s271_UpdateTalkUser_ByTalkId = async (
    talkId: string,
    logUserId: string,
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 1）更新対象データを取得する
    const result_S302 = await s302_SelectTalkUserList_ByTalkId(talkId, "0")
    // 2）更新対象データ分ループして、トークユーザを更新する
    for (const talkUserInfo of result_S302.talkUserList) {
        s270_UpdateTalkUser(talkId, talkUserInfo.UserId, logUserId, false)
    }
    // 戻り値を定義
    const resultObj = {
        result_FB: true
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}