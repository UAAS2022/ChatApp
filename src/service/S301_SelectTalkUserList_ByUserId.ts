import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser } from '../common/C020_FirebaseUtil_Types';
import { s140_SelectUser } from "./S140_SelectUser"
import { s290_SelectTalkUser } from "./S290_SelectTalkUser"

const SERVICE_ID = "S301"

export const s301_SelectTalkUserList_ByUserId = async (userId: String) => {
    // 戻り値用のリストを定義
    let talkUserList = [] as any[]
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("UserId", "==", userId))
    // query_FB = query(query_FB, orderBy("LatestLoginDatatime", 'desc'))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        // ①トーク情報取得
        const talkInfo = doc.data() as T101_TalkUser
        talkUserList.push(talkInfo)
        // ②トークIDに紐づくユーザIDを取得予定（条件：自分以外）

        // ③ユーザIDに紐づくユーザ情報を取得

    });
    // 戻り値を定義
    const resultObj = {
        talkUserList: talkUserList
    }
    return resultObj
}
