import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S121"

export const s121_UpdateUser_LoginDatetime = async (
    userId: string,
    logUserId: string
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([userId])
    // ドキュメントの中身を定義
    const newUserInfo = {
        // UserId: userId,
        // UserName: userName,
        // Comment: comment,
        LatestLoginDatetime: Timestamp.now(),
        // ProfileImagePath: profileImagePath,
        // GenderCd: genderCd,
        // Age: age,
        // AreaCd: areaCd,
        // Hashtags: hashtags,
        // _CrtUserId: logUserId,
        // _CrtServiceId: SERVICE_ID,
        // _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as M050_User;
    // Firebase処理
    const result_FB = await updateDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User, docId), newUserInfo);
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}