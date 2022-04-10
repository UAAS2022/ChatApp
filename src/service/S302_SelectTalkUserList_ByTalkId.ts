import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';
import { s140_SelectUser } from "./S140_SelectUser"
import { s290_SelectTalkUser } from "./S290_SelectTalkUser"

const SERVICE_ID = "S302"

export const s302_SelectTalkUserList_ByTalkId = async (talkId: string, processKbn: string, userId: string | undefined) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------

    // 戻り値用のリストを定義
    let talkUserList = [] as T101_TalkUser[]
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("TalkId", "==", talkId))
    if (processKbn === "1") {
        query_FB = query(query_FB, where("UserId", "!=", userId))
    }
    query_FB = query(query_FB, orderBy("UserId", 'asc'), orderBy("_UpdDatetime", 'desc'))
    //console.log("s302_SelectTalkUserList_ByTalkId------------------------------")
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        // ①トーク情報取得
        const talkInfo = doc.data() as T101_TalkUser
        talkUserList.push(talkInfo)
        //console.log("S302①トーク情報取得", talkInfo.TalkId)
    });
    // 戻り値を定義
    const resultObj = {
        talkUserList: talkUserList
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}
