import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { T101_TalkUser, M050_User, T100_Talk, } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S301"

export const s301_SelectTalkUserList_ByUserId = async (userId: string) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkUserList = [] as T101_TalkUser[]
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("UserId", "==", userId))
    // query_FB = query(query_FB, orderBy("LatestLoginDatetime", 'desc'))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、リストに追加する
    querySnapshot.forEach(async (doc) => {
        // トークユーザ情報取得
        const tmpTalkUserInfo = doc.data() as T101_TalkUser
        talkUserList.push(tmpTalkUserInfo)
    });
    //console.log("talkUserList.length", talkUserList.length)
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
