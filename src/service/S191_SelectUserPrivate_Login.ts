import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M051_UserPrivate } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S191"

export const s191_SelectUserPrivate_Login = async (loginId: string, password: string) => {
    // // ドキュメントIDを定義
    // const docId = c020_MakeDocId([userId])
    // 取得用のリストを定義
    let userPrivateInfoList = [] as M051_UserPrivate[]
    // FirebaseからdocSnapを取得
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.M051_UserPrivate))
    query_FB = query(query_FB, where("LoginId", "==", loginId))
    query_FB = query(query_FB, where("Password", "==", password))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、リストに追加する
    querySnapshot.forEach(async (doc) => {
        // ユーザ機密情報取得（本当はユーザIDのみ取得したいが、方法がわからないため全ての情報を取得している）
        const m051_userPrivateInfo = doc.data() as M051_UserPrivate
        userPrivateInfoList.push(m051_userPrivateInfo)
    });
    const userPrivateInfo = userPrivateInfoList[0]

    // 戻り値を定義
    const resultObj = {
        userPrivateInfo: userPrivateInfo
    }
    return resultObj
}