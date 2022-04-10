import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M051_UserPrivate } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S160"

export const s160_CreateUserPrivate = async (
    userId: string,
    loginId: string,
    password: string,
    logUserId: string
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([userId])
    // ドキュメントの中身を定義
    const newUserPrivateInfo = {
        _0_DocId: docId,
        UserId: userId,
        LoginId: loginId,
        Password: password,
        _CrtUserId: logUserId,
        _CrtServiceId: SERVICE_ID,
        _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as M051_UserPrivate;
    // Firebase処理
    const result_FB = await setDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M051_UserPrivate, docId), newUserPrivateInfo);       //→Idを指定する場合はこっち
    // await addDoc(collection(db_Firebase, FIREBASE_COLLECTIONS.T999_M050_USER), newUserInfo);                                 //→Idを指定しない場合はこっち
    const resultObj = {
        result_FB: result_FB
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}