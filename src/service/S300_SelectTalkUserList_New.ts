import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S300"

export const s250_SelectTalkList_New = async () => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkUserList = [] as T101_TalkUser[]
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser), orderBy("LatestLoginDatetime", 'desc'), limit(100))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        talkUserList.push(doc.data() as T101_TalkUser)
    });
    // 戻り値を定義
    const resultObj = {
        talkList: talkUserList
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}
