import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S150"

export const s150_SelectUserList_New = async (limitNo: number, logUserId: string, cursorTimestamp: Date) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [limitNo, logUserId, cursorTimestamp])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let userList = [] as any[]
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User),
        // where("UserId", "!=", logUserId),   //これつけると変なエラーが出てしまう（Firebaseのルール上アウトらしい）。
        where("LatestLoginDatetime", "<", Timestamp.fromDate(cursorTimestamp)),
        orderBy("LatestLoginDatetime", 'desc'),
        limit(limitNo)
    )
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        const userInfo = doc.data() as M050_User
        // ログインユーザでない場合のみリストに追加する。
        if (userInfo.UserId != logUserId) {
            userList.push(doc.data() as M050_User)
        }
    });
    // 戻り値を定義
    const resultObj = {
        userList: userList
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}
